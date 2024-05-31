import React from "react";
import Title from "../components/common/Title";
import InputText from "../components/common/InputText";
import Button from "../components/common/Button";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login } from "../api/auth.api";
import { useAlert } from "../hooks/useAlert";
import { Container, Error, Info } from "./Signup";
import { useAuthStore } from "../store/authStore";

export interface SignUpProps {
  email: string;
  password: string;
}

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpProps>();
  const navigate = useNavigate();
  const showAlert = useAlert();
  const { storeLogin } = useAuthStore();

  const onSubmit = (data: SignUpProps) => {
    login(data).then(
      (res) => {
        storeLogin(res.token);
        showAlert("로그인이 완료되었습니다.");
        navigate("/");
      },
      (err) => {
        showAlert("로그인에 실패하였습니다.");
      }
    );
  };

  return (
    <>
      <Title size="lg">로그인</Title>
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

export default Login;
