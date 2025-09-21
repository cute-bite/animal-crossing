(function(){
  const KST = 'Asia/Seoul';
  const fmt = new Intl.DateTimeFormat('ko-KR', { timeZone: KST, month: '2-digit' });
  const now = new Date();
  const mm = fmt.formatToParts(now).find(p => p.type === 'month').value;
  const DEFAULT_MONTH = Number(mm);

  const controls = document.getElementById('fish-controls');
  const monthSel = document.getElementById('month-select-fish') || document.getElementById('month-select');
  const availOnly = document.getElementById('available-only-fish') || document.getElementById('available-only');
  const listEl = document.getElementById('fish-list');

  const HEM_KEY = 'acnh_hemisphere';
  let hem = localStorage.getItem(HEM_KEY) || 'n';
  let data = null;

  if (monthSel) {
    for (let m=1; m<=12; m++) {
      const opt = document.createElement('option');
      opt.value = String(m);
      opt.textContent = `${m}월`;
      monthSel.appendChild(opt);
    }
    monthSel.value = String(DEFAULT_MONTH);
  }

  function setHem(h){
    hem = (h === 's') ? 's' : 'n';
    localStorage.setItem(HEM_KEY, hem);
    controls?.querySelectorAll('button[data-hem]')?.forEach(btn => {
      const active = btn.getAttribute('data-hem') === hem;
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
    render();
  }
  controls?.addEventListener('click', (e) => {
    const b = e.target.closest('button[data-hem]');
    if (b) setHem(b.getAttribute('data-hem'));
  });
  monthSel?.addEventListener('change', render);
  availOnly?.addEventListener('change', render);

  function render(){
    if (!data){ listEl.textContent = '불러오는 중…'; return; }
    const month = Number(monthSel ? monthSel.value : DEFAULT_MONTH);
    const field = hem === 's' ? 'months_s' : 'months_n';

    let rows = data['fish'];
    if (availOnly && availOnly.checked) {
      rows = rows.filter(item => (item[field] || []).includes(month));
    }
    rows = rows.sort((a,b)=> a.name.localeCompare(b.name, 'ko'));

    const table = document.createElement('table');
    table.innerHTML = '<thead><tr><th>이름</th><th>북반구</th><th>남반구</th><th>현재</th></tr></thead>';
    const tbody = document.createElement('tbody');

    const formatMonths = arr => !arr || !arr.length ? '-' : arr.map(n => `${n}월`).join(', ');

    rows.forEach(it => {
      const onNow = (it[field] || []).includes(Number({month}));
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${it.name}</td>
        <td>${formatMonths(it.months_n)}</td>
        <td>${formatMonths(it.months_s)}</td>
        <td><span class="badge ${onNow ? 'on' : ''}">${onNow ? '출현' : '비출현'}</span></td>`;
      tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    listEl.innerHTML = '';
    listEl.appendChild(table);
  }

  fetch('/assets/data/critters.json')
    .then(r => r.json())
    .then(json => { data = json; render(); })
    .catch(() => { listEl.textContent = '데이터를 불러오지 못했어요.'; });

  setTimeout(() => setHem(hem), 0);
})();