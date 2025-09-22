(function () {
  const sidebar  = document.getElementById('sidebar');
  const overlay  = document.getElementById('mobile-overlay');

  // 플로팅 버튼
  const btnTop   = document.getElementById('fab-top');
  const btnMenu  = document.getElementById('fab-menu');
  const btnShare = document.getElementById('fab-share');

  // 다크모드 토글 (그대로 유지)
  const themeBtn = document.querySelector('.theme-toggle');
  const KEY = 'acnh_theme';
  function setTheme(mode) {
    if (mode === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    try { localStorage.setItem(KEY, mode); } catch(e){}
  }
  try {
    const saved = localStorage.getItem(KEY);
    if (saved) setTheme(saved);
  } catch(e){}
  themeBtn?.addEventListener('click', () =>
    setTheme(document.documentElement.classList.contains('dark') ? 'light' : 'dark')
  );

  // ----- 모바일 사이드바 열고/닫기 -----
  function openMenu() {
    sidebar?.classList.add('open');
    overlay?.classList.add('show');
    overlay?.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    sidebar?.classList.remove('open');
    overlay?.classList.remove('show');
    overlay?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  function toggleMenu() {
    if (!sidebar) return;
    sidebar.classList.contains('open') ? closeMenu() : openMenu();
  }

  btnMenu?.addEventListener('click', toggleMenu);
  overlay?.addEventListener('click', closeMenu);
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
  // 화면이 커지면(데스크톱으로 전환) 강제로 닫기
  let lastW = window.innerWidth;
  window.addEventListener('resize', () => {
    const w = window.innerWidth;
    if (w >= 961 && lastW < 961) closeMenu();
    lastW = w;
  });

  // ----- 맨 위로 -----
  btnTop?.addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: 'smooth' })
  );

  // ----- 공유 -----
  btnShare?.addEventListener('click', async () => {
    const url = location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: document.title, url });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        alert('링크가 복사되었습니다.');
      } else {
        // 아주 구형 브라우저
        const ta = document.createElement('textarea');
        ta.value = url; document.body.appendChild(ta); ta.select();
        document.execCommand('copy'); document.body.removeChild(ta);
        alert('링크가 복사되었습니다.');
      }
    } catch (e) { /* 사용자가 취소할 수 있음 */ }
  });

  // ----- 현재 경로 하이라이트 (Liquid 없어도 동작) -----
  const here = location.pathname.replace(/\/+$/, '');
  const links = Array.from(document.querySelectorAll('.sidebar a[href]'));

  // 가장 긴 prefix를 가진 링크에만 active를 주는 방식
  let best = null, bestLen = 0;
  links.forEach(a => {
    const href = a.getAttribute('href');
    try {
      const p = new URL(href, location.origin).pathname.replace(/\/+$/, '');
      if (p && here.startsWith(p) && p.length > bestLen) { best = a; bestLen = p.length; }
    } catch (e) {}
  });
  if (best) best.classList.add('active');
})();
