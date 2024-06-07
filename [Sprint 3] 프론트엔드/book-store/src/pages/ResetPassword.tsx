import React from "react";
import Title from "../components/common/Title";
import InputText from "../components/common/InputText";
import Button from "../components/common/Button";
import { useForm } from "react-hook-form";
import { Container, Error } from "./Signup";
import { useAuth } from "@/hooks/useAuth";

export interface ResetPasswordProps {
  email: string;
  password: string;
}

function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordProps>();
  const { resetRequested, userResetPassword, userResetRequest } = useAuth();

  const onSubmit = (data: ResetPasswordProps) => {
    resetRequested ? userResetPassword(data) : userResetRequest(data);
  };

  return (
    <>
      <Title size="lg">비밀번호 초기화</Title>
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
          {resetRequested && (
            <fieldset>
              <InputText
                {...register("password", { required: true })}
                placeholder="비밀번호"
                inputType="password"
              />
              {errors.password && <Error>비밀번호를 입력해주세요</Error>}
            </fieldset>
          )}

          <fieldset>
            <Button type="submit" size="md" scheme="primary">
              {resetRequested ? "비밀번호 초기화" : "초기화 요청"}
            </Button>
          </fieldset>
        </form>
      </Container>
    </>
  );
}

export default ResetPassword;
