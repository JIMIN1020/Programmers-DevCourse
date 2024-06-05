import React from "react";
import Title from "../components/common/Title";
import styled from "styled-components";
import { useOrders } from "../hooks/useOrders";
import { formatDate, formatNumber } from "../utils/format";
import Button from "../components/common/Button";

function OrderList() {
  const { orders, selectOrder, selectedOrderId } = useOrders();

  console.log(orders);

  return (
    <>
      <Title size="lg">주문 내역</Title>
      <OrderListStyle>
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>주문일자</th>
              <th>주소</th>
              <th>수령인</th>
              <th>전화번호</th>
              <th>대표상품명</th>
              <th>수량</th>
              <th>금액</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <React.Fragment key={order.order_id}>
                <tr>
                  <td>{order.order_id}</td>
                  <td>{formatDate(order.created_at)}</td>
                  <td>{order.address}</td>
                  <td>{order.receiver}</td>
                  <td>{order.contact}</td>
                  <td>{order.book_title}</td>
                  <td>{order.total_count} 권</td>
                  <td>{order.total_price} 원</td>
                  <td>
                    <Button
                      size="sm"
                      scheme="normal"
                      onClick={() => selectOrder(order.order_id)}
                    >
                      자세히
                    </Button>
                  </td>
                </tr>
                {selectedOrderId === order.order_id && (
                  <tr>
                    <td></td>
                    <td colSpan={8}>
                      <ul className="detail">
                        {order.detail?.map((item) => (
                          <li key={item.book_id}>
                            <div>
                              <span>{item.book_id}</span>
                              <span>{item.author}</span>
                              <span>{formatNumber(+item.price)}원</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </OrderListStyle>
    </>
  );
}

export default OrderList;

const OrderListStyle = styled.div`
  padding: 24px 0 0 0;

  table {
    width: 100%;
    border-collapse: collapse;
    border-top: 1px solid ${({ theme }) => theme.color.border};
    border-bottom: 1px solid ${({ theme }) => theme.color.border};

    th,
    td {
      padding: 16px;
      border-bottom: 1px solid ${({ theme }) => theme.color.border};
      text-align: center;
    }

    .detail {
      li {
        list-style: square;
        text-align: start;

        div {
          display: flex;
          padding: 8px 12px;
          gap: 8px;
        }
      }
    }
  }
`;
