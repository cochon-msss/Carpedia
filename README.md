# 프로젝트 구조

node src/server.js

```
database : mysql
템플릿 : ejs 사용 불편으로 바꿀까 생각중
```

```bash
/project-root
│── /src
│   ├── /config          # 환경 변수, DB 설정 등
│   ├── /controllers     # 요청을 처리하는 컨트롤러
│   ├── /models          # 데이터 모델 정의
│   ├── /routes          # API 라우트 정의
│   ├── /middlewares     # 인증, 에러 처리 등의 미들웨어
│   ├── /services        # 비즈니스 로직을 처리하는 서비스 레이어
│   ├── /utils           # 공통 유틸리티 함수
│   ├── /views           # EJS 템플릿 파일 (템플릿 엔진을 사용할 경우)
│   ├── app.js           # Express 애플리케이션 초기화
│   └── server.js        # 서버 실행 파일
│
├── /public              # 정적 파일 (CSS, JS, 이미지 등)
│
├── /tests               # 테스트 코드
│
├── .env                 # 환경 변수 파일
├── package.json         # 프로젝트 메타 정보 및 종속성 목록
└── README.md            # 프로젝트 설명 파일
```


ERD

![erd](https://github.com/user-attachments/assets/d62ea729-cb4b-4a23-ad90-fe13a64575e9)


