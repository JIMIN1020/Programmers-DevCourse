import { useEffect, useState } from "react";
import { BookDetail } from "../models/book.model";
import { cancelLikeBook, fetchBook, likeBook } from "../api/books.api";
import { useAuthStore } from "../store/authStore";
import { useAlert } from "./useAlert";
import { addCart } from "../api/cart.api";

export const useBook = (bookId: string | undefined) => {
  const [book, setBook] = useState<BookDetail | null>(null);
  const [cartAdded, setCartAdded] = useState<boolean>(false);
  const { isLoggedIn } = useAuthStore();
  const showAlert = useAlert();

  useEffect(() => {
    if (!bookId) return;

    fetchBook(bookId).then((book) => {
      setBook(book);
    });
  }, [bookId]);

  const likeToggle = () => {
    // 권한 확인 - 로그인 하였는지?
    if (!isLoggedIn) {
      showAlert("로그인이 필요합니다.");
      return;
    }

    // 도서 데이터가 없는 경우
    if (!book) return;

    // 분기 처리
    if (book.liked) {
      cancelLikeBook(book.id).then((res) => {
        if (res.isSuccess) {
          setBook({
            ...book,
            liked: false,
            likes: book.likes - 1,
          });
        }
      });
    } else {
      likeBook(book.id).then((res) => {
        if (res.isSuccess) {
          setBook({
            ...book,
            liked: true,
            likes: book.likes + 1,
          });
        }
      });
    }
  };

  const addToCart = async (count: number) => {
    // 도서 데이터가 없는 경우
    if (!book) return;

    if (!isLoggedIn) {
      showAlert("로그인이 필요합니다.");
      return;
    }

    await addCart({
      bookId: book.id,
      quantity: count,
    }).then(() => {
      setCartAdded(true);
      setTimeout(() => {
        setCartAdded(false);
      }, 3000);
    });
  };

  return { book, likeToggle, addToCart, cartAdded };
};
