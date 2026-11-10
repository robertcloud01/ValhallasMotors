# Valhallas Motors

Coleção automotiva editorial da Valhallas Studio. **Forma em movimento** é um conceito autoral de portfólio.

## Rodar localmente

Requer Node.js 20.9 ou superior e npm.

```sh
npm ci
npm run dev
```

Abra [localhost:3000](http://localhost:3000). As páginas públicas funcionam em modo demonstrativo sem credenciais. O catálogo usa três modelos com fotografias creditadas, busca e filtros na URL. A consulta de teste valida os campos no navegador. Use `npm run build` para verificar a compilação e `npm run lint` para verificar a base toda.

## Configuração

| Variável | Comportamento |
| --- | --- |
| `VALHALLAS_SITE_URL` | Origem pública HTTPS. Habilita indexação, URLs canônicas, compartilhamento e sitemap. Deixe ausente em prévias. |
| `VALHALLAS_INVENTORY_MODE` | `live` usa o inventário Firestore no site público. Sem a opção, usa o catálogo editorial de demonstração. Erros do Firestore em modo live não viram dados simulados. |
| `VALHALLAS_WHATSAPP` | Número internacional verificado, apenas dígitos. Exibe o canal opcional e inclui o modelo na mensagem sugerida. |
| `VALHALLAS_CONTACT_EMAIL` | E-mail verificado para abrir o aplicativo local de e-mail. O formulário de teste continua local. |
| `NEXT_PUBLIC_FIREBASE_*` | Configuração do projeto Firebase usada pelo painel. Os nomes estão em `src/lib/firebase.ts`. |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`, `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` | Integração de mídia legada do painel. |
| `DEEPSEEK_API_KEY`, `VALHALLAS_ADMIN_UIDS` | Geração administrativa opcional. A rota valida a sessão Firebase e permite somente UIDs da lista separada por vírgulas. A chave do provedor fica no servidor. |

Antes de disponibilizar o modo comercial, valide regras de escrita no Firestore e Storage, mídia licenciada, contatos e configuração de entrega de mensagens. A geração de fichas retorna rascunhos para revisão humana. O painel e as integrações exigem testes com credenciais de um ambiente próprio.

## Projeto

- [Estratégia, direção de arte e sistema de design](docs/valhallas-editorial.md)
- [Manifesto de mídia e licenças](docs/valhallas-ativos.md)
- [Estrutura do case e materiais iniciais para Fiverr](docs/valhallas-portfolio.md)
