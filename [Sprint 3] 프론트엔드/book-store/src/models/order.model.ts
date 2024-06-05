export interface Delivery {
  address: string;
  receiver: string;
  contact: string;
}

export interface OrderType {
  items: number[];
  delivery: Delivery;
  book_title: string;
  total_count: number;
  total_price: number;
}

export interface Order {
  created_at: string;
  order_id: number;
  items: number[];
  address: string;
  receiver: string;
  contact: string;
  book_title: string;
  total_count: number;
  total_price: number;
}

export interface OrderItem {
  book_id: number;
  title: string;
  author: string;
  price: string;
  quantity: string;
}

export interface OrderListItem extends Order {
  detail?: OrderItem[];
}
