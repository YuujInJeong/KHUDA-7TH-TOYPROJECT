# NARAT - 한국어 학습 도우미 프론트엔드

NARAT은 AI와 함께하는 맞춤형 한국어 학습을 도와주는 웹 애플리케이션입니다.

## 프로젝트 구조

```
narat-frontend/
├── public/                 # 정적 파일
├── src/
│   ├── api/               # API 관련 파일
│   │   ├── axios.ts      # axios 인스턴스 설정
│   │   ├── auth.ts       # 인증 관련 API
│   │   ├── services.ts   # API 서비스 함수들
│   │   └── types.ts      # API 타입 정의
│   │
│   ├── components/        # 재사용 가능한 컴포넌트
│   │   ├── auth/         # 인증 관련 컴포넌트
│   │   ├── common/       # 공통 컴포넌트
│   │   └── modals/       # 모달 컴포넌트
│   │
│   ├── context/          # React Context
│   │   └── AuthContext.tsx  # 인증 상태 관리
│   │
│   ├── pages/            # 페이지 컴포넌트
│   │   ├── Dashboard.tsx    # 대시보드 페이지
│   │   ├── Login.tsx        # 로그인 페이지
│   │   ├── Quiz.tsx         # 퀴즈 페이지
│   │   ├── Statistics.tsx   # 통계 페이지
│   │   └── ...
│   │
│   ├── styles/           # 스타일 관련 파일
│   │   ├── globalStyles.ts  # 전역 스타일
│   │   └── theme.ts         # 테마 설정
│   │
│   ├── App.tsx           # 앱의 루트 컴포넌트
│   ├── index.tsx         # 진입점
│   └── routes.tsx        # 라우팅 설정
│
├── package.json          # 프로젝트 의존성
└── tsconfig.json         # TypeScript 설정
```

## 주요 파일 설명

### 페이지 컴포넌트

- `Dashboard.tsx`: 사용자의 학습 현황과 통계를 보여주는 대시보드
- `Quiz.tsx`: 한국어 학습 퀴즈를 제공하는 페이지
- `Statistics.tsx`: 학습 통계와 성과를 보여주는 페이지
- `Login.tsx`: 구글 로그인을 제공하는 페이지
- `Onboarding.tsx`: 앱 소개 및 시작 화면

### 컴포넌트

- `components/common/`: 버튼, 입력 필드 등 재사용 가능한 UI 컴포넌트
- `components/auth/`: 로그인, 회원가입 등 인증 관련 컴포넌트
- `components/modals/`: 정답/오답 피드백 등 모달 컴포넌트

### API 및 상태 관리

- `api/axios.ts`: API 요청을 위한 axios 인스턴스 설정
- `api/services.ts`: API 엔드포인트 호출 함수들
- `context/AuthContext.tsx`: 사용자 인증 상태 관리

### 스타일링

- `styles/theme.ts`: 색상, 폰트, 간격 등 테마 설정
- `styles/globalStyles.ts`: 전역 스타일 정의

## 기술 스택

- React
- TypeScript
- React Router
- Styled Components
- Axios

## 시작하기

1. 의존성 설치
```bash
npm install
```

2. 개발 서버 실행
```bash
npm start
```

3. 빌드
```bash
npm run build
```

## 주요 기능

- 구글 로그인을 통한 사용자 인증
- 맞춤형 한국어 학습 퀴즈
- 실시간 피드백과 설명
- 학습 통계 및 성과 분석
- 반응형 디자인
