(function(){
  const listEl = document.getElementById('villagers-list');
  const selP = document.getElementById('personality-select');
  const selG = document.getElementById('gender-select');
  const selS = document.getElementById('species-select');
  const chkB = document.getElementById('birthday-this-month');

  const KST = 'Asia/Seoul';
  const fmtM = new Intl.DateTimeFormat('ko-KR', { timeZone: KST, month:'2-digit' });
  const now = new Date();
  const currMonth = Number(fmtM.formatToParts(now).find(p => p.type==='month').value);

  let data = null;

  // read URL params (?p=성격&g=성별&s=종류&bm=1)
  const params = new URLSearchParams(location.search);
  if (params.get('p')) selP.value = params.get('p');
  if (params.get('g')) selG.value = params.get('g');
  if (params.get('s')) selS.value = params.get('s');
  if (params.get('bm') === '1') chkB.checked = true;

  function render(){
    if (!data){ listEl.textContent = '불러오는 중…'; return; }
    const p = selP.value, g = selG.value, s = selS.value;
    const rows = data
      .filter(v => !p || v.personality === p)
      .filter(v => !g || v.gender === g)
      .filter(v => !s || v.species === s)
      .filter(v => !chkB.checked || (v.birthday && Number(v.birthday.slice(0,2)) === currMonth))
      .sort((a,b)=> a.name.localeCompare(b.name,'ko'));

    const table = document.createElement('table');
    table.innerHTML = '<thead><tr><th>이름</th><th>성별</th><th>성격</th><th>종류</th><th>생일</th></tr></thead>';
    const tbody = document.createElement('tbody');
    rows.forEach(v => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${v.name}</td><td>${v.gender||'-'}</td><td>${v.personality||'-'}</td><td>${v.species||'-'}</td><td>${v.birthday||'-'}</td>`;
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    listEl.innerHTML = '';
    listEl.appendChild(table);
  }

  document.getElementById('villagers-controls').addEventListener('change', render);

  fetch('/assets/data/villagers.json')
    .then(r=>r.json())
    .then(json => { data = json; render(); })
    .catch(() => { listEl.textContent = '데이터를 불러오지 못했어요.'; });
})();