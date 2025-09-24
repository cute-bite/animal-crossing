---
layout: default
title: 홈
---

# 🍃 동물의 숲 한국 팬 위키

> 동물의 숲 시리즈에 관한 모든 정보를 한국어로 정리합니다.  
> 이 정보는 Nookipedia(CC BY-SA) 기반으로 한국어 번역·재구성되었습니다.  
> Nintendo와는 무관한 **팬 메이드 프로젝트**입니다.

<section class="card hero birthday-card" id="birthday-card" aria-labelledby="birthday-title">
  <h2 id="birthday-title">🎂 이번 달 생일</h2>
  <p class="birthday-sub">이번 달에 생일인 주민/특별 캐릭터 목록이에요.</p>
  <div id="birthday-today" class="birthday-today" aria-live="polite"></div>
  <div id="birthday-list" class="birthday-grid" role="list"></div>
  <div class="birthday-footer">
    <button id="birthday-prev" class="chip" type="button" aria-label="이전 달">◀︎</button>
    <span id="birthday-month-label" class="badge"></span>
    <button id="birthday-next" class="chip" type="button" aria-label="다음 달">▶︎</button>
  </div>
</section>

<script src="{{ site.baseurl }}/assets/js/birthdays.js" defer></script>


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
