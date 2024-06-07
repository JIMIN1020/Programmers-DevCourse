import { useAuthStore } from "@/store/authStore";
import { SignUpProps } from "../pages/Login";
import { login, resetPassword, resetRequest, signup } from "@/api/auth.api";
import { useNavigate } from "react-router-dom";
import { useAlert } from "./useAlert";
import { useState } from "react";

export const useAuth = () => {
  const { storeLogin, storeLogout, isLoggedIn } = useAuthStore();
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const [resetRequested, setResetRequested] = useState<boolean>(false);

  const userLogin = (data: SignUpProps) => {
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

  const userSignUp = (data: SignUpProps) => {
    signup(data).then((res) => {
      // 성공
      showAlert("회원가입이 완료되었습니다.");
      navigate("/login");
    });
  };

  const userResetPassword = (data: SignUpProps) => {
    resetPassword(data).then(() => {
      showAlert("비밀번호가 초기화되었습니다.");
      navigate("/login");
    });
  };

  const userResetRequest = (data: SignUpProps) => {
    resetRequest(data).then(() => {
      setResetRequested(true);
    });
  };

  return {
    userLogin,
    userSignUp,
    userResetPassword,
    userResetRequest,
    resetRequested,
  };
};
