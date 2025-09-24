// /assets/js/birthdays-list.js
(async function () {
  const base =
    (typeof window.SITE_BASEURL !== "undefined")
      ? window.SITE_BASEURL
      : (document.documentElement.getAttribute("data-baseurl") || "");

  // 타겟 엘리먼트
  const $todayLine  = document.getElementById("bd-today-line");   // 오늘 한 줄
  const $monthLabel = document.getElementById("birthday-month-label"); // "YYYY년 MM월"
  const $prev       = document.getElementById("birthday-prev");
  const $next       = document.getElementById("birthday-next");
  const $listWrap   = document.getElementById("birthday-list");   // ← 새 컨테이너
  if (!$listWrap) return;

  // 데이터
  let villagers = [];
  try {
    const res = await fetch(`${base}/assets/data/villagers.json`, { cache: "no-store" });
    villagers = await res.json();
  } catch (e) {
    console.error(e);
  }

  const today  = new Date();
  const realY  = today.getFullYear();
  const realM0 = today.getMonth();
  const realD  = today.getDate();
  let viewY = realY, viewM0 = realM0;

  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];
  const monthLabel = (y, m0) => `${y}년 ${String(m0 + 1).padStart(2, "0")}월`;

  const parseMD = (s) => {
    if (!s || typeof s !== "string") return null;
    const m = Number(s.slice(0,2));
    const d = Number(s.slice(3,5));
    if (!m || !d) return null;
    return { m, d };
  };

  function ordinal(n){
    const s = ["th","st","nd","rd"], v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }

  function groupByDay(month0){
    const days = new Map(); // day -> [villagers]
    for (const v of villagers){
      const md = parseMD(v.birthday);
      if (!md || md.m !== month0 + 1) continue;
      if (!days.has(md.d)) days.set(md.d, []);
      days.get(md.d).push(v);
    }
    return [...days.entries()].sort((a,b)=>a[0]-b[0]); // [[day, [..]], ...]
  }

  function namesLine(arr){
    // 링크(원치 않으면 a→span으로 바꿔도 OK)
    const links = arr.map(v=> {
      const slug = encodeURIComponent(v.name);
      return `<a class="bd-pill bd-name" href="${base}/villagers/?q=${slug}">${v.name}</a>`;
    });

    if (links.length === 1) return links[0];
    if (links.length === 2) return `${links[0]} and ${links[1]}`;
    return links.slice(0, -1).join(", ") + " and " + links.slice(-1);
  }

  function renderTodayLine(){
    const map = groupByDay(realM0);
    const entry = map.find(([d]) => d === realD);
    if (entry){
      const [, list] = entry;
      const html = namesLine(list);
      const suffix = list.length > 1 ? "s’" : "’s";
      $todayLine.innerHTML = `Today is ${html}${suffix} birthday! 🎁`;
    } else {
      $todayLine.textContent = "Today has no villager birthdays. 🤍ྀི";
    }
  }

  function renderList(y, m0){
    $monthLabel.textContent = monthLabel(y, m0);

    const items = groupByDay(m0);
    const monthWord = monthNames[m0];

    // 리스트 HTML(두 단)
    const rows = items.map(([d, list]) => {
      const left = `${monthWord} ${ordinal(d)} • `;
      return `<li>
        <span class="bd-dayword">${left}</span>
        <span class="bd-names">${namesLine(list)}</span>
      </li>`;
    }).join("");

    $listWrap.innerHTML = `<ul class="bd-plain-list" role="list">${rows}</ul>`;
  }

  // 초기 렌더
  renderTodayLine();
  renderList(viewY, viewM0);

  // 월 이동
  $prev.addEventListener("click", () => {
    if (viewM0 === 0) { viewM0 = 11; viewY--; } else { viewM0--; }
    renderList(viewY, viewM0);
  });
  $next.addEventListener("click", () => {
    if (viewM0 === 11) { viewM0 = 0; viewY++; } else { viewM0++; }
    renderList(viewY, viewM0);
  });
})();
