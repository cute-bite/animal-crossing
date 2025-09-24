(function () {
  const DATA_URL = `${document.documentElement.dataset.baseurl || ''}/assets/data/villagers.json`;
  const $grid = document.getElementById('birthday-list');
  const $today = document.getElementById('birthday-today');
  const $label = document.getElementById('birthday-month-label');
  const $prev  = document.getElementById('birthday-prev');
  const $next  = document.getElementById('birthday-next');

  // 현재 월(0~11). 좌우 버튼으로 바꿀 수 있게 상태로 보유
  let view = new Date();
  view.setDate(1);

  // 월 한국어 라벨
  const monthKo = m => `${m+1}월`;

  // 다양한 스키마를 견딜 수 있는 생일 파서
  function parseBirthday(v) {
    // 가능한 필드 후보들
    const raw =
      v.birthday || v['birthday-string'] || v.birthday_mm_dd || v['birthday_mm_dd'] ||
      v.birth || v.bday || v['birthday'] || '';

    let mm = v.birthday_month || v.birth_month || v.month;
    let dd = v.birthday_day || v.birth_day || v.day;

    // 문자열 "9/25", "09-25", "September 25th", "9월 25일" 등 처리
    if (typeof raw === 'string' && (!mm || !dd)) {
      const s = raw.trim();
      // 9/25, 09-25
      let m = s.match(/(\d{1,2})[\/\-\.\s](\d{1,2})/);
      if (m) { mm = +m[1]; dd = +m[2]; }
      // 9월 25일
      if (!mm || !dd) {
        m = s.match(/(\d{1,2})\s*월\s*(\d{1,2})\s*일/);
        if (m) { mm = +m[1]; dd = +m[2]; }
      }
      // September 25
      if (!mm || !dd) {
        const months = "january february march april may june july august september october november december".split(' ');
        const lower = s.toLowerCase();
        months.forEach((name, i) => {
          if (lower.includes(name) && !mm) mm = i + 1;
        });
        const d = s.match(/(\d{1,2})(?:st|nd|rd|th)?/);
        if (d && !dd) dd = +d[1];
      }
    }

    // 숫자 보정
    mm = Number(mm); dd = Number(dd);
    if (!(mm>=1 && mm<=12 && dd>=1 && dd<=31)) return null;
    return { m: mm, d: dd };
  }

  function groupByDay(list, monthIndex) {
    const map = new Map(); // day -> array
    list.forEach(v => {
      const bd = parseBirthday(v);
      if (!bd || bd.m !== monthIndex+1) return;
      const key = bd.d;
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(v);
    });
    return [...map.entries()].sort((a,b)=>a[0]-b[0]);
  }

  function nameOf(v) {
    // 가능한 이름 필드
    return v.name_ko || v.name || v.korean || v.ko || v.id || '이름미상';
  }

  function todayLabel(all, monthIndex) {
    const now = new Date();
    const isSameMonth = now.getMonth() === monthIndex;
    if (!isSameMonth) return '';
    const today = now.getDate();
    const todays = all.get(today) || [];
    if (todays.length === 0) return '';
    const names = todays.map(nameOf).join(', ');
    return `오늘은 <strong>${names}</strong>의 생일이에요! 🎈`;
  }

  function renderMonth(data, monthIndex) {
    const grouped = new Map(groupByDay(data, monthIndex));
    // 오늘 알림
    $today.innerHTML = todayLabel(grouped, monthIndex);
    $today.style.display = $today.textContent.trim() ? 'block' : 'none';

    // 라벨
    $label.textContent = monthKo(monthIndex);

    // 리스트
    $grid.innerHTML = '';
    grouped.forEach((arr, day) => {
      const item = document.createElement('div');
      item.className = 'bd-item';
      const names = arr.map(nameOf).join(', ');
      item.innerHTML = `
        <div class="bd-date">${monthIndex+1}/${String(day).padStart(2,'0')}</div>
        <div class="bd-names">${names}</div>
      `;
      // 오늘 하이라이트
      const now = new Date();
      if (now.getMonth()===monthIndex && now.getDate()===day) item.classList.add('is-today');
      $grid.appendChild(item);
    });

    // 데이터가 없을 때
    if ($grid.children.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'bd-empty';
      empty.textContent = '이 달에는 등록된 생일 정보가 없어요.';
      $grid.appendChild(empty);
    }
  }

  async function init() {
    try {
      // baseurl 데이터-속성 지원 (Jekyll용)
      const base = document.querySelector('html').getAttribute('data-baseurl') || '';
      const url = base ? `${base}/assets/data/villagers.json` : DATA_URL;
      const res = await fetch(url, { cache: 'no-store' });
      const raw = await res.json();

      // 배열 형태만 사용 (혹시 객체라면 values 취함)
      const data = Array.isArray(raw) ? raw : Object.values(raw || {});
      renderMonth(data, view.getMonth());

      $prev.addEventListener('click', () => {
        view.setMonth(view.getMonth() - 1);
        renderMonth(data, view.getMonth());
      });
      $next.addEventListener('click', () => {
        view.setMonth(view.getMonth() + 1);
        renderMonth(data, view.getMonth());
      });
    } catch (e) {
      console.error('birthdays.js error:', e);
      $today.textContent = '';
      $grid.innerHTML = '<div class="bd-empty">생일 데이터를 불러오지 못했어요. (/assets/data/villagers.json)</div>';
    }
  }

  init();
})();
