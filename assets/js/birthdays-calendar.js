// /assets/js/birthdays-calendar.js
(async function () {
  // baseurl 탐지 (기존 스크립트와 동일한 방식)
  const base = (typeof window.SITE_BASEURL !== 'undefined')
    ? window.SITE_BASEURL
    : (document.documentElement.getAttribute('data-baseurl') || '');

  const $today = document.getElementById('birthday-today');
  const $monthLabel = document.getElementById('bd-month-label');
  const $prev = document.getElementById('bd-prev');
  const $next = document.getElementById('bd-next');
  const $grid = document.getElementById('bd-cal-body');

  if (!$grid) return;

  // 데이터 불러오기
  let villagers = [];
  try {
    const res = await fetch(`${base}/assets/data/villagers.json`, { cache: 'no-store' });
    villagers = await res.json(); // [{ name, species, birthday:"MM-DD" }, ...]
  } catch (e) {
    console.error(e);
  }

  // "MM-DD" → {m,d} 파서
  const parseMD = (s) => {
    if (!s || typeof s !== 'string') return null;
    const m = s.slice(0,2), d = s.slice(3,5);
    const mi = Number(m), di = Number(d);
    if (!mi || !di) return null;
    return { m: mi, d: di };
  };

  // 오늘 정보
  const today = new Date();
  const realY = today.getFullYear();
  const realM = today.getMonth(); // 0~11
  const realD = today.getDate();

  // 뷰 상태(월 이동용)
  let viewYear = realY;
  let viewMonth = realM; // 0~11

  // 월 레이블
  const monthLabel = (y, m0) => `${y}년 ${String(m0 + 1).padStart(2,'0')}월`;

  // 해당 월의 생일 맵 { dayNumber: [villagers...] }
  function mapBirthdays(month0) {
    const mm = String(month0 + 1).padStart(2,'0'); // "01"~"12"
    const map = new Map();
    for (const v of villagers) {
      const md = parseMD(v.birthday);
      if (!md) continue;
      if (md.m === (month0 + 1)) {
        if (!map.has(md.d)) map.set(md.d, []);
        map.get(md.d).push(v);
      }
    }
    return map; // Map<day, array>
  }

  // 오늘 생일 문구 표시 (실제 '오늘' 기준)
  function renderToday() {
    const mm = realM + 1;
    const map = mapBirthdays(realM);
    const arr = map.get(realD) || [];
    if (arr.length) {
      const links = arr.map(v => {
        const slug = encodeURIComponent(v.name);
        return `<a class="bd-pill" href="${base}/villagers/?q=${slug}">${v.name}</a>`;
      }).join(' ');
      $today.innerHTML = `오늘은 ${links} 의 생일이에요! 🎁`;
    } else {
      $today.innerHTML = ''; // 오늘 생일 없으면 숨김
    }
  }

  // 달력 렌더
  function renderCalendar(y, m0) {
    $monthLabel.textContent = monthLabel(y, m0);
    $grid.innerHTML = '';

    // 이번 달 생일 맵
    const monthMap = mapBirthdays(m0);

    // 달력 범위 계산
    const first = new Date(y, m0, 1);
    const firstDow = first.getDay(); // 0(일)~6(토)
    const daysInMonth = new Date(y, m0 + 1, 0).getDate();

    // 앞쪽 이전달 채우기
    const prevDays = firstDow; // 앞에 들어갈 칸 수
    const prevMonthLastDate = new Date(y, m0, 0).getDate();

    // 총 6주(42칸)로 고정 렌더
    const totalCells = 42;
    for (let i = 0; i < totalCells; i++) {
      const cell = document.createElement('div');
      cell.className = 'bd-day';

      // 달력 상 실제 날짜 계산
      let dateNum, cellMonth = m0, cellYear = y, isOther = false;

      if (i < prevDays) { // 이전달
        dateNum = prevMonthLastDate - (prevDays - 1 - i);
        isOther = true;
        // 이전달 계산
        if (m0 === 0) { cellMonth = 11; cellYear = y - 1; } else { cellMonth = m0 - 1; }
      } else if (i >= prevDays + daysInMonth) { // 다음달
        dateNum = i - (prevDays + daysInMonth) + 1;
        isOther = true;
        // 다음달 계산
        if (m0 === 11) { cellMonth = 0; cellYear = y + 1; } else { cellMonth = m0 + 1; }
      } else { // 이번달
        dateNum = i - prevDays + 1;
      }

      // 오늘 표시
      if (cellYear === realY && cellMonth === realM && dateNum === realD) {
        cell.classList.add('is-today');
      }
      if (isOther) cell.classList.add('is-other-month');

      // 날짜 표시
      const dateEl = document.createElement('div');
      dateEl.className = 'bd-date';
      dateEl.textContent = String(dateNum);
      cell.appendChild(dateEl);

      // 생일 칩
      if (!isOther && monthMap.has(dateNum)) {
        const wrap = document.createElement('div');
        wrap.className = 'bd-people';
        for (const v of monthMap.get(dateNum)) {
          const a = document.createElement('a');
          a.className = 'bd-pill';
          a.href = `${base}/villagers/?q=${encodeURIComponent(v.name)}`;
          a.textContent = v.name;
          wrap.appendChild(a);
        }
        cell.appendChild(wrap);
      }

      $grid.appendChild(cell);
    }
  }

  // 초기 표시
  renderToday();
  renderCalendar(viewYear, viewMonth);

  // 월 이동
  $prev?.addEventListener('click', () => {
    if (viewMonth === 0) { viewMonth = 11; viewYear--; }
    else { viewMonth--; }
    renderCalendar(viewYear, viewMonth);
  });
  $next?.addEventListener('click', () => {
    if (viewMonth === 11) { viewMonth = 0; viewYear++; }
    else { viewMonth++; }
    renderCalendar(viewYear, viewMonth);
  });
})();
