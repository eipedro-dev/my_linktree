/**
 * Grid Canvas — Animação de grid isométrico com efeito de ondas
 *
 * Cria um fundo animado com blocos 3D que respondem a "ripples" (ondas)
 * gerados aleatoriamente, criando um efeito visual calmo e futurista.
 */
(function () {
  const canvas = document.getElementById('grid-canvas');
  const ctx = canvas.getContext('2d');

  // ── Configurações ──
  const CELL = 64;       // Tamanho de cada bloco (maior = menos blocos na tela)
  const ISO_W = 12;      // Deslocamento isométrico horizontal
  const ISO_H = 6;       // Deslocamento isométrico vertical
  const H_LOW = 0;       // Altura mínima dos blocos
  const H_MID = 16;      // Altura intermediária
  const H_HIGH = 32;     // Altura máxima
  const HEIGHTS = [H_LOW, H_MID, H_HIGH];

  // Paleta de cores — tons de pedra escura
  const FACE = ['#1a1a1a', '#202020', '#272727'];  // Face superior
  const RIGHT = ['#131313', '#181818', '#1d1d1d'];  // Face lateral direita
  const BOT = ['#0f0f0f', '#141414', '#181818'];  // Face inferior

  let cols, rows, grid, current, ripples = [], nextRipple = 0;

  /**
   * Redimensiona o canvas para preencher a janela e reconstrói a grid
   */
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    build();
  }

  /**
   * Constrói a grade de blocos e inicializa as ondas
   */
  function build() {
    cols = Math.ceil(canvas.width / CELL) + 2;
    rows = Math.ceil(canvas.height / CELL) + 2;
    grid = new Array(cols * rows).fill(0);
    current = new Float32Array(cols * rows);
    ripples = [];
    // Inicia com 2 ondas já em andamento
    spawnRipple();
    spawnRipple();
  }

  /**
   * Gera um número aleatório entre 'a' e 'b'
   */
  function rand(a, b) {
    return a + Math.random() * (b - a);
  }

  /**
   * Cria uma nova onda em posição aleatória
   */
  function spawnRipple() {
    ripples.push({
      cx: Math.floor(Math.random() * cols),
      cy: Math.floor(Math.random() * rows),
      t: 0,
      speed: rand(1.8, 3.0) // Expansão mais lenta = onda mais calma
    });
  }

  /**
   * Calcula o nível de altura alvo para uma célula baseado nas ondas ativas
   */
  function computeTarget(c, r) {
    let maxLvl = 0;
    for (const rip of ripples) {
      const dist = Math.sqrt((c - rip.cx) ** 2 + (r - rip.cy) ** 2);
      const gap = rip.t - dist;
      if (gap >= 0 && gap < 3) {
        // Escada: ALTO → MÉDIO → BAIXO
        const lvl = 2 - Math.floor(gap);
        maxLvl = Math.max(maxLvl, lvl);
      }
    }
    return maxLvl;
  }

  /**
   * Desenha um bloco isométrico na posição especificada
   */
  function drawBlock(sx, sy, h, lvl) {
    const S = CELL;
    const y = sy - h;

    // Face superior
    ctx.beginPath();
    ctx.rect(sx, y, S, S);
    ctx.fillStyle = FACE[lvl];
    ctx.fill();

    // Gradiente sutil de destaque na face superior
    const g = ctx.createLinearGradient(sx, y, sx + S * 0.7, y + S * 0.7);
    g.addColorStop(0, 'rgba(255,255,255,0.04)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fill();

    // Face lateral direita
    ctx.beginPath();
    ctx.moveTo(sx + S, y);
    ctx.lineTo(sx + S + ISO_W, y - ISO_H);
    ctx.lineTo(sx + S + ISO_W, y + S - ISO_H);
    ctx.lineTo(sx + S, y + S);
    ctx.closePath();
    ctx.fillStyle = RIGHT[lvl];
    ctx.fill();

    // Face inferior
    ctx.beginPath();
    ctx.moveTo(sx, y + S);
    ctx.lineTo(sx + ISO_W, y + S - ISO_H);
    ctx.lineTo(sx + S + ISO_W, y + S - ISO_H);
    ctx.lineTo(sx + S, y + S);
    ctx.closePath();
    ctx.fillStyle = BOT[lvl];
    ctx.fill();

    // Borda entre os blocos
    ctx.strokeStyle = 'rgba(0,0,0,0.8)';
    ctx.lineWidth = 0.8;
    ctx.strokeRect(sx + 0.4, y + 0.4, S - 0.8, S - 0.8);
  }

  /**
   * Loop principal de animação
   */
  let lastTs = 0;
  function frame(ts) {
    const dt = Math.min((ts - lastTs) / 1000, 0.05);
    lastTs = ts;

    // Gera novas ondas em intervalos aleatórios
    if (ts >= nextRipple) {
      spawnRipple();
      nextRipple = ts + rand(1800, 4000); // Menos frequente = mais calmo
    }

    // Avança as ondas e remove as que já passaram
    const maxR = Math.sqrt(cols ** 2 + rows ** 2);
    ripples = ripples.filter(r => {
      r.t += r.speed * dt * 3;
      return r.t - 3 < maxR;
    });

    // Interpolação suave de altura
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const i = r * cols + c;
        const tgt = HEIGHTS[computeTarget(c, r)];
        current[i] += (tgt - current[i]) * Math.min(5 * dt, 1);
      }
    }

    // Renderiza todos os blocos
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const i = r * cols + c;
        const h = current[i];
        const lvl = h > H_MID * 0.5 ? (h > H_MID + (H_HIGH - H_MID) * 0.5 ? 2 : 1) : 0;
        drawBlock(c * CELL - ISO_W, r * CELL - ISO_H, h, lvl);
      }
    }

    requestAnimationFrame(frame);
  }

  // ── Inicialização ──
  window.addEventListener('resize', resize);
  resize();
  requestAnimationFrame(frame);
})();
