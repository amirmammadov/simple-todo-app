import { memo, useState, useEffect } from "react";
import { Box } from "@mui/material";
import {
  ModalContainer,
  UserDetailDiv,
  UserDetailSpan,
} from "./TodosModal.styled";
import CloseIcon from "@mui/icons-material/Close";
import { useGetTodoQuery } from "../../store/api/apiSlice";

interface ModalProps {
  todoId: number | null;
}

const Modal = ({ todoId }: ModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  let { data: selectedTodo } = useGetTodoQuery(`todos/${todoId}`);

  useEffect(() => {
    setIsModalOpen(true);
  }, [selectedTodo]);

  const closeTodo = () => {
    setIsModalOpen(false);
  };

  return (
    <Box
      sx={{
        display: isModalOpen ? "flex" : "none",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 99,
      }}
    >
      <ModalContainer
        sx={{
          flexDirection: "column",
          gap: "10px",
          alignItems: "flex-start",
          padding: "20px",
          width: 600,
          height: 300,
          backgroundColor: "#fff",
          borderRadius: "20px",
        }}
      >
        <ModalContainer>
          <UserDetailDiv component="div">UserId</UserDetailDiv>
          <UserDetailSpan component="span">{`${selectedTodo?.userId}`}</UserDetailSpan>
        </ModalContainer>
        <ModalContainer>
          <UserDetailDiv component="div">TodoId</UserDetailDiv>
          <UserDetailSpan component="span">{`${selectedTodo?.id}`}</UserDetailSpan>
        </ModalContainer>
        <ModalContainer>
          <UserDetailDiv component="div">Title</UserDetailDiv>
          <UserDetailSpan component="span">{`${selectedTodo?.title}`}</UserDetailSpan>
        </ModalContainer>
        <ModalContainer>
          <UserDetailDiv component="div">Completed</UserDetailDiv>
          <UserDetailSpan component="span">{`${
            selectedTodo?.completed ? "true" : "false"
          }`}</UserDetailSpan>
        </ModalContainer>
      </ModalContainer>
      <CloseIcon
        sx={{
          position: "fixed",
          top: 10,
          right: 20,
          fontSize: 60,
          color: "#45e100",
          "&:hover": { cursor: "pointer", color: "#00d4ff" },
        }}
        onClick={closeTodo}
      />
    </Box>
  );
};

export default memo(Modal);
