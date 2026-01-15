# 전국 학교 급식 조회 (NEIS School Meal Explorer)

NEIS 오픈 API를 활용하여 전국의 초/중/고등학교 급식 정보를 간편하게 조회할 수 있는 웹 애플리케이션입니다.

## 주요 기능
- 전국 교육청 및 학교 검색
- 날짜별 급식 식단 조회
- AI(Google Gemini)를 이용한 영양 분석 (선택 사항)
- 반응형 웹 디자인 (PC/Mobile)

## 기술 스택
- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS v4, PostCSS
- **API**: NEIS Open API, Google Gemini API

## 로컬 실행 방법

1. 의존성 설치:
   ```bash
   npm install
   ```
2. 앱 실행:
   ```bash
   npm run dev
   ```

## 배포
Netlify를 통해 배포할 수 있습니다. 자세한 내용은 `DEPLOYMENT.md`를 참고하세요.
