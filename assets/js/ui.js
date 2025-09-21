(function(){
  const navBtn = document.querySelector('.nav-toggle');
  const sidebar = document.getElementById('sidebar');
  const themeBtn = document.querySelector('.theme-toggle');

  navBtn?.addEventListener('click', ()=>{
    const open = sidebar.classList.toggle('open');
    navBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // 다크모드 토글
  const KEY='acnh_theme';
  function setTheme(mode){
    if(mode==='dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    localStorage.setItem(KEY, mode);
  }
  const saved=localStorage.getItem(KEY);
  if(saved) setTheme(saved);
  themeBtn?.addEventListener('click', ()=> setTheme(localStorage.getItem(KEY)==='dark'?'light':'dark'));

  // 현재 경로 하이라이트
  const here = location.pathname.replace(/\/+$/, '');
  document.querySelectorAll('.sidebar a[href]').forEach(a=>{
    const href=a.getAttribute('href').replace(/\/+$/,'');
    if(here === '/' && href === '{{ site.baseurl }}') a.classList.add('active');
    if(here.startsWith(href) && href !== '{{ site.baseurl }}') a.classList.add('active');
  });
})();
