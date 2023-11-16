# 🗣️ 말해Vr
---

### 📜 contents
 1. [프로젝트 설명](https://lab.ssafy.com/s09-final/S09P31A501/-/blob/develop/README.md#%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EC%84%A4%EB%AA%85)
 2. [주요 기능]
 3. [서비스 화면]
 4. [개발 환경]
 5. [프로젝트 파일 구조](https://lab.ssafy.com/s09-final/S09P31A501/-/blob/develop/README.md#%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%ED%8C%8C%EC%9D%BC-%EA%B5%AC%EC%A1%B0)
 6. [시스템 아키텍처]
 7. [기획 및 설계 산출물](https://lab.ssafy.com/s09-final/S09P31A501#%EF%B8%8F%EA%B8%B0%ED%9A%8D-%EB%B0%8F-%EC%84%A4%EA%B3%84-%EC%82%B0%EC%B6%9C%EB%AC%BC)
 8. [팀원 소개](https://lab.ssafy.com/s09-final/S09P31A501#%ED%8C%80%EC%9B%90-%EC%86%8C%EA%B0%9C) 

## 📣프로젝트 설명
| 진행 기간 | 2023.10.09 ~ 2023.11.17 (7주) |
| --- | --- |
### ❗개요

말해Vr는 VR 내 AI와 회화 연습을 제공하며, 웹 사이트에서 추가적인 영어 학습이 가능한 서비스입니다.

### ❓ 기획 의도


> 비대면 외국어 학습 수요 증가

> 디지털 영어학습 시장, AI 영어학습 솔루션 트렌드

> AR 및 VR 시장 2027년까지 25.3% 성장 전망

## 주요 기능


## 서비스 화면


## 개발 환경


## 📦프로젝트 파일 구조

<details><summary>📂 Backend</summary>

<!-- 📂 backend -->

```
├─📂 .gradle
└─📂 src
    ├─📂 main
    │  ├─📂 java
    │  │  └─📂 com
    │  │      └─📂 npc
    │  │          └─📂 say_vr
    │  │              ├─📂 domain
    │  │              │  ├─📂 flashcards
    │  │              │  │  ├─📂 api
    │  │              │  │  ├─📂 constant
    │  │              │  │  ├─📂 domain
    │  │              │  │  ├─📂 dto
    │  │              │  │  ├─📂 exception
    │  │              │  │  ├─📂 repository
    │  │              │  │  └─📂 service
    │  │              │  ├─📂 game
    │  │              │  │  ├─📂 api
    │  │              │  │  ├─📂 constant
    │  │              │  │  ├─📂 domain
    │  │              │  │  ├─📂 dto
    │  │              │  │  ├─📂 exception
    │  │              │  │  ├─📂 repository
    │  │              │  │  └─📂 service
    │  │              │  ├─📂 study
    │  │              │  │  ├─📂 api
    │  │              │  │  ├─📂 constant
    │  │              │  │  ├─📂 domain
    │  │              │  │  ├─📂 dto
    │  │              │  │  │  ├─📂 requestDto
    │  │              │  │  │  └─📂 responseDto
    │  │              │  │  ├─📂 exception
    │  │              │  │  ├─📂 repository
    │  │              │  │  │  ├─📂 CheckListItemRepository
    │  │              │  │  │  ├─📂 flashcardDeckRepostiory
    │  │              │  │  │  ├─📂 GoalRepository
    │  │              │  │  │  ├─📂 studyDeckRepository
    │  │              │  │  │  ├─📂 studyMemberRepository
    │  │              │  │  │  ├─📂 studyRepository
    │  │              │  │  │  └─📂 WeeklySprintRepository
    │  │              │  │  └─📂 service
    │  │              │  ├─📂 user
    │  │              │  │  ├─📂 api
    │  │              │  │  ├─📂 constant
    │  │              │  │  ├─📂 domain
    │  │              │  │  ├─📂 dto
    │  │              │  │  ├─📂 exception
    │  │              │  │  ├─📂 repository
    │  │              │  │  │  └─📂 activityRepository
    │  │              │  │  └─📂 service
    │  │              │  └─📂 vr
    │  │              │      ├─📂 api
    │  │              │      ├─📂 constant
    │  │              │      ├─📂 domain
    │  │              │      ├─📂 dto
    │  │              │      ├─📂 exception
    │  │              │      ├─📂 repository
    │  │              │      └─📂 service
    │  │              └─📂 global
    │  │                  ├─📂 api
    │  │                  ├─📂 config
    │  │                  │  └─📂 security
    │  │                  ├─📂 constant
    │  │                  ├─📂 dto
    │  │                  ├─📂 entity
    │  │                  ├─📂 error
    │  │                  │  ├─📂 constant
    │  │                  │  └─📂 exception
    │  │                  ├─📂 file
    │  │                  ├─📂 filter
    │  │                  └─📂 util
    │  └─📂 resources
    │      └─📂 data
    └─📂 test
        └─📂 java
            └─📂 com
                └─📂 npc
                    └─📂 say_vr

```
</details>

<details><summary> 📂 Frontend</summary>
<!-- 📂 frontend -->

```
├─📂 public
└─📂 src
    ├─📂 api
    │  ├─📂 constAPI
    │  ├─📂 MatchingGameAPI
    │  ├─📂 MyPageAPI
    │  │  └─📂 ActivityCalendar
    │  ├─📂 MyStudyAnalysisAPI
    │  ├─📂 ShadowingPageAPI
    │  ├─📂 StudyPageAPI
    │  ├─📂 UserPageAPI
    │  └─📂 VocabListAPI
    ├─📂 assets
    │  ├─📂 Etc
    │  ├─📂 MainPageAssets
    │  ├─📂 MatchingGamePageAssets
    │  ├─📂 MygradeAssets
    │  └─📂 YoutubeCard
    ├─📂 components
    │  ├─📂 MatchingGameComponents
    │  │  ├─📂 GameProceedingPage
    │  │  └─📂 WaitingPage
    │  ├─📂 MyPageComponents
    │  │  ├─📂 ActivityCalendar
    │  │  ├─📂 ChangeNicknameModal
    │  │  ├─📂 ChangeProfileModal
    │  │  ├─📂 StudyCard
    │  │  └─📂 WordCard
    │  ├─📂 MyStudyAnalysisComponents
    │  │  └─📂 Translation
    │  ├─📂 ShadowingComponents
    │  │  └─📂 TranslationComponents
    │  ├─📂 StudyComponents
    │  │  └─📂 Icons
    │  └─📂 VocabListComponents
    │      └─📂 Icons
    ├─📂 pages
    │  ├─📂 LoginPage
    │  ├─📂 MainPage
    │  ├─📂 MatchingGamePage
    │  │  ├─📂 constants
    │  │  └─📂 MatchingGameProceedingPage
    │  ├─📂 MyPage
    │  ├─📂 MyStudyAnalysisPage
    │  │  └─📂 MyStudyAnalysisDetailPage
    │  ├─📂 ShadowingPage
    │  │  ├─📂 BBCPage
    │  │  ├─📂 CNNPage
    │  │  ├─📂 ShadowingDetailPage
    │  │  ├─📂 TeamCOCOPage
    │  │  └─📂 TEDPage
    │  ├─📂 SignPage
    │  ├─📂 StudyPage
    │  │  ├─📂 StudyDeckDetailPage
    │  │  └─📂 StudyDetailPage
    │  └─📂 VocabListPage
    │      ├─📂 DeckDetailPage
    │      ├─📂 DeckLearnPage
    │      └─📂 DeckListPage
    └─📂 recoil
```
</details>


<details><summary> 📂 VR</summary>
<!-- 📂 VR -->

```
├─📂 TalkVR
│  ├─📂 Component
│  ├─📂 UI
│  │  ├─📂 Menu
│  │  ├─📂 ConversationList
│  │  ├─📂 ConversationDetail
│  │  └─📂 ConversationOngoing
│  ├─📂 Player
│  │  ├─📂 Pawn
│  │  └─📂 Controller
│  ├─📂 NPC
│  │  ├─📂 AI
│  │  └─📂 Crowd
│  ├─📂 Input
│  │  ├─📂 IMC
│  │  └─📂 IA
│  └─📂 Maps
│      ├─📂 MyRoom
│      └─📂 Venice
└─📂 Asset
    ├─📂 Venice
    │  ├─📂 Texture
    │  ├─📂 Mesh
    │  └─📂 Actor
    └─📂 MyRoom
        ├─📂 Texture
        ├─📂 Mesh
        └─📂 Actor

```
</details>

## 시스템 아키텍처


## 🗃️기획 및 설계 산출물
- [📝 기능 명세서](https://infrequent-attraction-ca6.notion.site/98b6503f14df47b3a6ec0b11058f408c)
- [🗞️ API 명세서](https://infrequent-attraction-ca6.notion.site/API-a83b368c239f4db1a12b91c81e00e811?pvs=4)
- [🎨 와이어프레임](https://www.figma.com/file/yBIEwfiSadBuUsuk45q1uq/A501?type=design&node-id=0%3A1&mode=design&t=F6tclqYa0DnB3OxV-1)

<details><summary> 🧱 ERD
</summary>
![말해VrERD](./exec/image/말해VrERD.png)
</details>

## 🙌팀원 소개
| 팀원 | 역할 |
| --- | --- |
|[임정현](https://lab.ssafy.com/chfhddl1234)|팀장, Infra, BE, FE|
|[김종원](https://lab.ssafy.com/jkjongwon)|BE, FE|
|[최지원](https://lab.ssafy.com/wldnjs9515)|BE, FE|
|[신석철](https://lab.ssafy.com/scshin97)|FE|
|[박한샘](https://lab.ssafy.com/phsaem98)|VR|
|[이정준](https://lab.ssafy.com/jjyoyo83)|VR|


