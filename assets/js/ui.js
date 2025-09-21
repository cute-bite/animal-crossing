(function(){
  const navBtn = document.querySelector('.nav-toggle');
  const sidebar = document.getElementById('sidebar');
  const themeBtn = document.querySelector('.theme-toggle');

  navBtn?.addEventListener('click', () => {
    const open = sidebar.classList.toggle('open');
    navBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // theme toggle
  const KEY='acnh_theme';
  function setTheme(mode){
    if (mode === 'dark'){ document.documentElement.classList.add('dark'); }
    else { document.documentElement.classList.remove('dark'); }
    localStorage.setItem(KEY, mode);
  }
  const saved = localStorage.getItem(KEY);
  if (saved) setTheme(saved);
  themeBtn?.addEventListener('click', () => {
    const curr = localStorage.getItem(KEY) === 'dark' ? 'light' : 'dark';
    setTheme(curr);
  });

  // active link highlight
  const here = location.pathname.replace(/\/+$/, '');
  document.querySelectorAll('.sidebar a[href]').forEach(a => {
    const href = a.getAttribute('href').replace(/\/+$/, '');
    if (href && href !== '/' && here.startsWith(href)) a.classList.add('active');
    if (here === '/' && href === '/') a.classList.add('active');
  });
})();