import React from "react";
import styled from "styled-components";
import Title from "../components/common/Title";
import InputText from "../components/common/InputText";
import Button from "../components/common/Button";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";

export interface SignUpProps {
  email: string;
  password: string;
}

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpProps>();
  const { userSignUp } = useAuth();

  const onSubmit = (data: SignUpProps) => {
    userSignUp(data);
  };

  return (
    <>
      <Title size="lg">회원가입</Title>
      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <InputText
              {...register("email", { required: true })}
              placeholder="이메일"
              inputType="email"
            />
            {errors.email && <Error>이메일을 입력해주세요</Error>}
          </fieldset>
          <fieldset>
            <InputText
              {...register("password", { required: true })}
              placeholder="비밀번호"
              inputType="password"
            />
            {errors.password && <Error>비밀번호를 입력해주세요</Error>}
          </fieldset>
          <fieldset>
            <Button type="submit" size="md" scheme="primary">
              회원가입
            </Button>
          </fieldset>
          <Info>
            <Link to="/reset">비밀번호 초기화</Link>
          </Info>
        </form>
      </Container>
    </>
  );
}

export default Signup;

export const Container = styled.div`
  max-width: ${({ theme }) => theme.layout.width.sm};
  margin: 80px auto;

  fieldset {
    border: 0;
    padding: 0 0 8px 0;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  input {
    width: 100%;
  }

  button {
    width: 100%;
  }
`;

export const Info = styled.div`
  text-align: center;
  padding: 16px 0 0 0;
`;

export const Error = styled.p`
  color: red;
  font-size: 12px;
`;
