---
layout: default
title: 곤충 도감
permalink: /bugs/
---

# 🐛 곤충 도감 (전체)

> 월/반구를 선택하면 해당 조건에 맞는 출현 곤충만 볼 수 있어요.

<div class="controls card" id="bugs-controls" style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;margin:12px 0;">
  <div style="display:flex;gap:8px;align-items:center;">
    <strong>반구:</strong>
    <button type="button" class="chip" data-hem="n" aria-pressed="true">북반구</button>
    <button type="button" class="chip" data-hem="s" aria-pressed="false">남반구</button>
  </div>

  <div style="display:flex;gap:8px;align-items:center;">
    <strong>월:</strong>
    <select id="month-select-bugs" aria-label="월 선택"></select>
  </div>

  <div style="display:flex;gap:8px;align-items:center;">
    <label><input type="checkbox" id="available-only-bugs" checked> 이번 달만 보기</label>
  </div>
</div>

<div id="bugs-list" class="table-wrap card">불러오는 중…</div>

<script defer src="/assets/js/bugs.js"></script>
