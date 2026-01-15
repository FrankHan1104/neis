# Netlify 배포 가이드

이 문서는 완성된 급식 조회 웹 앱을 Netlify를 통해 인터넷에 배포하는 방법을 안내합니다.

## 1. 프로젝트 준비 (Code Preparation)

현재 프로젝트에는 배포를 위한 설정 파일(`netlify.toml`)이 이미 포함되어 있습니다.
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`

## 2. GitHub에 코드 올리기

Netlify는 GitHub 저장소와 연동하여 자동으로 배포하는 것이 가장 편리합니다.

1. **GitHub 저장소 생성**: [GitHub](https://github.com/new)에서 새로운 Repository를 생성합니다 (예: `neis-school-meal-explorer`).
2. **코드 푸시**:
   터미널에서 다음 명령어를 순서대로 실행하여 코드를 GitHub에 올립니다.
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/neis-school-meal-explorer.git
   git push -u origin main
   ```
   *(YOUR_USERNAME 부분은 본인의 GitHub 아이디로 변경하세요)*

## 3. Netlify에서 배포하기

1. [Netlify](https://app.netlify.com/)에 로그인합니다.
2. **"Add new site"** > **"Import from existing project"**를 클릭합니다.
3. **Connect to Git provider**에서 **GitHub**를 선택합니다.
4. 방금 생성한 `neis-school-meal-explorer` 저장소를 선택합니다.
5. **Build settings** 화면이 나오면, `netlify.toml` 파일을 자동으로 인식하여 설정이 채워져 있을 것입니다.
   - Build command: `npm run build`
   - Publish directory: `dist`
6. **Deploy site** 버튼을 클릭합니다.

## 4. 확인 및 완료

- 배포가 시작되면 몇 분 내에 완료됩니다.
- 완료되면 Netlify에서 제공하는 URL (예: `https://random-name-123.netlify.app`)을 통해 접속할 수 있습니다.
- **Domain settings**에서 원하는 도메인으로 변경할 수도 있습니다.

## 5. 수동 배포 (대안)

GitHub를 사용하지 않고 바로 배포하고 싶다면:
1. 로컬에서 `npm run build` 명령어를 실행하여 `dist` 폴더를 생성합니다.
2. Netlify 대시보드의 "Sites" 탭으로 이동합니다.
3. 탐색기에서 `dist` 폴더를 드래그하여 브라우저의 "Drag and drop your site output folder here" 영역에 놓습니다.
4. 즉시 배포됩니다.
