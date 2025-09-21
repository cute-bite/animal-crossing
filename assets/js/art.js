(function(){
  const listEl = document.getElementById('art-list');
  fetch('/assets/data/art.json')
    .then(r=>r.json())
    .then(data => {
      const table = document.createElement('table');
      table.innerHTML = '<thead><tr><th>작품명</th><th>가품 여부</th><th>가품 특징</th></tr></thead>';
      const tbody = document.createElement('tbody');
      data.sort((a,b)=> a.name.localeCompare(b.name,'ko'))
          .forEach(a => {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${a.name}</td><td>${a.has_fake?'가품 존재':'가품 없음'}</td><td>${a.fake_tips||'-'}</td>`;
            tbody.appendChild(tr);
          });
      table.appendChild(tbody);
      listEl.innerHTML = '';
      listEl.appendChild(table);
    })
    .catch(()=> listEl.textContent = '데이터를 불러오지 못했어요.');
})();