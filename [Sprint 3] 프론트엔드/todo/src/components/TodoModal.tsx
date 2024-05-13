import React from "react";
import Modal from "react-bootstrap/Modal";
import { Todo } from "./TodoList";

interface Props {
  todo: Todo | null;
  show: boolean;
  onHide: () => void;
}

function TodoModal({ todo, show, onHide }: Props) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header>
        <Modal.Title>Todo 상세 정보</Modal.Title>
      </Modal.Header>
      <Modal.Body>{todo?.text}</Modal.Body>
    </Modal>
  );
}

export default TodoModal;
