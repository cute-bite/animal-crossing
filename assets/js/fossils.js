(function(){
  const listEl = document.getElementById('fossils-list');
  fetch('/assets/data/fossils.json')
    .then(r=>r.json())
    .then(data => {
      const table = document.createElement('table');
      table.innerHTML = '<thead><tr><th>이름</th><th>세트</th><th>부위</th></tr></thead>';
      const tbody = document.createElement('tbody');
      data.sort((a,b)=> a.set.localeCompare(b.set,'ko') || a.name.localeCompare(b.name,'ko'))
          .forEach(f => {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${f.name}</td><td>${f.set}</td><td>${f.part||'-'}</td>`;
            tbody.appendChild(tr);
          });
      table.appendChild(tbody);
      listEl.innerHTML = '';
      listEl.appendChild(table);
    })
    .catch(()=> listEl.textContent = '데이터를 불러오지 못했어요.');
})();