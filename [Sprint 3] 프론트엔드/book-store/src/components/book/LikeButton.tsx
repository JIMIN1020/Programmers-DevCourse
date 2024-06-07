import { BookDetail } from "@/models/book.model";
import Button from "../common/Button";
import { FaHeart } from "react-icons/fa";

interface Props {
  book: BookDetail;
  onClick: () => void;
}

function LikeButton({ book, onClick }: Props) {
  return (
    <Button size="md" scheme={book.liked ? "like" : "normal"} onClick={onClick}>
      <FaHeart fill={book.liked ? "white" : "black"} />
      {book.likes}
    </Button>
  );
}

export default LikeButton;
