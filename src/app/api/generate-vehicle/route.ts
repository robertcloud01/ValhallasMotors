export async function POST(req: Request) {
    try {
        const { query } = await req.json();
        console.log("🚀 [API] Request received for DeepSeek via OpenRouter:", { query });

        if (!process.env.DEEPSEEK_API_KEY) {
            console.error("❌ [API] DEEPSEEK_API_KEY is missing in env.");
            return new Response(JSON.stringify({ error: true, message: "Server API Key configuration error" }), { status: 500 });
        }

        const prompt = `
      Você é um especialista em vendas de carros de luxo.
      Gere dados técnicos e comerciais detalhados sobre o veículo: ${query}.
      
      Retorne SOMENTE um JSON válido (sem markdown, sem \`\`\`) no formato exato:
      {
        "modelo": "Nome exato e versão",
        "marca": "Marca do veículo",
        "ano": "Ano aproximado (número)",
        "categoria": "Categoria (Supercar, SUV, Sedan, etc)",
        "combustivel": "Gasolina, Híbrido, Diesel, etc",
        "hibrido": false,
        "potencia": "Ex: 780 cv",
        "torque": "Ex: 73 kgfm",
        "valorEstimado": "Ex: R$ 6.500.000 (preço estimado no Brasil)",
        "descricao": "Texto persuasivo, luxuoso e técnico para venda (máx 400 caracteres)."
      }
    `;

        // Using OpenRouter which provides access to DeepSeek models
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.DEEPSEEK_API_KEY}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "http://localhost:3000", // Required by OpenRouter for ranking
                "X-Title": "Concessionaria Premium"
            },
            body: JSON.stringify({
                model: "deepseek/deepseek-chat", // Standard DeepSeek V3/V2.5
                messages: [
                    { role: "system", content: "You are a helpful JSON api that outputs vehicle data." },
                    { role: "user", content: prompt }
                ],
                temperature: 0.7
            })
        });

        if (!response.ok) {
            const errText = await response.text();
            console.error("❌ [API] OpenRouter Error:", errText);
            throw new Error(`OpenRouter API Error: ${response.status} - ${errText}`);
        }

        const data = await response.json();
        const rawContent = data.choices?.[0]?.message?.content || "";

        console.log("📥 [API] Raw response:", rawContent);

        // Clean up code blocks
        const cleanedResponse = rawContent.replace(/^```json\s*/, '').replace(/^```\s*/, '').replace(/\s*```$/, '').trim();

        // Verification attempt
        try {
            JSON.parse(cleanedResponse);
        } catch (e) {
            console.error("Failed to parse JSON:", e);
            // Fallback extract
            const match = cleanedResponse.match(/\{[\s\S]*\}/);
            if (match) return new Response(match[0], { status: 200, headers: { "Content-Type": "application/json" } });
        }

        return new Response(cleanedResponse, {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });

    } catch (error: any) {
        console.error("🔥 [API] Critical Error:", error);
        return new Response(JSON.stringify({
            error: true,
            message: "Erro interno",
            details: error.message
        }), { status: 500 });
    }
}
