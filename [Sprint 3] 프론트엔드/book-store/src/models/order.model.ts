export interface Order {
  created_at: string;
  delivery: {
    address: string;
    receiver: string;
    contact: string;
  };
  book_title: string;
  total_count: number;
  total_price: number;
}
