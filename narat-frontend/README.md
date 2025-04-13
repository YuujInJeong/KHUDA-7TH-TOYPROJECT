# NARAT (나랏) - AI 기반 한국어 학습 플랫폼

## 📌 프로젝트 소개

NARAT(나랏)은 외국인 학습자를 위한 AI 기반 맞춤형 한국어 학습 플랫폼입니다. 
사용자의 학습 수준과 목표에 맞춘 개인화된 학습 경험을 제공합니다.

## 🛠 기술 스택

- **프레임워크:** React 18
- **언어:** TypeScript
- **라우팅:** React Router v6
- **스타일링:** Styled Components
- **상태관리:** React Context API
- **HTTP 클라이언트:** Axios
- **개발 도구:** ESLint, Prettier

## 🚀 시작하기

### 필수 요구사항
- Node.js 18.0.0 이상
- npm 9.0.0 이상

### 설치 및 실행

```bash
# 저장소 클론
git clone https://github.com/your-username/narat-frontend.git

# 프로젝트 디렉토리로 이동
cd narat-frontend

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
```

## 📁 프로젝트 구조

```
narat-frontend/
├── public/                # 정적 파일
├── src/
│   ├── api/              # API 통신 관련
│   │   ├── axios.ts      # axios 설정
│   │   ├── auth.ts       # 인증 API
│   │   ├── services.ts   # API 서비스
│   │   └── types.ts      # API 타입 정의
│   │
│   ├── components/       # 컴포넌트
│   │   ├── auth/        # 인증 관련
│   │   ├── common/      # 공통 UI
│   │   └── modals/      # 모달
│   │
│   ├── context/         # Context API
│   │   └── AuthContext.tsx
│   │
│   ├── pages/           # 페이지
│   │   ├── Dashboard/   # 대시보드
│   │   ├── Quiz/        # 학습 퀴즈
│   │   ├── Auth/        # 인증
│   │   └── Statistics/  # 학습 통계
│   │
│   ├── styles/          # 스타일
│   │   ├── global.ts    # 전역 스타일
│   │   └── theme.ts     # 테마 설정
│   │
│   ├── App.tsx
│   └── main.tsx
│
└── package.json
```

## 💡 주요 기능

### 1. 사용자 인증
- 구글 OAuth2.0 기반 소셜 로그인
- JWT 토큰 기반 인증 관리
- 자동 로그인 지원

### 2. 학습 기능
- AI 기반 맞춤형 한국어 학습 콘텐츠
- 실시간 발음 평가
- 문법 교정 및 설명
- 단계별 학습 진행

### 3. 학습 관리
- 개인별 학습 진도 추적
- 취약점 분석 및 맞춤 복습
- 학습 통계 및 성과 분석
- 학습 목표 설정 및 관리

### 4. UI/UX
- 반응형 디자인
- 다크/라이트 모드 지원
- 직관적인 학습 인터페이스
- 실시간 피드백 시스템

## 🔍 환경 설정

### 환경 변수
```env
VITE_API_URL=백엔드 API 주소
VITE_GOOGLE_CLIENT_ID=구글 클라이언트 ID
```

## 📝 컨벤션

### 커밋 메시지
- feat: 새로운 기능 추가
- fix: 버그 수정
- docs: 문서 수정
- style: 코드 포맷팅
- refactor: 코드 리팩토링
- test: 테스트 코드
- chore: 기타 변경사항

### 코드 스타일
- ESLint 규칙을 준수합니다
- Prettier를 사용한 코드 포맷팅
- 컴포넌트는 함수형으로 작성
- TypeScript strict 모드 사용

## 📞 문의

프로젝트에 대한 문의나 제안사항이 있으시다면 이슈를 등록해주세요.
