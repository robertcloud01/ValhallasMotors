const unavailable = () => Response.json({ error: "Geração indisponível." }, { status: 503 });

export async function POST(request: Request) {
  const token = request.headers.get("Authorization")?.match(/^Bearer ([\w.-]+)$/)?.[1];
  if (!token) return Response.json({ error: "Autenticação necessária." }, { status: 401 });

  const admins = new Set((process.env.VALHALLAS_ADMIN_UIDS ?? "").split(",").map((uid) => uid.trim()).filter(Boolean));
  const firebaseKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  const providerKey = process.env.DEEPSEEK_API_KEY;
  if (!firebaseKey || !providerKey || admins.size === 0) return unavailable();

  try {
    const lookupUrl = new URL("https://identitytoolkit.googleapis.com/v1/accounts:lookup");
    lookupUrl.searchParams.set("key", firebaseKey);
    const lookup = await fetch(lookupUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken: token }),
      signal: AbortSignal.timeout(5000),
    });
    if (!lookup.ok) {
      return lookup.status === 400 || lookup.status === 401
        ? Response.json({ error: "Sessão inválida." }, { status: 401 })
        : unavailable();
    }

    const { users } = await lookup.json() as { users?: { localId: string; disabled?: boolean }[] };
    const account = users?.[0];
    if (!account || account.disabled || !admins.has(account.localId)) {
      return Response.json({ error: "Acesso restrito." }, { status: 403 });
    }

    const body: unknown = await request.json().catch(() => null);
    const query = body && typeof body === "object" && "query" in body && typeof body.query === "string" ? body.query.trim() : "";
    if (!query || query.length > 140) return Response.json({ error: "Informe um modelo válido." }, { status: 400 });

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${providerKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "deepseek/deepseek-chat",
        messages: [
          { role: "system", content: "Gere um rascunho para revisão humana, em português. Retorne apenas um objeto JSON com modelo, marca, ano, categoria, combustivel, hibrido, potencia, torque, valorEstimado e descricao. Use campos vazios quando faltar certeza." },
          { role: "user", content: query },
        ],
        temperature: 0.3,
        max_tokens: 600,
      }),
      signal: AbortSignal.timeout(20000),
    });
    if (!response.ok) return unavailable();

    const result = await response.json() as { choices?: { message?: { content?: string } }[] };
    const content = result.choices?.[0]?.message?.content;
    if (!content) return unavailable();
    const draft: unknown = JSON.parse(content.trim().replace(/^```(?:json)?\s*|\s*```$/gi, ""));
    if (!draft || typeof draft !== "object" || Array.isArray(draft) ||
      !("marca" in draft) || typeof draft.marca !== "string" ||
      !("modelo" in draft) || typeof draft.modelo !== "string") return unavailable();
    return Response.json(draft);
  } catch {
    return unavailable();
  }
}
