# Carpedia

자동차 제원 백과사전 웹 애플리케이션입니다.
제조사 → 모델 → 세대 → 트림 → 상세 제원(엔진, 성능, 치수, 섀시) 순으로 탐색할 수 있습니다.

## 기술 스택

| 분류 | 기술 |
|------|------|
| Backend | Node.js, Express |
| Template Engine | EJS |
| Database | MySQL (mysql2/promise) |
| Frontend | jQuery, SCSS |
| 3D 뷰어 | Google Model Viewer (GLB) |
| 보안 | Helmet, XSS-Clean |
| 로깅 | Winston + daily-rotate-file |

## 프로젝트 구조

```
├── src/
│   ├── config/           # DB 설정
│   ├── controllers/      # 요청 처리 컨트롤러
│   ├── services/         # 비즈니스 로직
│   ├── models/           # SQL 쿼리 (Raw Query)
│   ├── routes/           # 라우트 정의 (파일명 기반 자동 등록)
│   ├── middlewares/      # 보안, 로깅 미들웨어
│   ├── utils/            # DB 헬퍼, 로거 유틸
│   ├── views/            # EJS 템플릿
│   ├── app.js            # Express 앱 초기화
│   └── server.js         # HTTP/HTTPS 서버 실행
│
├── public/
│   ├── css/              # 컴파일된 CSS
│   ├── scss/             # SCSS 소스
│   ├── js/               # 클라이언트 JS (jQuery)
│   ├── images/           # 배경 이미지
│   ├── svg/              # 로고, 파비콘
│   └── models/           # 3D 모델 (GLB)
│
├── logs/                 # 로그 파일 (자동 생성, 30일 보관)
│   ├── access/           # HTTP 요청 로그
│   └── service/          # 서비스 레이어 로그
│
├── package.json
└── .env                  # 환경 변수 (Git 미포함)
```

## 시작하기

### 사전 요구 사항

- Node.js
- MySQL

### 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 아래 항목을 설정합니다.

```env
HTTP_PORT=8080
HTTPS_PORT=8443
SSL_KEY_PATH=/path/to/ssl.key
SSL_CERT_PATH=/path/to/ssl.crt
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=carpidia
DB_PORT=3306
```

### 설치 및 실행

```bash
# 의존성 설치
npm install

# SCSS 컴파일
npm run sass

# 서버 실행
node src/server.js
```

## 주요 기능

- **제조사/모델/세대 탐색** — AJAX 기반 3단계 네비게이션으로 차량을 선택
- **상세 제원 조회** — 엔진, 성능, 치수, 섀시 4개 카테고리별 스펙 테이블
- **3D 모델 뷰어** — GLB 포맷 3D 차량 모델 회전/줌 지원
- **다크/라이트 테마** — 시스템 설정 감지 + localStorage 기반 토글
- **커뮤니티** — 게시판 (개발 중)
- **차량 비교** — 비교 페이지 (개발 중)

## 아키텍처

**MVC + Service Layer** 패턴을 사용합니다.

```
Routes → Controllers → Services → Models → MySQL
```

- 라우트 파일은 `src/routes/` 내 파일명 기준으로 자동 등록됩니다 (예: `carInfo.js` → `/carInfo`)
- 차량 상세 스펙은 AJAX로 HTML 프래그먼트를 받아 클라이언트에서 렌더링합니다
- 모든 DB 쿼리는 `src/utils/dbHelper.js` 래퍼를 통해 파라미터 바인딩으로 실행됩니다

## ERD

![erd](https://github.com/user-attachments/assets/d62ea729-cb4b-4a23-ad90-fe13a64575e9)
