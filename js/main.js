// メインJavaScriptファイル
document.addEventListener('DOMContentLoaded', function() {
  // 各モジュールの初期化
  initPreloader();
  initHeaderScroll();
  initMobileMenu();
  initSmoothScroll();
  initActiveNavigation();
  initContactForm();
  initBackToTop();
  initParticles();
  initAOS();
});

// ローディングアニメーション
function initPreloader() {
  const loader = document.querySelector('.loader-wrapper');
  if (!loader) return;
  
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 1000);
  });
}

// スクロール時のヘッダー変更
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// モバイルメニュー
function initMobileMenu() {
  const menuIcon = document.querySelector('.menu-icon');
  const navLinks = document.querySelector('.nav-links');
  
  if (!menuIcon || !navLinks) return;
  
  menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('active');
    navLinks.classList.toggle('active');
  });
  
  // メニュー項目クリック時にメニューを閉じる
  const links = document.querySelectorAll('.nav-links a');
  links.forEach(link => {
    link.addEventListener('click', () => {
      menuIcon.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
}

// スムーススクロール
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (!target) return;
      
      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });
}

// アクティブなナビゲーションリンク
function initActiveNavigation() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  if (sections.length === 0 || navLinks.length === 0) return;
  
  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 200;
      const sectionHeight = section.offsetHeight;
      
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// お問い合わせフォーム
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // 簡易的なバリデーション
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    
    if (!name.value || !email.value || !message.value) {
      showMessage('error', '全ての項目を入力してください。');
      return;
    }
    
    if (!validateEmail(email.value)) {
      showMessage('error', '有効なメールアドレスを入力してください。');
      return;
    }
    
    // 送信ボタンを無効化
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = '送信中...';
    
    // 送信処理（実際の実装ではAjaxなどを使用）
    setTimeout(() => {
      form.reset();
      showMessage('success', 'お問い合わせありがとうございます。担当者より連絡いたします。');
      
      // ボタンを元に戻す
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }, 1500);
  });
  
  // メールアドレスのバリデーション
  function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  
  // メッセージ表示
  function showMessage(type, text) {
    // 既存のメッセージを削除
    const existingMessage = form.querySelector('.success-message, .error-message');
    if (existingMessage) {
      existingMessage.remove();
    }
    
    // 新しいメッセージを作成
    const message = document.createElement('div');
    message.className = type === 'success' ? 'success-message' : 'error-message';
    
    const icon = document.createElement('i');
    icon.className = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
    
    message.appendChild(icon);
    message.appendChild(document.createTextNode(' ' + text));
    
    form.appendChild(message);
    
    // 5秒後にメッセージを消す
    setTimeout(() => {
      if (message.parentNode) {
        message.remove();
      }
    }, 5000);
  }
}

// トップへ戻るボタン
function initBackToTop() {
  const backToTopBtn = document.querySelector('.back-to-top');
  if (!backToTopBtn) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('active');
    } else {
      backToTopBtn.classList.remove('active');
    }
  });
  
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// パーティクルアニメーション
function initParticles() {
  const container = document.querySelector('.hero-particles');
  if (!container) return;
  
  const particleCount = window.innerWidth < 768 ? 30 : 50;
  const colors = [
    'rgba(26, 115, 232, 0.5)',
    'rgba(66, 133, 244, 0.4)',
    'rgba(255, 255, 255, 0.3)',
    'rgba(255, 87, 34, 0.4)',
    'rgba(255, 152, 0, 0.3)'
  ];
  
  // パーティクルのランダム生成
  for (let i = 0; i < particleCount; i++) {
    createParticle(container, colors);
  }
}

// パーティクルの作成
function createParticle(container, colors) {
  const particle = document.createElement('div');
  particle.classList.add('particle');
  
  // ランダムなスタイル設定
  const size = Math.random() * 6 + 2;
  const colorIndex = Math.floor(Math.random() * colors.length);
  
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  particle.style.left = `${Math.random() * 100}%`;
  particle.style.top = `${Math.random() * 100}%`;
  particle.style.backgroundColor = colors[colorIndex];
  particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
  particle.style.animationDelay = `${Math.random() * 5}s`;
  
  container.appendChild(particle);
}

// AOS (Animate On Scroll)初期化
function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out',
      once: false,
      offset: 100
    });
  }
}