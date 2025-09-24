---
layout: default
title: 홈
---

# 🍃 동물의 숲 한국 팬 위키

> 동물의 숲 시리즈에 관한 모든 정보를 한국어로 정리합니다.  
> 이 정보는 Nookipedia(CC BY-SA) 기반으로 한국어 번역·재구성되었습니다.  
> Nintendo와는 무관한 **팬 메이드 프로젝트**입니다.

<!-- 생일 위젯 -->
<section class="card birthday-card" id="birthday-card" aria-labelledby="birthday-title">
  <div class="bd-header">
    <h2 id="birthday-title" class="bd-title">🎂 이번 달 생일</h2>

    <div class="bd-nav">
      <button id="birthday-prev" class="chip" type="button" aria-label="이전 달">◀︎</button>
      <span id="birthday-month-label" class="badge">0000년 00월</span>
      <button id="birthday-next" class="chip" type="button" aria-label="다음 달">▶︎</button>
    </div>
  </div>

  <!-- 여기엔 아무 텍스트도 넣지 마세요. JS가 “오늘은 ○○의 생일입니다🤍ྀི”를 채웁니다 -->
  <p id="bd-today-line" class="bd-today"></p>

  <!-- 달력이 렌더링될 자리 -->
  <div id="birthday-calendar" class="birthday-grid" role="list"></div>
</section>

<!-- 달력 스크립트 (이미 쓰고 있는 파일) -->
<script src="{{ site.baseurl }}/assets/js/birthdays-calendar.js" defer></script>

<!-- 오늘 생일 한 줄만 채우는 초간단 스크립트 (아래 2단계 설명 참조) -->
<script defer>
(function(){
  const base = '{{ site.baseurl }}';
  const el   = document.getElementById('bd-today-line');
  if (!el) return;

  // 오늘 MM-DD 만들기
  function todayMMDD(){
    const d = new Date();
    const mm = String(d.getMonth()+1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${mm}-${dd}`;
  }

  // 이름 → 링크(원치 않으면 a태그 대신 plain text로 바꿔도 됨)
  function linkify(name){
    const slug = encodeURIComponent(name);
    return `<a href="${base}/villagers/?q=${slug}" class="bd-pill">${name}</a>`;
  }

  fetch(base + '/assets/data/villagers.json')
    .then(r => r.json())
    .then(data => {
      const today = todayMMDD();
      // birthday가 "MM-DD" 형태라고 하셨으니 그대로 매칭
      const list = (data||[]).filter(v => (v.birthday||'').slice(0,5) === today);

      if (!list.length){
        el.textContent = '오늘은 생일인 주민이 없어요 🤍ྀི';
        return;
      }

      const names = list.map(v => linkify(v.name || v.name_ko || '')).join(' ');
      const suffix = list.length > 1 ? '들의' : '의';
      el.innerHTML = `오늘은 ${names}${suffix} 생일입니다🤍ྀི`;
    })
    .catch(() => {
      el.textContent = '오늘 생일 정보를 불러오지 못했어요 😢';
    });
})();
</script>




<div class="hero-grid">
  <a class="card hero" href="{{ '/games/' | relative_url }}"><h3>게임</h3></a>
  <a class="card hero" href="{{ '/nh/'    | relative_url }}"><h3>모여봐요 동물의 숲</h3></a>
  <a class="card hero" href="{{ '/villagers/' | relative_url }}"><h3>주민</h3></a>
  <a class="card hero" href="{{ '/npc/' | relative_url }}"><h3>특별 캐릭터</h3></a>
  <a class="card hero" href="{{ '/fish/' | relative_url }}"><h3>물고기</h3></a>
  <a class="card hero" href="{{ '/bugs/' | relative_url }}"><h3>곤충</h3></a>
  <a class="card hero" href="{{ '/sea/'  | relative_url }}"><h3>해산물</h3></a>
  <a class="card hero" href="{{ '/fossils/' | relative_url }}"><h3>화석</h3></a>
  <a class="card hero" href="{{ '/art/' | relative_url }}"><h3>미술</h3></a>
  <a class="card hero" href="{{ '/gyroids/' | relative_url }}"><h3>하늘둥둥이</h3></a>
  <a class="card hero" href="{{ '/locations/' | relative_url }}"><h3>장소 & 시스템</h3></a>
  <a class="card hero" href="{{ '/events/' | relative_url }}"><h3>이벤트 & 시즌</h3></a>
  <a class="card hero" href="{{ '/furniture/' | relative_url }}"><h3>가구</h3></a>
  <a class="card hero" href="{{ '/clothing/' | relative_url }}"><h3>의류</h3></a>
  <a class="card hero" href="{{ '/tools/' | relative_url }}"><h3>도구</h3></a>
  <a class="card hero" href="{{ '/recipes/' | relative_url }}"><h3>DIY & 요리</h3></a>
  <a class="card hero" href="{{ '/music/' | relative_url }}"><h3>음악</h3></a>
  <a class="card hero" href="{{ '/community/' | relative_url }}"><h3>커뮤니티 & 위키</h3></a>
  <a class="card hero" href="{{ '/misc/' | relative_url }}"><h3>기타 요소</h3></a>
</div>
