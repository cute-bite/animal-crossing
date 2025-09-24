// /assets/js/birthdays-calendar.js
(async function () {
  const base =
    (typeof window.SITE_BASEURL !== "undefined")
      ? window.SITE_BASEURL
      : (document.documentElement.getAttribute("data-baseurl") || "");

  // ── HTML 요소 (index.md의 ID와 정확히 맞춤) ──────────────────────────────
  const $todayLine  = document.getElementById("bd-today-line");         // 상단 "오늘은 ..." 문구 들어갈 자리
  const $monthLabel = document.getElementById("birthday-month-label");  // "YYYY년 MM월"
  const $prev       = document.getElementById("birthday-prev");         // ◀
  const $next       = document.getElementById("birthday-next");         // ▶
  const $grid       = document.getElementById("birthday-calendar");     // 달력 그리드 컨테이너
  if (!$grid) return;

  // ── 데이터 로드 (/assets/data/villagers.json : "birthday":"MM-DD") ──────
  let villagers = [];
  try {
    const res = await fetch(`${base}/assets/data/villagers.json`, { cache: "no-store" });
    villagers = await res.json();
  } catch (e) {
    console.error(e);
  }

  // "MM-DD" → { m, d }
  const parseMD = (s) => {
    if (!s || typeof s !== "string") return null;
    const m = Number(s.slice(0, 2));
    const d = Number(s.slice(3, 5));
    if (!m || !d) return null;
    return { m, d };
  };

  // 오늘(실제 날짜)
  const today  = new Date();
  const realY  = today.getFullYear();
  const realM0 = today.getMonth(); // 0~11
  const realD  = today.getDate();

  // 뷰 상태(월 이동)
  let viewY  = realY;
  let viewM0 = realM0;

  const monthLabel = (y, m0) => `${y}년 ${String(m0 + 1).padStart(2, "0")}월`;

  // 해당 월의 생일 맵 → Map<dayNumber, [villager...]>
  function mapBirthdays(month0) {
    const map = new Map();
    for (const v of villagers) {
      const md = parseMD(v.birthday);
      if (!md) continue;
      if (md.m === month0 + 1) {
        if (!map.has(md.d)) map.set(md.d, []);
        map.get(md.d).push(v);
      }
    }
    return map;
  }

  // 상단 "오늘은 ___ 의 생일" 문구
  function renderTodayLine() {
    const monthMap = mapBirthdays(realM0);
    const list = monthMap.get(realD) || [];
    if (list.length) {
      const links = list.map(v => {
        const slug = encodeURIComponent(v.name);
        return `<a class="bd-pill" href="${base}/villagers/?q=${slug}">${v.name}</a>`;
      }).join(" ");
      $todayLine.innerHTML = `오늘은 ${links}의 생일입니다 🎂`;
    } else {
      $todayLine.textContent = "이번 달 생일";
    }
  }

  // 달력 렌더
  function renderCalendar(y, m0) {
    // 헤더 레이블
    $monthLabel.textContent = monthLabel(y, m0);

    // 그리드 초기화
    $grid.innerHTML = "";

    // 요일 헤더
    const daysKo = ["일", "월", "화", "수", "목", "금", "토"];
    for (const d of daysKo) {
      const h = document.createElement("div");
      h.className = "bd-head";
      h.textContent = d;
      $grid.appendChild(h);
    }

    const monthMap = mapBirthdays(m0);

    const first = new Date(y, m0, 1);
    const firstDow = first.getDay();
    const daysInMonth = new Date(y, m0 + 1, 0).getDate();
    const prevMonthLast = new Date(y, m0, 0).getDate();

    const totalCells = 42; // 6주 고정

    for (let i = 0; i < totalCells; i++) {
      const cell = document.createElement("div");
      cell.className = "bd-day";

      let dateNum, cellY = y, cellM0 = m0, isOther = false;

      if (i < firstDow) {
        // 이전 달
        dateNum = prevMonthLast - (firstDow - 1 - i);
        isOther = true;
        if (m0 === 0) { cellM0 = 11; cellY = y - 1; } else { cellM0 = m0 - 1; }
      } else if (i >= firstDow + daysInMonth) {
        // 다음 달
        dateNum = i - (firstDow + daysInMonth) + 1;
        isOther = true;
        if (m0 === 11) { cellM0 = 0; cellY = y + 1; } else { cellM0 = m0 + 1; }
      } else {
        // 이번 달
        dateNum = i - firstDow + 1;
      }

      // 날짜 숫자
      const num = document.createElement("div");
      num.className = "bd-date";
      num.textContent = String(dateNum);
      cell.appendChild(num);

      // 오늘 표시
      if (!isOther && cellY === realY && cellM0 === realM0 && dateNum === realD) {
        cell.classList.add("is-today");
      }
      if (isOther) cell.classList.add("is-other-month");

      // 생일 칩
      if (!isOther && monthMap.has(dateNum)) {
        const wrap = document.createElement("div");
        wrap.className = "bd-people";
        for (const v of monthMap.get(dateNum)) {
          const a = document.createElement("a");
          a.className = "bd-pill";
          a.href = `${base}/villagers/?q=${encodeURIComponent(v.name)}`;
          a.textContent = v.name;
          wrap.appendChild(a);
        }
        cell.appendChild(wrap);
      }

      $grid.appendChild(cell);
    }
  }

  // 초기 렌더
  renderTodayLine();
  renderCalendar(viewY, viewM0);

  // 월 이동
  $prev.addEventListener("click", () => {
    if (viewM0 === 0) { viewM0 = 11; viewY--; }
    else { viewM0--; }
    renderCalendar(viewY, viewM0);
  });
  $next.addEventListener("click", () => {
    if (viewM0 === 11) { viewM0 = 0; viewY++; }
    else { viewM0++; }
    renderCalendar(viewY, viewM0);
  });
})();
