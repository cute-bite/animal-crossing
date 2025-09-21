(function(){
  const KST = 'Asia/Seoul';
  const fmt = new Intl.DateTimeFormat('ko-KR', { timeZone: KST, month: '2-digit', day: '2-digit' });
  const now = new Date();
  const [mm, dd] = fmt.formatToParts(now)
    .filter(p => p.type === 'month' || p.type === 'day')
    .map(p => p.value);
  const monthNum = Number(mm);
  const todayKey = `${mm}-${dd}`;

  const elBirthday = document.getElementById('birthday-card');
  const elEvents   = document.getElementById('events-card');
  const elCritters = document.getElementById('critters-card');
  const hemCtrl    = document.getElementById('hemisphere-controls');

  const h = (tag, attrs={}, text) => {
    const n = document.createElement(tag);
    for (const [k,v] of Object.entries(attrs)) n.setAttribute(k,v);
    if (text) n.textContent = text;
    return n;
  };

  // 반구 상태
  const HEM_KEY = 'acnh_hemisphere';
  let hemisphere = (localStorage.getItem(HEM_KEY) || 'n'); // 'n' or 's'
  function setHem(newHem){
    hemisphere = (newHem === 's') ? 's' : 'n';
    localStorage.setItem(HEM_KEY, hemisphere);
    // 버튼 상태 갱신
    hemCtrl?.querySelectorAll('button[data-hem]').forEach(btn => {
      const active = btn.getAttribute('data-hem') === hemisphere;
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
    renderCritters(); // 재렌더
  }

  // 컨트롤 바인딩
  hemCtrl?.addEventListener('click', (e) => {
    const b = e.target.closest('button[data-hem]');
    if (!b) return;
    setHem(b.getAttribute('data-hem'));
  });
  // 초기 상태 반영
  setTimeout(() => setHem(hemisphere), 0);

  // 1) 오늘의 생일
  fetch('/assets/data/birthdays.json')
    .then(r => r.json())
    .then(list => {
      const today = list.filter(v => v.birthday === todayKey);
      elBirthday.innerHTML = '';
      elBirthday.appendChild(h('h3', {}, '🎂 오늘의 주민 생일'));
      if (!today.length) {
        elBirthday.appendChild(h('p', {}, '오늘은 생일인 주민이 없어요.'));
      } else {
        const ul = h('ul');
        today.forEach(v => ul.appendChild(h('li', {}, `${v.name} (${v.species || ''})`)));
        elBirthday.appendChild(ul);
      }
    })
    .catch(() => { elBirthday.textContent = '생일 정보를 불러오지 못했어요.'; });

  // 2) 이달의 이벤트
  fetch('/assets/data/events.json')
    .then(r => r.json())
    .then(map => {
      elEvents.innerHTML = '';
      elEvents.appendChild(h('h3', {}, '🎉 이달의 이벤트'));
      const list = map[String(monthNum)] || [];
      if (!list.length) {
        elEvents.appendChild(h('p', {}, '이번 달 등록된 이벤트가 없습니다.'));
      } else {
        const ul = h('ul');
        list.forEach(ev => ul.appendChild(h('li', {}, ev)));
        elEvents.appendChild(ul);
      }
    })
    .catch(() => { elEvents.textContent = '이벤트 정보를 불러오지 못했어요.'; });

  // 3) 이번 달 출현 생물 (반구 토글 지원)
  let critterData = null;
  function renderCritters(){
    if (!critterData) return;
    elCritters.innerHTML = '';
    const hemLabel = hemisphere === 's' ? '남반구' : '북반구';
    elCritters.appendChild(h('h3', {}, `🐟 이번 달 출현 생물 (${hemLabel})`));

    const monthsField = hemisphere === 's' ? 'months_s' : 'months_n';
    const makeSection = (label, arr) => {
      const avail = arr.filter(x => (x[monthsField] || []).includes(monthNum));
      const wrap = h('div');
      wrap.appendChild(h('h4', {}, label));
      if (!avail.length) wrap.appendChild(h('p', {}, '없음'));
      else {
        const ul = h('ul');
        avail.forEach(x => ul.appendChild(h('li', {}, x.name)));
        wrap.appendChild(ul);
      }
      return wrap;
    };

    elCritters.appendChild(makeSection('물고기', critterData.fish));
    elCritters.appendChild(makeSection('곤충',  critterData.bugs));
    elCritters.appendChild(makeSection('해산물',critterData.sea));
  }

  fetch('/assets/data/critters.json')
    .then(r => r.json())
    .then(data => { critterData = data; renderCritters(); })
    .catch(() => { elCritters.textContent = '출현 생물 정보를 불러오지 못했어요.'; });
})();