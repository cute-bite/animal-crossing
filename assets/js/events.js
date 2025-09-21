(function(){
  const sel = document.getElementById('events-month');
  const list = document.getElementById('events-list');
  const KST='Asia/Seoul';
  const now = new Date();
  const curr = new Intl.DateTimeFormat('ko-KR',{timeZone:KST,month:'2-digit'}).formatToParts(now).find(p=>p.type==='month').value;

  for (let m=1;m<=12;m++){
    const opt=document.createElement('option');
    opt.value=String(m);
    opt.textContent=`${m}월`;
    sel.appendChild(opt);
  }
  sel.value=String(Number(curr));

  function render(map){
    const m = sel.value;
    const items = map[m] || [];
    if (!items.length){ list.innerHTML='<p>등록된 이벤트가 없습니다.</p>'; return; }
    const ul=document.createElement('ul');
    items.forEach(ev=>{
      const li=document.createElement('li'); li.textContent=ev; ul.appendChild(li);
    });
    list.innerHTML=''; list.appendChild(ul);
  }

  fetch('/assets/data/events.json')
    .then(r=>r.json())
    .then(map=>{
      render(map);
      sel.addEventListener('change', ()=>render(map));
    })
    .catch(()=> list.textContent='이벤트 정보를 불러오지 못했어요.');
})();