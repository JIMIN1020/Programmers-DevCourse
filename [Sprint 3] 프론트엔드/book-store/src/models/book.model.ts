export interface Book {
  id: number;
  img: number;
  title: string;
  author: string;
  summary: string;
  price: number;
  likes: number;
  publish_date: string;
  category_name: string;
}

export interface BookDetail extends Book {
  category: string;
  format: string;
  ISBN: string;
  pages: number;
  description: string;
  index: string;
  liked: string;
}
