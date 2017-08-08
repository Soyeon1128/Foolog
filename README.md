# FastCampus Team Project - Team1 \<Foolog\>
# 프로젝트 계획서 (Front-end)

## 팀원
- 강소연 (FDS)
- 전현우 (FDS)

## 프로젝트 목적
- 수업 시간에 배운 기술들을 적용해보는 경험
- 완성도 있는 기능 구현 (우선순위를 정하여 순차적으로 진행)
- 타 스쿨과 소통하여 협업

## 서비스 기획 의도
- Food + Blog = "Foolog"
- 일상에서 즐기는 맛있는 음식들을 기록하는 나만의 공간을 구현

## MVP (Minimal Viable Product)

#### 1. User
  
  - SignIn

  - SignUp

#### 2. Post

   - Add

      Photo / Diary / Location / Tags

    - Modify

    - Share

    - Delete

#### 3. Search

#### 4. Statistic

## 사용 기술
- Vue.js
- sass
- pug
- Vue-cli
- axios
- webpack
- Susy
- 데이터시각화 라이브러리 (예정)

## 서비스 환경
- 브라우저 대응 : IE 9+
- 반응형 : 모바일, 태블릿, 데스크탑
- 접근성

## 업무 분담 방식 (프론트)
- 라우팅 페이지 단위, 컴포넌트 단위로 분담 및 작업

## 협업 방식 (프론트)
- git을 이용한 centralized workflow

## 타 스쿨과의 협업 방식
- Back-end, Android, IOS 팀원들과 대면 미팅 및 슬랙 이용

## 라우팅 테이블
| 1DEPTH    	| 2DEPTH        | PATH                   	|
|------------	|-------------	|------------------------	|
| 메인        |              	| /                       	|
| 유저      	|              	| /user                	|
|          	 | 회원가입       	| /user/signup        	|
|          	 | 로그인         	| /user/signin         	|
| 달력      	|              	| /calendar                	|
| 포스팅       |              	| /post                   	|
| 검색 	      |              	| /search                 	|
| 통계       	|              	| /statistics             	|
