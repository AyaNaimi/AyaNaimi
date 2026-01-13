<!-- CSS CUSTOM AVANCÉ -->
<style>
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400&display=swap');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  body {
    font-family: 'Space Grotesk', sans-serif;
    background: linear-gradient(135deg, 
      var(--gradient-start) 0%, 
      var(--gradient-mid) 50%, 
      var(--gradient-end) 100%);
    color: var(--text-primary);
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* THÈMES DYNAMIQUES */
  :root {
    --gradient-start: #000000;
    --gradient-mid: #1a1a2e;
    --gradient-end: #16213e;
    --text-primary: #e2e8f0;
    --text-secondary: #94a3b8;
    --accent: #6366f1;
    --accent-glow: rgba(99, 102, 241, 0.3);
    --card-bg: rgba(30, 41, 59, 0.7);
    --card-border: rgba(99, 102, 241, 0.2);
    --neon-shadow: 0 0 20px var(--accent-glow);
    --grid-color: rgba(99, 102, 241, 0.05);
  }

  [data-theme="light"] {
    --gradient-start: #f8fafc;
    --gradient-mid: #e2e8f0;
    --gradient-end: #cbd5e1;
    --text-primary: #1e293b;
    --text-secondary: #475569;
    --accent: #3b82f6;
    --accent-glow: rgba(59, 130, 246, 0.2);
    --card-bg: rgba(255, 255, 255, 0.8);
    --card-border: rgba(59, 130, 246, 0.1);
    --grid-color: rgba(59, 130, 246, 0.03);
  }

  /* GRID BACKGROUND ANIMÉ */
  .grid-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      linear-gradient(var(--grid-color) 1px, transparent 1px),
      linear-gradient(90deg, var(--grid-color) 1px, transparent 1px);
    background-size: 50px 50px;
    animation: gridMove 20s linear infinite;
    z-index: -1;
    opacity: 0.3;
  }

  @keyframes gridMove {
    0% { transform: translate(0, 0); }
    100% { transform: translate(50px, 50px); }
  }

  /* CONTAINER PRINCIPAL */
  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 40px 20px;
    position: relative;
  }

  /* HEADER HERO */
  .hero {
    text-align: center;
    padding: 80px 20px;
    position: relative;
    overflow: hidden;
  }

  .hero::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, var(--accent-glow) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    animation: pulse 4s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
    50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.1); }
  }

  .avatar-container {
    position: relative;
    display: inline-block;
    margin-bottom: 30px;
  }

  .avatar {
    width: 180px;
    height: 180px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid var(--accent);
    box-shadow: var(--neon-shadow);
    position: relative;
    z-index: 2;
    animation: float 6s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(5deg); }
  }

  .avatar-ring {
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    border: 2px dashed var(--accent);
    border-radius: 50%;
    animation: spin 20s linear infinite;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  h1 {
    font-size: 3.5rem;
    font-weight: 700;
    background: linear-gradient(135deg, var(--accent), #8b5cf6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 20px;
    position: relative;
    display: inline-block;
  }

  h1::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 200px;
    height: 4px;
    background: linear-gradient(90deg, transparent, var(--accent), transparent);
    border-radius: 2px;
  }

  .tagline {
    font-size: 1.5rem;
    color: var(--text-secondary);
    margin-bottom: 40px;
    font-weight: 300;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  /* TYPING ANIMATION CUSTOM */
  .typing-container {
    height: 60px;
    margin: 30px 0;
  }

  .typing-text {
    font-family: 'JetBrains Mono', monospace;
    font-size: 1.8rem;
    display: inline-block;
    border-right: 3px solid var(--accent);
    white-space: nowrap;
    overflow: hidden;
    animation: typing 3.5s steps(40, end), blink 0.75s step-end infinite;
  }

  @keyframes typing {
    from { width: 0; }
    to { width: 100%; }
  }

  @keyframes blink {
    from, to { border-color: transparent; }
    50% { border-color: var(--accent); }
  }

  /* CARDS MODERNES */
  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
    margin: 60px 0;
  }

  .card {
    background: var(--card-bg);
    backdrop-filter: blur(10px);
    border: 1px solid var(--card-border);
    border-radius: 20px;
    padding: 30px;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
  }

  .card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--accent), transparent);
  }

  .card:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3), var(--neon-shadow);
  }

  .card-title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 20px;
    color: var(--accent);
    display: flex;
    align-items: center;
    gap: 10px;
  }

  /* TECH BADGES INNOVANTS */
  .tech-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background: rgba(99, 102, 241, 0.1);
    border: 1px solid var(--card-border);
    border-radius: 50px;
    margin: 5px;
    transition: all 0.3s ease;
  }

  .tech-badge:hover {
    background: var(--accent);
    color: white;
    transform: scale(1.1);
  }

  /* 3D STATS */
  .stats-3d {
    perspective: 1000px;
    margin: 60px 0;
  }

  .stats-container {
    display: flex;
    justify-content: center;
    gap: 30px;
    transform-style: preserve-3d;
  }

  .stat-card {
    width: 150px;
    height: 150px;
    background: var(--card-bg);
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transform: rotateX(10deg);
    transition: transform 0.5s ease;
    position: relative;
  }

  .stat-card:hover {
    transform: rotateX(0deg) translateY(-20px);
  }

  .stat-number {
    font-size: 2.5rem;
    font-weight: 700;
    background: linear-gradient(135deg, var(--accent), #8b5cf6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  /* TIMELINE INNOVANTE */
  .timeline {
    position: relative;
    max-width: 800px;
    margin: 80px auto;
  }

  .timeline::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(to bottom, transparent, var(--accent), transparent);
    transform: translateX(-50%);
  }

  .timeline-item {
    margin: 40px 0;
    position: relative;
    width: 45%;
  }

  .timeline-item:nth-child(odd) {
    left: 0;
  }

  .timeline-item:nth-child(even) {
    left: 55%;
  }

  /* BOUTON THEME TOGGLE */
  .theme-toggle {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
  }

  .toggle-btn {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: var(--card-bg);
    border: 1px solid var(--card-border);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 1.5rem;
    transition: all 0.3s ease;
  }

  .toggle-btn:hover {
    transform: rotate(180deg);
    box-shadow: var(--neon-shadow);
  }

  /* FOOTER AVEC PARTICULES */
  .footer {
    text-align: center;
    padding: 60px 20px;
    position: relative;
    overflow: hidden;
  }

  .particles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  .particle {
    position: absolute;
    width: 2px;
    height: 2px;
    background: var(--accent);
    border-radius: 50%;
    animation: particleFloat 20s linear infinite;
  }

  @keyframes particleFloat {
    0% {
      transform: translateY(100vh) translateX(0);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      transform: translateY(-100px) translateX(100px);
      opacity: 0;
    }
  }

  /* RESPONSIVE */
  @media (max-width: 768px) {
    .container {
      padding: 20px 10px;
    }
    
    h1 {
      font-size: 2.5rem;
    }
    
    .card-grid {
      grid-template-columns: 1fr;
    }
    
    .stats-container {
      flex-direction: column;
      align-items: center;
    }
    
    .timeline::before {
      left: 20px;
    }
    
    .timeline-item {
      width: calc(100% - 40px);
      left: 40px !important;
    }
  }
</style>

<!-- HTML STRUCTURE -->
<div class="grid-bg"></div>

<div class="theme-toggle">
  <button class="toggle-btn" onclick="toggleTheme()">
    <span class="theme-icon">🌓</span>
  </button>
</div>

<div class="container">
  <!-- HERO SECTION -->
  <section class="hero">
    <div class="avatar-container">
      <div class="avatar-ring"></div>
      <img src="https://avatars.githubusercontent.com/u/YOUR_ID" class="avatar" alt="Profile Avatar">
    </div>
    
    <h1 data-text="YOUR_NAME">YOUR_NAME</h1>
    <p class="tagline">ARCHITECTE DIGITAL • INNOVATEUR • VISIONNAIRE</p>
    
    <div class="typing-container">
      <span class="typing-text">DÉVELOPPEUR FULL-STACK AVANT-GARDE</span>
    </div>
  </section>

  <!-- ABOUT SECTION -->
  <section class="card">
    <h2 class="card-title">💫 À PROPOS</h2>
    <p>Passionné par la création d'expériences digitales innovantes, je mets mon expertise au service de projets audacieux. Mon approche combine design thinking, développement performant et vision stratégique.</p>
    
    <div style="margin-top: 20px;">
      <span class="tech-badge">🚀 Product Thinking</span>
      <span class="tech-badge">🎨 Design Systems</span>
      <span class="tech-badge">⚡ Performance</span>
      <span class="tech-badge">🔗 Web3</span>
      <span class="tech-badge">🤖 AI/ML</span>
    </div>
  </section>

  <!-- TECH STACK 3D -->
  <section class="card">
    <h2 class="card-title">🛠️ STACK TECHNIQUE</h2>
    <div class="card-grid">
      <div class="card">
        <h3 class="card-title">🌐 Frontend</h3>
        <span class="tech-badge">⚛️ React 18</span>
        <span class="tech-badge">🌀 Next.js 14</span>
        <span class="tech-badge">💚 Vue 3</span>
        <span class="tech-badge">📘 TypeScript</span>
        <span class="tech-badge">🎨 Tailwind</span>
        <span class="tech-badge">✨ Three.js</span>
      </div>
      
      <div class="card">
        <h3 class="card-title">⚙️ Backend</h3>
        <span class="tech-badge">🟢 Node.js</span>
        <span class="tech-badge">🐍 Python</span>
        <span class="tech-badge">⚡ Go</span>
        <span class="tech-badge">🔥 Rust</span>
        <span class="tech-badge">🗄️ GraphQL</span>
        <span class="tech-badge">🚀 FastAPI</span>
      </div>
      
      <div class="card">
        <h3 class="card-title">📱 Mobile & Desktop</h3>
        <span class="tech-badge">📱 React Native</span>
        <span class="tech-badge">🍎 SwiftUI</span>
        <span class="tech-badge">⚡ Electron</span>
        <span class="tech-badge">🎯 Flutter</span>
      </div>
    </div>
  </section>

  <!-- STATS 3D -->
  <section class="stats-3d">
    <h2 class="card-title" style="text-align: center;">📊 IMPACT NUMÉRIQUE</h2>
    <div class="stats-container">
      <div class="stat-card">
        <div class="stat-number">150+</div>
        <div class="stat-label">Projets</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">50K+</div>
        <div class="stat-label">Lignes</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">24/7</div>
        <div class="stat-label">Disponible</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">∞</div>
        <div class="stat-label">Créativité</div>
      </div>
    </div>
  </section>

  <!-- PROJETS PHARES -->
  <section class="card">
    <h2 class="card-title">🚀 PROJETS AVANT-GARDE</h2>
    <div class="card-grid">
      <div class="card" onclick="window.open('https://github.com/YOUR_USER/PROJECT1')" style="cursor: pointer;">
        <h3 class="card-title">Neural UI</h3>
        <p>Framework UI généré par IA avec composants adaptatifs</p>
        <div style="margin-top: 15px;">
          <span class="tech-badge">AI</span>
          <span class="tech-badge">React</span>
          <span class="tech-badge">TensorFlow.js</span>
        </div>
      </div>
      
      <div class="card" onclick="window.open('https://github.com/YOUR_USER/PROJECT2')" style="cursor: pointer;">
        <h3 class="card-title">Quantum DB</h3>
        <p>Base de données quantique expérimentale</p>
        <div style="margin-top: 15px;">
          <span class="tech-badge">Rust</span>
          <span class="tech-badge">Wasm</span>
          <span class="tech-badge">Blockchain</span>
        </div>
      </div>
    </div>
  </section>

  <!-- TIMELINE -->
  <section class="timeline">
    <h2 class="card-title" style="text-align: center;">⏳ PARCOURS INNOVANT</h2>
    
    <div class="timeline-item">
      <div class="card">
        <h3 class="card-title">2024</h3>
        <p>Création d'un framework de design system IA-powered</p>
      </div>
    </div>
    
    <div class="timeline-item">
      <div class="card">
        <h3 class="card-title">2023</h3>
        <p>Développement d'une plateforme de réalité augmentée web</p>
      </div>
    </div>
    
    <div class="timeline-item">
      <div class="card">
        <h3 class="card-title">2022</h3>
        <p>Architecture microservices scalable pour fintech</p>
      </div>
    </div>
  </section>

  <!-- CONTACT -->
  <section class="card">
    <h2 class="card-title">📡 CONNECTIONS</h2>
    <div style="display: flex; gap: 20px; flex-wrap: wrap; justify-content: center;">
      <button class="tech-badge" onclick="window.open('mailto:your.email@domain.com')" style="cursor: pointer;">
        📧 Email
      </button>
      <button class="tech-badge" onclick="window.open('https://linkedin.com/in/YOUR_PROFILE')" style="cursor: pointer;">
        💼 LinkedIn
      </button>
      <button class="tech-badge" onclick="window.open('https://twitter.com/YOUR_HANDLE')" style="cursor: pointer;">
        🐦 Twitter
      </button>
      <button class="tech-badge" onclick="window.open('https://your-portfolio.vercel.app')" style="cursor: pointer;">
        🌐 Portfolio
      </button>
    </div>
  </section>
</div>

<!-- PARTICLES FOOTER -->
<div class="footer">
  <div class="particles" id="particles"></div>
  <div style="position: relative; z-index: 2;">
    <h2 class="card-title">✨ INNOVATION CONTINUE</h2>
    <p>Construisons l'avenir ensemble</p>
    <div style="margin-top: 30px; font-size: 0.9rem; color: var(--text-secondary);">
      © 2024 • Design Avant-Garde • Dark/Light Mode • Animations CSS
    </div>
  </div>
</div>

<!-- JAVASCRIPT INTERACTIF -->
<script>
  // Theme toggle
  function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? null : 'light';
    html.setAttribute('data-theme', newTheme);
    
    // Animation du bouton
    const btn = document.querySelector('.toggle-btn');
    btn.style.transform = 'scale(0.9)';
    setTimeout(() => {
      btn.style.transform = 'scale(1)';
    }, 150);
  }

  // Création des particules
  function createParticles() {
    const container = document.getElementById('particles');
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 20 + 's';
      particle.style.opacity = Math.random() * 0.5 + 0.1;
      particle.style.width = particle.style.height = 
        Math.random() * 3 + 1 + 'px';
      container.appendChild(particle);
    }
  }

  // Effet parallaxe sur scroll
  document.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    document.querySelector('.grid-bg').style.transform = 
      `translateY(${rate}px)`;
  });

  // Initialisation
  document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    
    // Animation d'entrée des cards
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(50px)';
      
      setTimeout(() => {
        card.style.transition = 'all 0.8s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 100 * index);
    });
  });

  // Effet de souris sur les stats
  document.querySelectorAll('.stat-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateY = (x - centerX) / 25;
      const rotateX = (centerY - y) / 25;
      
      card.style.transform = 
        `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'rotateX(10deg)';
    });
  });
</script>
