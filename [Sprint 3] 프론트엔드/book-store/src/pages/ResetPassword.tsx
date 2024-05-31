import React, { useState } from "react";
import Title from "../components/common/Title";
import InputText from "../components/common/InputText";
import Button from "../components/common/Button";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { resetPassword, resetRequest, signup } from "../api/auth.api";
import { useAlert } from "../hooks/useAlert";
import { Container, Error } from "./Signup";

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
  const navigate = useNavigate();
  const showAlert = useAlert();
  const [resetRequested, setResetRequested] = useState<boolean>(false);

  const onSubmit = (data: ResetPasswordProps) => {
    if (resetRequested) {
      resetPassword(data).then(() => {
        showAlert("비밀번호가 초기화되었습니다.");
        navigate("/login");
      });
    } else {
      resetRequest(data).then(() => {
        setResetRequested(true);
      });
    }
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
