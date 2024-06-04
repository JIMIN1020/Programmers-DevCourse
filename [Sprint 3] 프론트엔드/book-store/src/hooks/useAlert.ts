import { useCallback } from "react";

export const useAlert = () => {
  const showAlert = useCallback((msg: string) => {
    window.alert(msg);
  }, []);

  const showConfirm = useCallback((msg: string, onConfirm: () => void) => {
    if (window.confirm(msg)) {
      onConfirm();
    }
  }, []);

  return { showAlert, showConfirm };
};
