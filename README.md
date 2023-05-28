<p align='center'><img alt='logo' src='https://github.com/Ryomi-j/Today_Clothing/assets/116236689/ed5c843e-f3e0-472e-afe5-293e97275e08'></p>
<h1 align='center'>TodayClothes는 다음 한 주 간의 의류정보를 미리 계획하고 사람들과 소통할 수 있는 커뮤니티입니다.</h1>

https://github.com/Ryomi-j/Today_Clothing/assets/116236689/b3c0405e-15c0-49f8-933b-aa8d4117dd33

[페이지 바로가기](https://today-clothing.web.app/)

## Introduce
흔히 친구와의 약속, 출근, 기념일 등등 다가오는 이벤트가 특별할수록 더 많은 시간을 투자해 옷에 신경쓰게 됩니다.
단순히 머릿속으로 무엇을 입을까 고민하기 보다는 이를 '기록'으로 남기면 어떨까요?
당신은 의류정보를 저장 및 공유하므로써 옷에 관한 당신의 고민을 줄여줄 수 있습니다.


## Function
1. 로그인한 사용자는 자신의 의류정보를 저장하고 사람들과 공유할 수 있다.
    * 지난주에 등록한 당신의 의류정보는 TodayClothes 페이지에서 확인할 수 있습니다.
    * 만약, 오늘을 위한 데이터가 없다면, 비슷한 날씨에 착용한 의류정보 3개를 불러와 보여줍니다.
    * 로그인한 사용자는 다음주에 입을 의류정보를 Closet 페이지에서 등록할 수 있습니다.
    * 과거부터 이번주까지의 의류정보는 Record 페이지에서 확인할 수 있습니다. 
    * 사용자는 Record 페이지에서 날짜, 날씨, 의류 정보를 확인할 수 있습니다.
    * 원하는 온도 범위를 설정하여 해당 기온에 입은 의류정보를 확인할 수 있습니다.
2. 공유된 데이터는 사람들과 댓글을 통해 소통할 수 있다.
    * 모든 사용자는 Talk 페이지에서 공유된 게시물을 읽을 수 있습니다. 
    * 로그인한 사용자는 게시물 상세페이지에서 댓글을 작성, 수정, 삭제할 수 있습니다. 
    * 게시글을 작성한 사용자는 해당 게시물을 삭제할 수 있습니다.


## Motivation
출근할 때 '오늘은 무슨 옷을 입을까?'라는 고민은 누구나 해보았을 것이라 생각합니다.
강사로 근무하는 동안 학생들은 제가 입는 옷에 관심이 많았습니다. 
시험기간과 같이 바쁜 시기에 가까운 시일 내에 비슷하거나 동일한 옷을 입고 출근하면 학생들은 ‘그거 언제 입었던 옷이네요’ 라는 말을 늘어 놓곤 했습니다.
당시에, '오늘 입은 옷을 어디에 어떻게 기록하면 좋을까?'라며 고민했던 경험이 생각나 프로젝트 소재로 선택했습니다.

덧붙여, 단순히 의류정보만 저장하기 보다는 무슨 옷을 입을지 고민할때 제일 먼저 찾아보는 날씨 정보를 더한다면 해당 웹 페이지가 더 유용할 수 있다는 생각이 들었습니다.
저의 경우, 외출 전 일기예보를 확인하지만, 체감온도가 어느 정도인지 가늠하기 힘들때가 종종 있습니다.
날씨정보와 함께 의류정보를 저장하면 과거에 비슷한 날씨에 어떤 옷을 입었는지 확인할 수 있고 이는 사용자의 의류 선택 시간을 줄여주는데 기여할 수 있다는 생각이 들었습니다.
이에 날씨와 의류정보를 결합한 TodayClothes 커뮤니티를 만들게 되었습니다.  


## Tech Stacks
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white">
<img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
<img src="https://img.shields.io/badge/recoil-3178C6?style=for-the-badge&logo=recoil&logoColor=white">
<img src="https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=white">
<img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
<img src="https://img.shields.io/badge/daisyui-A0EF8?style=for-the-badge&logo=daisyui&logoColor=white">
<img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white">
<img src="https://img.shields.io/badge/firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white">
<img src="https://img.shields.io/badge/linux-EBAF00?style=for-the-badge&logo=linux&logoColor=white">

*자세한 개발 스택은 package.json 참고*



### Configurations

```
📦src
 ┣ 📂api
 ┃ ┗ 📜weatherApi.ts
 ┣ 📂components
 ┃ ┣ 📂common
 ┃ ┃ ┣ 📜ImageFrame.tsx
 ┃ ┃ ┗ 📜Modal.tsx
 ┃ ┣ 📜Footer.tsx
 ┃ ┣ 📜Nav.tsx
 ┃ ┗ 📜PostDetailModal.tsx
 ┣ 📂store
 ┃ ┣ 📜date.ts
 ┃ ┣ 📜post.ts
 ┃ ┗ 📜user.ts
 ┣ 📂utils
 ┃ ┣ 📜infiniteScroll.ts
 ┃ ┣ 📜useWeekDates.ts
 ┃ ┗ 📜userGeolocation.ts
 ┣ 📂views
 ┃ ┣ 📜Closet.tsx
 ┃ ┣ 📜EditPost.tsx
 ┃ ┣ 📜Login.tsx
 ┃ ┣ 📜NotFound.tsx
 ┃ ┣ 📜Record.tsx
 ┃ ┣ 📜SignUp.tsx
 ┃ ┣ 📜Talk.tsx
 ┃ ┗ 📜TodayClothes.tsx
 ┣ 📜App.css
 ┣ 📜App.tsx
 ┣ 📜firebase.tsx
 ┣ 📜index.css
 ┣ 📜main.tsx
 ┗ 📜vite-env.d.ts
```


## Pages
- [기획](https://www.notion.so/Pre-3385ab578a9941ed81be1c84004a1110)
- [Figma](https://www.figma.com/file/1r2LQIi0Z6lmVwsjjg5bLT/Today-Clothing?type=whiteboard&node-id=0%3A1&t=hpdE4GH81OXTwCSu-1)
- [Trouble Shooting](https://www.notion.so/Today-s-Clothing-8a1f84b15ae648a48d9ce795345615c3)
- [프로젝트 설명](https://www.notion.so/Today-Clothing-f56a12d7f0954492b6e1f7274a7d078e)
