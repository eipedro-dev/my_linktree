# Pedro Henrique · Dev — Linktree

Este é um projeto de uma página pessoal (estilo Linktree) desenvolvida para centralizar links importantes de forma profissional, com um design moderno, escuro e animações interativas.

## 🚀 Visão Geral Funcional

A página atua como um cartão de visitas digital interativo, contendo:

- **Identidade Visual Forte:** Tema escuro (`#111`) com toques em vermelho (`#e03131`), transmitindo um visual premium.
- **Fundo Animado (Canvas):** Uma grade isométrica 3D ("grid-canvas") animada via JavaScript puro, que gera um efeito suave de ondas (ripples) procedurais para criar profundidade sem sobrecarregar a tela.
- **Cabeçalho Dinâmico:** Nome com efeito CSS de "Glitch" na palavra "Henrique.", além de uma badge piscante indicando "Disponível para Projetos".
- **Links Estratégicos:** 4 cartões de navegação com animações de hover elegantes e ícones SVG integrados:
  1.  Portfólio (Website)
  2.  Instagram
  3.  TikTok
  4.  WhatsApp (Orçamento direto)
- **Totalmente Responsivo:** Desenvolvido do zero (Mobile-First) com Media Queries para garantir layout perfeito desde telas de 320px (iPhones antigos) até grandes monitores.

## 🛠️ Tecnologias Utilizadas

O projeto não utiliza frameworks pesados, focando em performance e código limpo:

- **HTML5 Semântico:** Estrutura otimizada para SEO e Acessibilidade (Meta tags OG, atributos ARIA, ícone favicon inline).
- **CSS3 (Vanilla):** Uso intenso de variáveis globais (`:root`), Flexbox, e `@keyframes` (Scanline, Glitch, Sweep no hover). Em vez de `overflow: hidden` excessivo, utiliza `align-items: safe center` para tratar rolagem segura em resoluções minúsculas.
- **JavaScript (Vanilla - IIFE):** Toda a lógica do canvas foi extraída para o `grid-canvas.js` com escopo isolado e uso de `requestAnimationFrame` garantindo performance (acima de 60fps) com algoritmos isométricos matemáticos.

## 📂 Estrutura de Arquivos

O projeto passou recentemente por uma refatoração profissional saindo de um arquivo monolítico para uma arquitetura melhor dividida.

```text
my_linktree/
├── index.html           # Documento principal otimizado
├── css/
│   └── styles.css       # Estilos separados e estruturados (Reset, Layout, Animações, Media Queries)
├── js/
│   └── grid-canvas.js   # Script dedicado ao fundo isométrico animado usando defer
└── README.md            # Documentação do projeto
```

## ⚙️ Como Executar

Por ser composto inteiramente de arquivos estáticos na Web (Vanilla HMTL/CSS/JS), não é necessário nenhum processo de `build` ou servidor Node.js.

1.  Clone este repositório ou baixe os arquivos.
2.  Dê um clique duplo ou abra o arquivo `index.html` em qualquer navegador moderno.
3.  _(Opcional)_ Você pode usar a extensão "Live Server" no VS Code ou executar um servidor local rápido via terminal (ex: `npx serve .` ou `python -m http.server`) para simular o ambiente web.

## 📝 Como Customizar

- **Links Sociais:** No arquivo `index.html`, substitua os links temporários dos `href=""` (como `https://instagram.com/pedrohenrique`) para apontar às suas redes sociais exatas. Os SVGs já estão inseridos no código.
- **Estilo Base:** Se desejar trocar a cor vermelha de destaque, vá em `css/styles.css` na raiz e altere a variável `--accent: #e03131;`. O fundo claro e escuro dos ripple-blocks nas laterais no canvas podem ser alteradas no topo do arquivo `js/grid-canvas.js`.

---

Feito com ☕ por **Pedro Henrique** · Dev Autônomo
