# peach-picker
공정한 추첨을 위한 플랫폼  

v1.1.0 로또 추가(2024.10)

v1.1.1 에러 수정(2024.11)

## ✨ 배포주소
[https://peach-picker.site/](https://peach-picker.site/)

## 🛠 기술스택

### ▪FE
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-181717?style=for-the-badge&logo=zustand&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)


### ▪BE

![Spring](https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
![Java](https://img.shields.io/badge/Java-007396?style=for-the-badge&logo=java&logoColor=white)


### ▪협업툴

![Discord](https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white)
![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white)
![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)

## 📋 주요 기능
### ▪ 메인화면

<img src="readme_assets/main.gif" width="600" />

### ▪ 회원가입

<img src="readme_assets/signup.gif" width="600" />

### ▪ My page

<img src="readme_assets/infoedit.gif" width="600" />

### ▪ 추첨 등록

<img src="readme_assets/register.gif" width="600" />

### ▪ 내 추첨 목록

<img src="readme_assets/mylist.gif" width="600" />

### ▪ 추첨

<img src="readme_assets/룰렛.gif" width="600" />
<img src="readme_assets/로또.gif" width="600" />

### ▪ 추첨 대기 목록

<img src="readme_assets/실시간추첨.gif" width="600" />

### ▪ 완료 추첨 목록

<img src="readme_assets/완료추첨.gif" width="600" />

### ▪ 기업 정보

<img src="readme_assets/info.gif" width="600" />

### ▪ 브랜드 스토리

<img src="readme_assets/brandstory.gif" width="600" />



## 💻 파일 구조
### ▪ FE
```
📦src
 ┣ 📂api
 ┃ ┣ 📜drawingAPI.js
 ┃ ┗ 📜listApi.jsx
 ┣ 📂components
 ┃ ┣ 📂about
 ┃ ┃ ┣ 📜SelectedMemberDetails.js
 ┃ ┃ ┗ 📜TeamMemberList.js
 ┃ ┣ 📂brandstory
 ┃ ┃ ┣ 📜Article.js
 ┃ ┃ ┗ 📜ScrollToTopButton.js
 ┃ ┣ 📂button
 ┃ ┃ ┣ 📜BasicBtn.jsx
 ┃ ┃ ┣ 📜Button.jsx
 ┃ ┃ ┣ 📜DarkModeToggle.jsx
 ┃ ┃ ┗ 📜ShortBtn.jsx
 ┃ ┣ 📂common
 ┃ ┃ ┗ 📜Modal.jsx
 ┃ ┣ 📂drawing
 ┃ ┃ ┣ 📜DrawDetails.jsx
 ┃ ┃ ┣ 📜EmojiRain.jsx
 ┃ ┃ ┣ 📜LottoBox.jsx
 ┃ ┃ ┣ 📜ParticipantsList.jsx
 ┃ ┃ ┣ 📜Wheel.jsx
 ┃ ┃ ┗ 📜WinnersList.jsx
 ┃ ┣ 📂list
 ┃ ┃ ┣ 📜GridView.jsx
 ┃ ┃ ┣ 📜Search.jsx
 ┃ ┃ ┣ 📜SearchAndFilters.js
 ┃ ┃ ┣ 📜SortSelector.jsx
 ┃ ┃ ┣ 📜TablePagination.js
 ┃ ┃ ┣ 📜TableView.js
 ┃ ┃ ┗ 📜ViewSelector.jsx
 ┃ ┣ 📂login
 ┃ ┃ ┣ 📜CheckBox.jsx
 ┃ ┃ ┣ 📜CropProfileImg.jsx
 ┃ ┃ ┣ 📜Input.jsx
 ┃ ┃ ┣ 📜KakaoLogin.jsx
 ┃ ┃ ┗ 📜MemberInfo.jsx
 ┃ ┣ 📂main
 ┃ ┃ ┣ 📜Carousel.jsx
 ┃ ┃ ┣ 📜FirstView.jsx
 ┃ ┃ ┣ 📜LastView.jsx
 ┃ ┃ ┣ 📜SecondView.jsx
 ┃ ┃ ┗ 📜ThirdView.jsx
 ┃ ┣ 📂register
 ┃ ┃ ┣ 📜croppedImg.jsx
 ┃ ┃ ┣ 📜ImgUpload.jsx
 ┃ ┃ ┣ 📜Modal.jsx
 ┃ ┃ ┣ 📜ResisterForm.jsx
 ┃ ┃ ┗ 📜Time.jsx
 ┃ ┣ 📂signup
 ┃ ┃ ┣ 📜EmailVerification.jsx
 ┃ ┃ ┣ 📜KakaoSignup.jsx
 ┃ ┃ ┣ 📜PrivacyPolicy.jsx
 ┃ ┃ ┗ 📜TermsOfService.jsx
 ┃ ┣ 📜Footer.jsx
 ┃ ┗ 📜Menu.jsx
 ┣ 📂contexts
 ┃ ┗ 📜AuthContext.jsx
 ┣ 📂fonts
 ┃ ┣ 📜._LINESeedKR-Th.ttf
 ┃ ┣ 📜base64font.jsx
 ┃ ┣ 📜NotoSansKR-Bold.ttf
 ┃ ┣ 📜NotoSansKR-ExtraBold.ttf
 ┃ ┣ 📜NotoSansKR-Regular.ttf
 ┃ ┗ 📜NotoSansKR-SemiBold.ttf
 ┣ 📂images
 ┃ ┣ 📜001.png
 ┃ ┣ 📜002.png
 ┃ ┣ 📜3dpeach.png
 ┃ ┣ 📜ball.jpg
 ┃ ┣ 📜bell.png
 ┃ ┣ 📜blue_heart.png
 ┃ ┣ 📜brand.png
 ┃ ┣ 📜brand.webp
 ┃ ┣ 📜choi.png
 ┃ ┣ 📜circle.png
 ┃ ┣ 📜diversity.jpg
 ┃ ┣ 📜doggy.jpg
 ┃ ┣ 📜drypeach.png
 ┃ ┣ 📜drypeach11.jfif
 ┃ ┣ 📜earth.png
 ┃ ┣ 📜earth.webp
 ┃ ┣ 📜game.jpg
 ┃ ┣ 📜google.png
 ┃ ┣ 📜green.png
 ┃ ┣ 📜greeny.png
 ┃ ┣ 📜hamburger.png
 ┃ ┣ 📜home.png
 ┃ ┣ 📜justice.jpg
 ┃ ┣ 📜kakao.png
 ┃ ┣ 📜kakaologin.png
 ┃ ┣ 📜kakao_login.png
 ┃ ┣ 📜Kim.png
 ┃ ┣ 📜link.jpg
 ┃ ┣ 📜list.png
 ┃ ┣ 📜lottery.png
 ┃ ┣ 📜lottery1.jfif
 ┃ ┣ 📜lottery3.png
 ┃ ┣ 📜main-picker.png
 ┃ ┣ 📜mainLetter.png
 ┃ ┣ 📜mainLetter.webp
 ┃ ┣ 📜naver.png
 ┃ ┣ 📜paper.jpg
 ┃ ┣ 📜people.jpg
 ┃ ┣ 📜pick_line.png
 ┃ ┣ 📜pink.png
 ┃ ┣ 📜present.png
 ┃ ┣ 📜React_2기_학습일지_학습회고.png
 ┃ ┣ 📜registernow.png
 ┃ ┣ 📜search.png
 ┃ ┣ 📜thirdLogo.png
 ┃ ┣ 📜to.png
 ┃ ┣ 📜treasure.png
 ┃ ┣ 📜upload.png
 ┃ ┣ 📜upload.webp
 ┃ ┣ 📜water.png
 ┃ ┣ 📜water.webp
 ┃ ┗ 📜white.png
 ┣ 📂pages
 ┃ ┣ 📂about
 ┃ ┃ ┗ 📜index.jsx
 ┃ ┣ 📂api
 ┃ ┃ ┣ 📂oauth
 ┃ ┃ ┃ ┗ 📜kakao.jsx
 ┃ ┃ ┣ 📜hello.js
 ┃ ┃ ┣ 📜profile.js
 ┃ ┃ ┗ 📜signup.jsx
 ┃ ┣ 📂brandstory
 ┃ ┃ ┗ 📜index.jsx
 ┃ ┣ 📂completedDrawings
 ┃ ┃ ┗ 📜index.jsx
 ┃ ┣ 📂drawings
 ┃ ┃ ┣ 📜index.jsx
 ┃ ┃ ┗ 📜[drawId].jsx
 ┃ ┣ 📂login
 ┃ ┃ ┣ 📜index.jsx
 ┃ ┃ ┣ 📜signup.jsx
 ┃ ┃ ┗ 📜test.jsx
 ┃ ┣ 📂mypage
 ┃ ┃ ┣ 📂mylist
 ┃ ┃ ┃ ┗ 📜index.jsx
 ┃ ┃ ┣ 📜edit.jsx
 ┃ ┃ ┗ 📜index.js
 ┃ ┣ 📂oauth
 ┃ ┃ ┣ 📂code
 ┃ ┃ ┃ ┗ 📜kakao.jsx
 ┃ ┃ ┗ 📜index.jsx
 ┃ ┣ 📂register
 ┃ ┃ ┣ 📜edit.jsx
 ┃ ┃ ┗ 📜index.jsx
 ┃ ┣ 📜index.js
 ┃ ┣ 📜_app.js
 ┃ ┗ 📜_document.js
 ┣ 📂store
 ┃ ┣ 📜authStore.jsx
 ┃ ┣ 📜darkModeStore.jsx
 ┃ ┣ 📜drawingStore.jsx
 ┃ ┗ 📜winnerStore.js
 ┣ 📂styles
 ┃ ┗ 📜globals.css
 ┗ 📜setupProxy.js
```
### ▪ BE
```

📦src
 ┣ 📂main
 ┃ ┣ 📂java
 ┃ ┃ ┗ 📂com
 ┃ ┃ ┃ ┗ 📂peach
 ┃ ┃ ┃ ┃ ┗ 📂backend
 ┃ ┃ ┃ ┃ ┃ ┣ 📂domain
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂drawing
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜DrawingController.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂req
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜DrawingReq.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜DrawingSeedReq.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜GetDrawingListReq.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜StartDrawingReq.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂resp
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜GetDrawingDetailsResp.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜GetDrawingListResp.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜DrawingRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜DrawingSeedRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜ParticipantRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜Drawing.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜DrawingSeed.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜Participant.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂enums
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜DrawingStatus.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜DrawingType.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂exception
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂error
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜DrawingErrorProperty.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜DrawingAtErrorException.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜DrawingCompletedErrorException.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜DrawingNotFoundException.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂facade
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜DrawingFacade.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂service
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜CreateDrawingSeedService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜CreateDrawingService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜DeleteDrawingService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜DoDrawingService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜GetDrawingService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜StartDrawingService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂user
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜UserController.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂kakao
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜KakaoCodeReq.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜KakaoProfile.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜KakaoToken.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂mail
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜EmailVerifyingDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂req
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ProfileUpdateReq.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜SignInReq.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜SignUpReq.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂resp
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ProfileResp.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜SignInResp.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜UserRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜User.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂enums
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜Role.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂facade
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜UserFacade.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂service
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜CreateUserService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜DeleteUserService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜EmailVerificationService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜GetUserService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜KakaoLoginService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜UpdateUserService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂util
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜EmailUtil.java
 ┃ ┃ ┃ ┃ ┃ ┣ 📂global
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂config
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜CacheConfig.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜RedisConfig.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜SpringConfig.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜WebConfig.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜BaseTimeEntity.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂error
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂exception
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜CommonException.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ErrorCode.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ErrorProperty.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜PeachPickerException.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ErrorResponse.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜PeachPickerExceptionHandler.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂security
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂config
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜SpringSecurityConfig.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜CurrentUser.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜CustomUserDetails.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂exception
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂error
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜JwtErrorProperty.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ExpiredTokenException.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜InvalidTokenException.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂filter
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜JwtAuthenticationFilter.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂service
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜CustomUserDetailsService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜JwtValidateService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂util
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜CustomUserUtil.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜JwtProperties.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜JwtTokenProvider.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂util
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂csv
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜ParticipantsCsvDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜CsvUtil.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂exception
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂error
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜CsvErrorProperty.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜CsvReadErrorException.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂minio
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂config
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜MinioConfig.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜MinioProperties.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂exception
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂error
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜MinioErrorProperty.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜MinioCanNotPutException.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜MinioObjectNotFoundException.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜MinioUtil.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂validator
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂annotation
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜CsvFileOnly.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜FiveMinuteInterval.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜RequestNotNull.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂impl
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜CsvFileOnlyValidator.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜FiveMinuteIntervalValidator.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜RequestNotNullValidator.java
 ┃ ┃ ┃ ┃ ┃ ┗ 📜BackendApplication.java
 ┃ ┗ 📂resources
 ┃ ┃ ┣ 📂error
 ┃ ┃ ┃ ┗ 📜exception.yml
 ┃ ┃ ┗ 📂templates
 ┃ ┃ ┃ ┗ 📜code.html
 ┗ 📂test
 ┃ ┗ 📂java
 ┃ ┃ ┗ 📂com
 ┃ ┃ ┃ ┗ 📂peach
 ┃ ┃ ┃ ┃ ┗ 📂backend
 ┃ ┃ ┃ ┃ ┃ ┣ 📂security
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜SecurityTest.java
 ┃ ┃ ┃ ┃ ┃ ┣ 📂user
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜UserTest.java
 ┃ ┃ ┃ ┃ ┃ ┗ 📜BackendApplicationTests.java
```



## 👨‍💻 팀원
| 이름     | 역할                                    |
| -------- | --------------------------------------- |
| 최형우   | BE   |
| 김지홍 | BE          |
| 박소윤   | FE               |

