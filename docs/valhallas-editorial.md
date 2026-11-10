# Valhallas Motors
## Estratégia, direção de arte e sistema de design

Estudo autoral da Valhallas Studio · 10 de novembro de 2026

### Estratégia

**Posicionamento.** Uma coleção automotiva editorial que apresenta cada carro por sua forma, engenharia e propósito. O conceito serve como case para concessionárias boutique, especialistas em performance e ateliês automotivos. A oferta comercial do estúdio permanece em R$ 3.000–8.000, conforme o briefing.

**Critério de seleção.** Cada edição reúne poucas máquinas com propostas distintas. A primeira explora resposta, potência e viagem em três capítulos. Uma ficha demonstra especificações de modelo e credita sua imagem. Histórico, quilometragem, preço e disponibilidade ficam reservados para exemplares reais documentados.

**Tom.** Frases curtas que nomeiam uma característica concreta. “Máquinas de caráter.” abre a edição. Cada ficha tem um título factual e uma leitura editorial separada. A palavra “demonstração” aparece no catálogo e antes da consulta.

| Etapa | Pergunta do visitante | Resposta da interface |
| --- | --- | --- |
| Home | Que tipo de coleção é esta? | Uma fotografia dominante, uma tese editorial, três modelos em destaque e acesso direto à coleção. |
| Coleção | Qual modelo quero conhecer? | Busca por marca ou modelo, filtros por marca e categoria, ordenação, total e estado vazio. |
| Ficha | O que diferencia este modelo? | Imagem, créditos, especificações, leitura editorial e veículos relacionados. |
| Consulta | Como começo uma conversa sobre o veículo? | Modelo selecionado, formulário com validação e explicação do destino. O modo demo não transmite dados. |
| Sobre | Quem assina este estudo? | Filosofia e critérios com assinatura da Valhallas Studio. |

### Direção de arte · Edição 01, Forma em movimento

A abertura usa uma moldura cinematográfica e composição assimétrica. A luz recorta a carroceria e revela a arquitetura. Sobre a fotografia, título marfim e apenas um CTA principal. A seção seguinte vira uma página de revista em marfim, com um modelo maior à esquerda e dois estudos complementares à direita. O rodapé retoma a superfície escura para encerrar a edição.

A assinatura gráfica é um corte diagonal em duas linhas, derivado do V de Valhallas. Reaparece no monograma e como detalhe de paginação. A fotografia dos modelos deve manter o carro identificável. Imagem conceitual de campanha recebe rótulo próprio. Legendas e créditos ficam perto do conteúdo que descrevem.

### Sistema de design

| Elemento | Especificação |
| --- | --- |
| Superfícies | Obsidiana `#101215`, grafite `#25292D`, marfim `#F0EBE1`. |
| Acento | Champanhe `#C7A66A` para numeração, foco em superfícies escuras e detalhes de marca. Marrom `#735735` para a função equivalente sobre marfim. |
| Texto | Marfim sobre obsidiana, obsidiana sobre marfim. Texto secundário `#BDB7AC` em escuro e `#58534B` em claro. Erro `#982F28` em claro. |
| Tipografia | Georgia como serifada editorial, Inter para interface. Título de abertura entre 3,5 e 9,75 rem. Títulos de seção entre 2,5 e 6 rem. Texto de interface de 0,875 a 1,125 rem. Metadados em caixa-alta com espaçamento de 0,15 em. |
| Grade | Margens fluidas de 1,25 a 5 rem, conteúdo até 90 rem. Desktop com divisão aproximada de 7/5 no editorial. Transição em 900 px para tablet e em 640 px para coluna única. |
| Espaçamento | Base de 4 px, com escalas de 8, 16, 24, 32, 48, 64 e 96 px. Divisórias de 1 px e cantos retos. |
| Botões | Primário sólido com texto e seta, secundário de contorno e link editorial sublinhado. Controles com alvo mínimo interno de 44 px. |
| Navegação | Cabeçalho com logo, coleção, projeto e contato. Em telas estreitas, menu expansível com estado anunciado e fechamento por Escape. |
| Galeria | Moldura fixa para evitar deslocamento, legenda específica, botões anterior e próximo quando houver mais de uma imagem e foco devolvido ao fechar. |
| Movimento | Entrada editorial curta com conteúdo visível na primeira renderização. ScrollTrigger reservado ao deslocamento sutil da imagem de abertura em desktop. Sem rolagem forçada, sem preloader de página. Movimento reduzido remove o efeito. |
| Acessibilidade | Meta WCAG 2.2 AA, navegação por teclado, foco visível, rótulos associados, aviso de resultados, texto real sobre a imagem com contraste e mídia decorativa fora da árvore acessível. |

### Sequência de implementação

1. Preservar o repositório e as rotas existentes. Separar a apresentação editorial do painel administrativo.
2. Entregar a jornada pública com dados demonstrativos explicitamente identificados, créditos e formulário que preserva o veículo.
3. Validar build, lint dos arquivos novos, rotas, interações, teclado e layouts. Documentar o que depende de credenciais, de fotos de campanha licenciadas e de medição em campo.
4. Produzir peças de portfólio a partir de telas verificadas e identificar o case como conceito autoral.

### Verificação da primeira versão

| Verificação | Resultado observado |
| --- | --- |
| Compilação | Build de produção e verificação TypeScript concluídos. As fontes estão no lockfile e o build não depende de Google Fonts. |
| Páginas e mídia | Home, coleção, três fichas, Sobre, Contato, Privacidade e Termos responderam 200. Os sete WebP responderam 200. Modelo e página inexistentes responderam 404. |
| Catálogo | Busca e filtro de marca combinados retornaram um resultado no navegador. O link de retorno carregou o estado da busca. Ordenação por ano e estado vazio passaram em HTTP. |
| Galeria e formulário | Enter abriu a galeria, seta trocou a imagem e Escape fechou com retorno de foco. A consulta exibiu o modelo selecionado e confirmou validação local com dados de teste. |
| Responsividade | Larguras de quadro de 320, 390 e 768 px e desktop. Os três quadros não apresentaram rolagem horizontal. Menu mobile abriu por teclado e fechou por Escape. |
| Proteção de rotas | A geração administrativa sem sessão respondeu 401. A rota legada de diagnóstico respondeu 404. |
| Lint | Os arquivos públicos e auxiliares novos passaram na checagem direcionada. O lint global ainda reporta 31 erros e 11 avisos em código legado. |
| Pendente | Credenciais e permissões de Firebase e Cloudinary, envio comercial, teste de preferências de movimento em mais navegadores, Core Web Vitals, verificação de acessibilidade completa e publicação. |
