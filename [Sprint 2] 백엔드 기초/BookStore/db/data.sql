
INSERT INTO book (title, form, isbn, summary, detail, author, pages, contents, price, published_date)
VALUES ("어린왕자들", "종이책", 0, "어리다..", "많이 어리다..", "김어림", 100, "목차입니다.", 20000, "2019-01-01");

INSERT INTO book (title, form, isbn, summary, detail, author, pages, contents, price, published_date)
VALUES ("신데렐라들", "종이책", 1, "유리구두..", "투명한 유리구두..", "김구두", 100, "목차입니다.", 20000, "2023-12-01");

INSERT INTO book (title, form, isbn, summary, detail, author, pages, contents, price, published_date)
VALUES ("백설공주들", "종이책", 2, "사과..", "빨간 사과..", "김사과", 100, "목차입니다.", 20000, "2023-11-01");

INSERT INTO book (title, form, isbn, summary, detail, author, pages, contents, price, published_date)
VALUES ("흥부와 놀부들", "종이책", 3, "제비..", "까만 제비..", "김제비", 100, "목차입니다.", 20000, "2023-12-08");

INSERT INTO book (title, img, category_id, form, isbn, summary, detail, author, pages, contents, price, published_date)
VALUES ("콩쥐 팥쥐", 4, 1, "ebook", 4, "콩팥..", "콩심은데 콩나고..", "김콩팥", 100, "목차입니다.", 20000, "2023-12-07");

INSERT INTO book (title, img, category_id, form, isbn, summary, detail, author, pages, contents, price, published_date)
VALUES ("용궁에 간 토끼", 5, 1, "종이책", 5, "깡충..", "용왕님 하이..", "김거북", 100, "목차입니다.", 20000, "2024-04-01");

INSERT INTO book (title, img, category_id, form, isbn, summary, detail, author, pages, contents, price, published_date)
VALUES ("해님달님", 15, 2, "ebook", 6, "동앗줄..", "황금 동앗줄..!", "김해님", 100, "목차입니다.", 20000, "2023-07-16");

INSERT INTO book (title, img, category_id, form, isbn, summary, detail, author, pages, contents, price, published_date)
VALUES ("장화홍련전", 80, 2, "ebook", 7, "기억이 안나요..", "장화와 홍련이?..", "김장화", 100, "목차입니다.", 20000, "2023-03-01");

INSERT INTO book (title, img, category_id, form, isbn, summary, detail, author, pages, contents, price, published_date)
VALUES ("견우와 직녀", 8, 1, "ebook", 8, "오작교!!", "칠월 칠석!!", "김다리", 100, "목차입니다.", 20000, "2024-02-01");

INSERT INTO book (title, img, category_id, form, isbn, summary, detail, author, pages, contents, price, published_date)
VALUES ("효녀 심청", 12, 1, "종이책", 9, "심청아..", "공양미 삼백석..", "김심청", 100, "목차입니다.", 20000, "2024-03-25");

INSERT INTO book (title, img, category_id, form, isbn, summary, detail, author, pages, contents, price, published_date)
VALUES ("혹부리 영감", 22, 2, "ebook", 10, "노래 주머니..", "혹 두개 되버림..", "김영감", 100, "목차입니다.", 20000, "2024-04-05");

// category와 조인
SELECT * FROM book LEFT JOIN category ON book.category_id = category.id;

// 특정 도서 데이터를 category name과 함께 가져오기
SELECT * FROM book LEFT JOIN category ON book.category_id = category.id WHERE book.id = ?;

// 신간 조회
SELECT * FROM book WHERE published_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW();

// 좋아요
INSERT INTO likes (userId, liked_bookId) VALUES (1, 1);
INSERT INTO likes (userId, liked_bookId) VALUES (11, 2);
INSERT INTO likes (userId, liked_bookId) VALUES (16, 3);
INSERT INTO likes (userId, liked_bookId) VALUES (16, 1);
INSERT INTO likes (userId, liked_bookId) VALUES (1, 4);
INSERT INTO likes (userId, liked_bookId) VALUES (11, 1);
INSERT INTO likes (userId, liked_bookId) VALUES (18, 2);
INSERT INTO likes (userId, liked_bookId) VALUES (18, 3);
INSERT INTO likes (userId, liked_bookId) VALUES (19, 5);

// 좋아요 수 세기
SELECT COUNT(*) AS likes FROM likes WHERE liked_bookId = ?;

// book 데이터를 '좋아요 수' 컬럼과 함께
SELECT *, (SELECT COUNT(*) FROM likes WHERE liked_bookId = book.id) AS likes FROM book;

// 도서 상세 조회 시 사용자의 좋아요 여부 & 개수
SELECT *,
  (SELECT EXISTS (SELECT * FROM likes WHERE userId = ? AND liked_bookId = book.id)) AS liked,
  (SELECT COUNT(*) FROM likes WHERE liked_bookId = book.id) AS likes
  FROM book WHERE book.id = ?;


// 장바구니 담기
INSERT INTO cartItems (bookId, quantity, userId) VALUES (1, 1, 1);

// 4월 17일 과제 - 류지민

// 배송 정보 입력
INSERT INTO delivery (address, receiver, contact) VALUES ("서울시 중구", "kim", "010-1234-1234");

// 주문 정보 입력
const delivery_id = SELECT MAX(id) FROM delivery;
INSERT INTO orders (book_title, total_count, total_price, user_id, delivery_id) VALUES ("어린왕자들", 3, 60000, 1, delivery_id);

// 주문 상세 목록 입력
const order_id = SELECT MAX(id) FROM orders;
INSERT INTO orderItems (order_id, book_id, quantity)
VALUES (order_id, 1, 1);
INSERT INTO orderItems (order_id, book_id, quantity)
VALUES (order_id, 3, 2);

// 방금 INSERT한 데이터의 PK값 가져오기
SELECT MAX(id) FROM orderItems;
SELECT LAST_INSERT_ID();

// 결제된 도서 장바구니 삭제
DELETE FROM cartItems WHERE id IN (1,2,3); 