---
layout: default
title: 주민 도감
permalink: /villagers/
---

# 🧑‍🌾 주민 도감

> 성격/성별/종류(동물)로 필터링할 수 있어요. 데이터는 `/assets/data/villagers.json`을 사용합니다.

<div class="controls card" id="villagers-controls" style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;margin:12px 0;">
  <div style="display:flex;gap:8px;align-items:center;">
    <strong>성격:</strong>
    <select id="personality-select" aria-label="성격 선택">
      <option value="">전체</option>
      <option value="먹보">먹보(남)</option>
      <option value="운동광">운동광(남)</option>
      <option value="무뚝뚝">무뚝뚝(남)</option>
      <option value="느끼함">느끼함(남)</option>
      <option value="친절함">친절함(여)</option>
      <option value="아이돌">아이돌(여)</option>
      <option value="성숙함">성숙함(여)</option>
      <option value="단순활발">단순활발(여)</option>
    </select>
  </div>
  <div style="display:flex;gap:8px;align-items:center;">
    <strong>성별:</strong>
    <select id="gender-select" aria-label="성별 선택">
      <option value="">전체</option>
      <option value="남성">남성</option>
      <option value="여성">여성</option>
    </select>
  </div>
  <div style="display:flex;gap:8px;align-items:center;">
    <strong>종류:</strong>
    <select id="species-select" aria-label="동물 종류 선택">
      <option value="">전체</option>
      <option>개</option><option>개구리</option><option>개미핥기</option><option>고릴라</option><option>고양이</option>
      <option>곰</option><option>꼬마곰</option><option>늑대</option><option>다람쥐</option><option>닭</option>
      <option>독수리</option><option>돼지</option><option>말</option><option>문어</option><option>사슴</option>
      <option>사자</option><option>새</option><option>생쥐</option><option>소</option><option>악어</option>
      <option>양</option><option>염소</option><option>오리</option><option>원숭이</option><option>캥거루</option>
      <option>코끼리</option><option>코뿔소</option><option>코알라</option><option>타조</option><option>토끼</option>
      <option>펭귄</option><option>하마</option><option>햄스터</option><option>호랑이</option>
    </select>
  </div>
  <div style="display:flex;gap:8px;align-items:center;">
    <label><input type="checkbox" id="birthday-this-month"> 이번 달 생일만</label>
  </div>
</div>

<div id="villagers-list" class="table-wrap card">불러오는 중…</div>

<script defer src="/assets/js/villagers.js"></script>
