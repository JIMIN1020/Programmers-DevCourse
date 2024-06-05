import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Title from "../components/common/Title";
import styled from "styled-components";
import { CartStyle } from "./Cart";
import CartSummary from "../components/cart/CartSummary";
import Button from "../components/common/Button";
import InputText from "../components/common/InputText";
import { useForm } from "react-hook-form";
import { Delivery, OrderType } from "../models/order.model";
import { order } from "../api/order.api";
import { useAlert } from "../hooks/useAlert";

interface DeliveryForm extends Delivery {
  addressDetail: string;
}

function Order() {
  const { showAlert, showConfirm } = useAlert();
  const navigate = useNavigate();
  const location = useLocation();
  const orderData = location.state;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DeliveryForm>();

  const handlePay = (data: DeliveryForm) => {
    const orderSheet: OrderType = {
      ...orderData,
      delivery: {
        receiver: data.receiver,
        contact: data.contact,
        address: `${data.address} ${data.addressDetail}`,
      },
    };

    console.log(orderSheet);

    showConfirm("주문을 진행하시겠습니까?", () => {
      order(orderSheet).then((res) => {
        showAlert("주문이 처리되었습니다.");
        navigate("/orderlist");
      });
    });
  };

  return (
    <>
      <Title size="lg">주문서 작성</Title>
      <CartStyle>
        <div className="content">
          <OrderInfo>
            <Title size="md" color="text">
              배송 정보
            </Title>
            <DeliveryFormStyle>
              <fieldset>
                <label>주소</label>
                <div className="input">
                  <InputText
                    inputType="text"
                    {...register("address", { required: true })}
                  />
                </div>
                <Button size="md" scheme="normal">
                  주소 찾기
                </Button>
              </fieldset>
              {errors.address && <p className="error">주소를 입력해주세요</p>}
              <fieldset>
                <label>상세 주소</label>
                <div className="input">
                  <InputText
                    inputType="text"
                    {...register("addressDetail", { required: true })}
                  />
                </div>
              </fieldset>
              {errors.addressDetail && (
                <p className="error">상세 주소를 입력해주세요</p>
              )}
              <fieldset>
                <label>수령인</label>
                <div className="input">
                  <InputText
                    inputType="text"
                    {...register("receiver", { required: true })}
                  />
                </div>
              </fieldset>
              {errors.receiver && (
                <p className="error">수령인을 입력해주세요</p>
              )}
              <fieldset>
                <label>전화번호</label>
                <div className="input">
                  <InputText
                    inputType="text"
                    {...register("contact", { required: true })}
                  />
                </div>
              </fieldset>
              {errors.contact && (
                <p className="error">전화번호를 입력해주세요</p>
              )}
            </DeliveryFormStyle>
          </OrderInfo>

          <OrderInfo>
            <Title size="md" color="text">
              주문 상품
            </Title>
            <strong>
              {orderData.book_title} 등 총 {orderData.total_count}권
            </strong>
          </OrderInfo>
        </div>
        <div className="summary">
          <CartSummary
            totalCount={orderData.total_count}
            totalPrice={orderData.total_price}
          />
          <Button size="lg" scheme="primary" onClick={handleSubmit(handlePay)}>
            결제하기
          </Button>
        </div>
      </CartStyle>
    </>
  );
}

export default Order;

const OrderInfo = styled.div`
  h1 {
    padding: 0 0 24px 0;
  }

  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  padding: 12px;
`;

const DeliveryFormStyle = styled.form`
  fieldset {
    border: 0;
    margin: 0;
    padding: 0 0 12px 0;
    display: flex;
    justify-content: start;
    gap: 8px;

    label {
      width: 80px;
    }
  }
  .input {
    flex: 1;
    input {
      width: 100%;
    }
  }
  .error {
    color: red;
    padding: 0 0 12px 0;
    text-align: right;
  }
`;
