export interface Book {
  id: number;
  img: number;
  title: string;
  author: string;
  summary: string;
  price: number;
  likes: number;
  published_date: string;
  category_name: string;
}

export interface BookDetail extends Book {
  category_id: string;
  format: string;
  isbn: string;
  pages: number;
  detail: string;
  contents: string;
  liked: boolean;
}
