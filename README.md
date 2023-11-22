<!-- 대문 이미지 넣기  -->

![대문사진](https://github.com/Modoo-s-Seoul/ModooSeoul/assets/87963766/79e26981-50ed-4850-8d1b-3faf847a933e)

# 🐶 PET:DIO 🐱

> 우리집 멍냥이를 위한 이색 사진관<br>

## 🔗 라이브

[PET:DIO](https://petdio.co.kr)
<br>
<br>

## ✈️ 프로젝트 소개

사용자가 일상 속에서 찍었던 반려동물의 사진들을 기반으로 이미지 생성 AI 기술을 활용하여 반려동물에 대한 다양한 컨셉의 이미지를 생성해주는 서비스입니다.

<br>

## ⏰ 개발 기간

2023년 10월 10일 ~ 2023년 11월 17일

<br>

## 👩‍💻 멤버 구성

|  이름  |                                    역할                                    |
| :----: | :------------------------------------------------------------------------: |
| 최휘빈 |   팀장, Leonardo ai 이미지 개발 및 발표,UCC 촬영 및 편집, 대외홍보 담당    |
| 김명진 | Api 제작, 이미지 생성 및 모델 학습 파이프라인 제작, DB설계, 이슈 해결 담당 |
| 곽형석 |                    API 제작, AI 모델 학습, CI/CD 및 DB 설계                              |
| 신택수 |                     시큐리티 및 AI 모델 학습, API 제작                     |
| 박성준 |                      화면 설계, UX/UI 디자인 및 구현                       |
| 배정원 |           화면 구현 및 프론트엔드 개발환경 구성, 이슈 해결 담당            |

<br>

## 📌 기술 스택

&nbsp;&nbsp;&nbsp;&nbsp; **🛠 Frontend Develop** <br>

<img src="https://img.shields.io/badge/typescript-%23007ACC?style=for-the-badge&logo=typescript&logoColor=white">
<img src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white">
<img src="https://img.shields.io/badge/pwa-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white">
<img src="https://img.shields.io/badge/mui-007FFF?style=for-the-badge&logo=mui&logoColor=white">
<img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">
<img src="https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white">
<img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white">

&nbsp;&nbsp;&nbsp;&nbsp; **🛠 Backend Develop** <br>
<img src="https://img.shields.io/badge/Java-007396?style=for-the-badge&logo=Java&logoColor=white">
<img src="https://img.shields.io/badge/gradle-02303A?style=for-the-badge&logo=gradle&logoColor=white">
<img src="https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white">
<img src="https://img.shields.io/badge/openjdk-437291?style=for-the-badge&logo=openjdk&logoColor=white">

&nbsp;&nbsp;&nbsp;&nbsp; **🛠 DataBase** <br>
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)
<img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
<img src="https://img.shields.io/badge/firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white">

&nbsp;&nbsp;&nbsp;&nbsp; **🛠 CI/CD** <br>
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Jenkins](https://img.shields.io/badge/jenkins-%232C5263.svg?style=for-the-badge&logo=jenkins&logoColor=white)
![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white)

&nbsp;&nbsp;&nbsp;&nbsp; **🛠 SCM** <br>

![GitLab](https://img.shields.io/badge/gitlab-%23181717.svg?style=for-the-badge&logo=gitlab&logoColor=white)
![Jira](https://img.shields.io/badge/jira-%230A0FFF.svg?style=for-the-badge&logo=jira&logoColor=white)
![Notion](https://img.shields.io/badge/Notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white)
![Mattermost](https://img.shields.io/badge/mattermost-0058CC?style=for-the-badge&logo=mattermost&logoColor=white)

<br>

## 🛠️︎ 시스템 아키텍쳐

![Architecture](https://github.com/Baejw0111/ArtLink/assets/87963766/611326a8-f260-41bb-a381-b950a8bc5c5a)

## 📌 주요 기능

**로그인, 로그아웃**

Spring Security, JWT, OAuth2를 사용한 카카오 소셜 로그인을 구현했습니다.

![image](https://user-images.githubusercontent.com/108192878/284829992-3b9fbab1-d7fb-4214-9bbb-a06ae926e832.gif)

![image](https://user-images.githubusercontent.com/108192878/284829999-25570c9c-f442-47a5-8f5b-60fdb3822c3c.gif)

**캐주얼 사진관**

미리 만들어진 테마에 반려동물의 사진 1장을 넣어 해당 테마가 적용된 이미지를 생성해주는 기능입니다.

![image](https://github.com/Baejw0111/ArtLink/assets/87963766/44e009fb-cbd8-453c-87cd-1376dff01ee3)

![image](https://user-images.githubusercontent.com/108192878/284830005-58f159c3-97f7-44f0-ad3d-12161647dbb3.gif)

**AI 스튜디오**

반려동물의 사진들로 학습시킨 모델을 생성합니다. 생성한 모델을 기반으로 다양한 컨셉을 적용시킨 이미지들을 만들어낼 수 있습니다. 사진을 많이 넣어 학습시킬수록 생성되는 이미지의 질이 보장됩니다.

![image](https://github.com/Baejw0111/ArtLink/assets/87963766/fbe8780d-9420-4410-b372-dac027052f7b)

![image](https://user-images.githubusercontent.com/108192878/284829953-e16ca4dd-5b6d-4a1f-a014-c35097bd6473.gif)

**앨범**

지금까지 생성한 이미지들을 볼 수 있는 곳입니다. 컨셉 테마에 따라 이미지들을 필터링해서 조회할 수도 있습니다.

![image](https://github.com/Baejw0111/ArtLink/assets/87963766/d71cd109-b7bd-4998-af3b-530ad5a9f384)

![image](https://user-images.githubusercontent.com/108192878/284830033-daecee08-ce7f-41a1-8809-2ff34809f3c8.gif)
