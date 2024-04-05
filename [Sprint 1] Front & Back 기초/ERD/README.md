# ERD 설계 프로젝트

### 📍 프로젝트 개요

#### ✔️ 목표

- 데이터베이스 관계 다이어그램(ERD)를 생성하고, 이를 바탕으로 데이터베이스를 직접 설계하여 간단한 쿼리를 작성합니다.

#### ✔️ 분석 및 모델링

- 간단한 웹 서비스의 데이터 요구 사항을 분석하고, 이를 기반으로 **ERD**를 작성합니다.
- 연관이 있는 테이블은 실선으로 이어줍니다. (**옵션**:화살표)

#### ✔️ 구현 및 배포

- **ERD**를 바탕으로 직접 데이터베이스 테이블(**스키마**)**을 설계하고**,
- **DDL**을 사용하여 데이터베이스에 구현합니다.
- 각 테이블에 데이터를 입력, 수정\*, 조회할 수 있는 **SQL**문 작성합니다.

#### ✔️ 프로젝트 요구사항

- 모든 공연은 회원 **1**명당 구매 수량 제한은 **100**장입니다.
- 각 공연의 회차는 **1**회입니다.
- 모든 공연의 좌석 예매는 할 수 없습니다.
- 데이터베이스 다이어그램을 그릴 수 있는 **ERD** 툴 사용은 선택입니다.

<br/>

## 📍 ERD 설계

<img width="1189" alt="스크린샷 2024-03-11 오후 5 48 46" src="https://github.com/JIMIN1020/Programmers-DevCourse/assets/121474189/f0b18e1e-2d58-46dd-90b8-6b8fe84ef375">

크게 공연을 나타내는 `concert`, 회원을 나타내는 `user`, 예매내역을 나타내는 `orderDetail` 로 구분하였고,

`orderDetail` 은 예매한 회원의 id인 **‘user_id’**와 예매한 공연의 id인 **‘concert_id’**를 포함하고 있습니다.

공연 하나에는 여러 회원의 예매내역이 있을 수 있으므로 **1:N** 형태로 연결되어 있고,

마찬가지로 회원 한 명이 여러 예매내역을 가질 수 있으므로 **1:N** 형태로 연결되어 있습니다.

<br/>

## 📍 ’concert’ 테이블

### ✔️ 속성

- **id**: 공연 id
- **name**: 공연명
- **price**: 공연 가격
- **date**: 공연 날짜
- **image_path**: 공연 포스터 이미지 경로
- **description**: 공연 설명

### ✔️ 테이블 생성

<img width="486" alt="스크린샷 2024-03-11 오후 5 40 50" src="https://github.com/JIMIN1020/Programmers-DevCourse/assets/121474189/826d65bf-7ec0-4e85-97fe-fd3f53c6ce1c">

### ✔️ 데이터 추가/조회

<img width="812" alt="스크린샷 2024-03-11 오후 5 55 14" src="https://github.com/JIMIN1020/Programmers-DevCourse/assets/121474189/72624dbc-ae6a-4f40-b37e-7085f8f9eb8a">

<br/>

## 📍 ’user’ 테이블

### ✔️ 속성

- **id**: 회원 id
- **name**: 회원명
- **phone**: 회원 연락처
- **email**: 회원 메일
- **password**: 비밀번호

### ✔️ 테이블 생성

<img width="496" alt="스크린샷 2024-03-11 오후 5 41 54" src="https://github.com/JIMIN1020/Programmers-DevCourse/assets/121474189/de9ddc73-44c6-4b42-8310-c869a9931ac9">

### ✔️ 데이터 추가/조회

<img width="798" alt="스크린샷 2024-03-11 오후 6 03 58" src="https://github.com/JIMIN1020/Programmers-DevCourse/assets/121474189/cdbd4171-da54-4443-8bbd-7e0e04b164f2">

<br/>

## 📍 ’orderDetail’ 테이블

### ✔️ 속성

- **id**: 예매 id
- **user_id**: 회원 id → [user 개체의 ‘id’]
- **concer_id**: 공연 id → [concert 개체의 ‘id]
- **order_date**: 예매일자
- **quantity**: 예매수량
- **total_price**: 총 가격

### ✔️ 테이블 생성

<img width="490" alt="스크린샷 2024-03-11 오후 5 47 55" src="https://github.com/JIMIN1020/Programmers-DevCourse/assets/121474189/76655869-6c81-47fd-93ec-d768be1ff603">

### ✔️ 데이터 추가/조회

<img width="749" alt="스크린샷 2024-03-11 오후 6 05 41" src="https://github.com/JIMIN1020/Programmers-DevCourse/assets/121474189/5ba752d5-7329-42b2-b868-9574cf5a3542">
