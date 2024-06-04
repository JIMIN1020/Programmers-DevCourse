export interface Order {
  items: number[];
  delivery: {
    address: string;
    receiver: string;
    contact: string;
  };
  book_title: string;
  total_count: number;
  total_price: number;
}

export interface OrderItem {
  bookId: string;
  img: string;
  title: string;
  author: string;
  price: number;
  count: number;
}
