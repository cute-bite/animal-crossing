# ACNH 위키 '필요한 건 다' 세트

이 패키지를 저장소 루트에 풀고 커밋하면,
메인/게임/모동숲/NPC/주민/도감/장소&시스템/이벤트/커뮤니티/기타까지
필요한 기본 페이지와 자동화 스크립트, 데이터 샘플이 한 번에 들어갑니다.

- index.md (+ _includes/hero.html)
- games/ (본편/외전 각 스텁 페이지 포함)
- nh/ (업데이트, DLC)
- villagers/ (URL 파라미터 필터 지원: ?p=성격&g=성별&s=종류&bm=1)
- npc/, fish/, bugs/, sea/, fossils/, art/, gyroids/
- furniture/, clothing/, tools/, music/, recipes/
- locations/ (시설/시스템 세부 페이지 스텁 포함)
- events/ (월 선택 드롭다운 + events.json 렌더)
- community/, misc/
- assets/js/*.js / assets/data/*.json

## 배포
1) 저장소 루트에 압축 해제
2) 커밋/푸시 → GitHub Pages
3) 홈(/), 게임(/games/), 주민(/villagers/) 등 확인

## 데이터 확장
- JSON 파일에 항목만 추가하면 목록이 자동 확장됩니다.
- 색/여백/그리드는 테마(CSS)에 맞게 조정하세요.

# ACNH 위키 테마 (초록·연두)

이 패키지는 사이드바 네비, 상단 헤더, 다크모드 토글, 반응형 레이아웃을 포함한
Jekyll 기본 레이아웃/스타일입니다.

## 포함 파일
- `_layouts/default.html` — 페이지 기본 레이아웃
- `_includes/header.html` / `sidebar.html` / `footer.html`
- `assets/css/theme.css` — 초록/연두 테마
- `assets/js/ui.js` — 햄버거(모바일) / 다크모드 토글 / 현재 메뉴 하이라이트

## 사용법
1) 저장소 루트에 압축 해제 (덮어쓰기 OK)
2) 각 페이지의 프런트매터에서 `layout: default` 사용
3) 필요 시 사이드바 메뉴 링크를 프로젝트 경로에 맞게 수정


# All-in-One: ACNH 위키 기본 세트

이 압축 파일만 저장소 루트에 풀어서 커밋하면, 메인+도감(물고기/곤충/해산물)과
자동화(오늘의 생일/이달의 이벤트/이번 달 출현 생물/반구 토글)가 한 번에 동작합니다.

## 포함 파일
- index.md
- fish.md / bugs.md / sea.md
- assets/data/birthdays.json / events.json / critters.json
- assets/js/home-dynamic.js / fish.js / bugs.js / sea.js

## 배포 방법
1) 저장소 루트에 파일들을 그대로 복사/덮어쓰기
2) GitHub Pages 설정 후 배포
3) 메인(`/`) / 물고기(`/fish/`) / 곤충(`/bugs/`) / 해산물(`/sea/`) 확인

## 팁
- 색상은 CSS 변수(--accent, --accent-2 등)로 지정돼 있어 테마 조정이 쉬워요.
- critters.json에 데이터를 더 넣으면 자동으로 목록이 늘어납니다.

# 주민/화석/미술 도감 추가 세트

## 포함 파일
- villagers.md / assets/js/villagers.js / assets/data/villagers.json
- fossils.md   / assets/js/fossils.js   / assets/data/fossils.json
- art.md       / assets/js/art.js       / assets/data/art.json

## 사용법
1) 저장소 루트에 그대로 병합합니다.
2) GitHub Pages 배포 후 경로:
   - /villagers/
   - /fossils/
   - /art/
3) 데이터(JSON)는 계속 확장해도 구조만 맞으면 자동 반영됩니다.
