# ✨오더 캔버스 ✨

## 손쉽게 이쁜 디지털 메뉴판을 만들어보세요.

- [팀 노션 바로가기](https://adhesive-carpet-0f4.notion.site/MenuCanvas-a950308ec6d049c6acbd171f420bbe7c)

  - [1. 소개](#1-소개)
  - [2. 아키텍처](#2-아키텍처)
  - [3. 실행 방법](#3-실행방법)
  - [4. 디렉토리](#4-디렉토리)
  - [5. 개발방법](#5-개발방법)
  - [6. 저작권](#6-저작권)
  - [7. 팀원](#7-팀원)

## 1. 소개


배달의민족, 스타벅스의 사이렌 오더, 네이버 플레이스 등 과 같은 요식업 중심 주문 및 관리 플랫폼 서비스들은 대형 프랜차이즈 및 서비스 기업을 중심으로 서비스가 개발되 었고 서비스 기업은 플랫폼을 통한 데이터 수집에 집중하고 있는 구조를 띄고 있다. 이 로 인해 자사 포인트 결제를 이용하는 네이버 플레이스를 제외한 타 서비스들은 결제 내역의 3.3% ~ 10%의 수수료를 납부하는 형태이다. 이로 인해 비용적인 고민과 더불어 IT 서비스가 익숙하지 않은 중소상공인들을 위해 개발을 시작하였다.

기존 서비스들은 입점업체의 업종이 다양함에도 모두 동일한 메뉴판과 정보를 필 수입 력해야 하는 문제점이 존재하였다. 해당 작품은 IT 서비스가 낯선 사장님들도 자신의 업종의 최적화된 디지털 메뉴판을 QR 코드만으로 손쉽게 자신의 모바일 기기로 주문하 는 것을 목표로 하고 있다.
또한 배달의민족과 같은 서비스는 주문 과정까지의 경로가 단순하지 않기 때문에 IT 서 비스에 익숙하지 않은 유저들과 장애인들이 사용에 어려움을 겪고 있다. 따라서 웹 접 근 성지침을 준수한 UI 설계를 통하여 주문 과정의 단순화에 집중할 예정이다.
> 이를 통하여 팬데믹 후 가속화된 4차 산업 시대 속에서 기초 자금과 IT 서비스에 익숙 하지 않은 중소상공인들이 시장에서 경쟁력을 가질 수 있는 하나의 도구로서 기능하는 것을 최종 목표로 설계하였다.

<img width="529" alt="image" src="https://user-images.githubusercontent.com/54930877/157591596-1efb1fd6-c4bb-4bd9-bd5c-980878b34ad8.png">

### 메뉴판 만들기
<img width="1562" alt="image" src="https://user-images.githubusercontent.com/54930877/157591745-e395d34d-9a75-4f03-9b59-affcb5806a78.png">

### QR 코드
<img width="1561" alt="image" src="https://user-images.githubusercontent.com/54930877/157591935-5fb83b68-e809-45cc-af9c-b1b40416b4b6.png">

### 주문 확인
<img width="1563" alt="image" src="https://user-images.githubusercontent.com/54930877/157592050-4f216442-25f0-4ef0-b996-32311882ae4e.png">


## 2. 아키텍처

<img width="1167" alt="image" src="https://user-images.githubusercontent.com/54930877/157592191-67d3e089-a990-47ed-8f9b-102dbfa07c12.png">

현재 보이는 아키텍쳐는 CI/CD 파이프라인을 포함한 전체 환경이다. 코드를 깃허브에 push 하게 되면 웹훅 트리거가 작동하여 Jenkins를 통해 그래들과 스프링부트 도커 이 미지를 빌드되는 것을 목표로 설계하였다. 빌드된 이미지는 도커 허브에 푸쉬 되고 WAS는 해당 이미지를 pull하여 리액트를 통해 웹에 보여지게 된다.

## 3. 실행방법
```
docker-compose up --build
```

## 4. 디렉토리

```
├── Document
│   ├── S2-7 팀장 허민 송경진 김기현 장아령.pptx
│   ├── 종합설계 수행보고서.hwp
│   └── 종합설계 수행보고서.pdf
├── README.md
├── backend
│   ├── Dockerfile
│   ├── build.gradle
│   ├── gradle
│   ├── gradlew
│   ├── gradlew.bat
│   ├── settings.gradle
│   └── src
├── db
│   └── menucanvas
├── docker-compose.yml
└── frontend
    ├── Dockerfile
    ├── README.md
    ├── components
    ├── next-env.d.ts
    ├── next.config.js
    ├── node_modules
    ├── package-lock.json
    ├── package.json
    ├── pages
    ├── postcss.config.js
    ├── public
    ├── recoil
    ├── styles
    ├── tailwind.config.js
    └── tsconfig.json
```

## 5. 개발방법

**<타입> 리스트**

```
- feat : 기능 (새로운 기능)
- fix : 버그 (버그 수정)
- refactor : 리팩토링
- style : 스타일 (코드 형식. 세미콜론 추가 : 비즈니스 로직에 변경 없음)
- docs : 문서 (문서 추가, 수정, 삭제)
- test : 테스트 (테스트 코드 추가, 수정, 삭제 : 비즈니스 로직에 변경 없)
- chore : 기타 변경사항, 셋팅 ㅗ간련 (빌드 스크립트 수정 등)
```

**커밋 시 아래의 규칙을 지켰습니다.**

1. 제목은 명령문으로 한다.
2. 제목 끝에 마침표(.)를 쓰지 않는다.
3. 제목과 본문을 한 줄 띄워 분리한다.
4. 본문은 “어떻게" 보다 “무엇을", “왜" 설명한다.
5. 본문에 여러줄의 메시지를 작성할 땐 “-”로 구분한다.

![Untitled-Page-1](https://user-images.githubusercontent.com/54930877/152672453-8ee9899c-61d8-4771-bee1-1a49e13b3cee.jpg)

**Main branch**

- 배포 가능한 상태만을 관리하는 브랜치입니다. Vercel과 배포 파이프라인이 연결되어 바로 배포된 도메인으로 확인할 수 있게 하였습니다.
  - 새로운 Feature가 추가되었을때 1.0 → 2.0 과 같이 정수 버전을 릴리즈 했습니다.
  - 새로운 기능이 추가되지 않고 버그 및 디자인 수정의 경우 1.0 → 1.1 과 같이 소수점 버전을 릴리즈 했습니다.

**Develop branch**

- 다음에 배포할 것을 개발하는 브랜치입니다.
- develop 브랜치는 통합 브랜치의 역할을 하며, 평소에는 이 브랜치를 기반으로 개발을 진행합니다.

**Feature branch**

- 기능을 개발하는 브랜치로, develop 브랜치로부터 분기합니다.
- feature 브랜치는 그 기능을 다 완성할때까지 유지하고, 다 완성되면 Develop 브랜치로 merge합니다.
- merge 후 배포가 완료된 브랜치는 바로 삭제 하고 있습니다.

## 6. 저작권

해당 프로젝트의 저작권은 한국공학대학교 컴퓨터공학과에 귀속됩니다. 

## 7. 팀원

| Name    | 허민                                     | 송경진                                   | 장아령                                       | 김기현                                 |
| ------- | ---------------------------------------- | ---------------------------------------- | -------------------------------------------- | -------------------------------------- |
| Profile | <img width="200px" src="https://avatars.githubusercontent.com/u/54930877?v=4" />                               | <img width="200px" src="https://avatars.githubusercontent.com/u/77317133?v=4" />                               | <img width="200px" src="https://avatars.githubusercontent.com/u/65939213?v=4" />                                   | <img width="200px" src="https://avatars.githubusercontent.com/u/58874807?v=4" />                             |
| role    | Team Leader, <br>Frontend                 | Backend                                  | Frontend                                     | Backend                                |
| Github  | [@hhhminme](https://github.com/hhhminme) | [@kjsong99](https://github.com/kjsong99) | [@aristo0922](https://github.com/aristo0922) | [@kim1387](https://github.com/kim1387) |
