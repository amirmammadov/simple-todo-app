import { memo, useState } from "react";
import { Box, List, ListItem } from "@mui/material";
import { MyButton } from "./Todos.styled";
import { TodosContainer } from "../../components/TodosContainer";
import TodosModal from "../TodosModal/TodosModal";
import { Todo } from "../../types/Interfaces";
import { useGetTodosQuery } from "../../store/api/apiSlice";

interface TodosProp {
  todos: Todo[];
}

const Todos = () => {
  const { data: todos, isFetching, isError } = useGetTodosQuery("todos");

  const [todoId, setTodoId] = useState(-1);

  const openTodo = (id: number) => {
    setTodoId(id);
  };

  if (isFetching) {
    return (
      <TodosContainer
        sx={{
          color: "#fff",
          fontSize: 65,
        }}
      >
        Loading...
      </TodosContainer>
    );
  }

  if (isError) {
    return <Box sx={{ fontSize: 30 }}>404 Not Found</Box>;
  }

  return (
    <TodosContainer
      sx={{
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <Box component="h2" sx={{ fontSize: "40px", color: "#fff" }}>
        Todos List
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "50%",
          height: "70%",
          backgroundColor: "#fff",
          borderRadius: "20px",
        }}
      >
        <List
          sx={{
            width: "100%",
            height: "100%",
            padding: "5px",
            overflowY: "scroll",
            borderRadius: "20px",
          }}
        >
          {todos?.map((todo: Todo, index: number) => (
            <ListItem
              sx={{
                borderBottomSize: "0.01px",
                borderBottomStyle: "solid",
                borderBottomColor: "#00d4ff",
                marginBottom: "5px",
                backgroundColor: "none",
                padding: 0,
              }}
              key={todo.id}
            >
              <MyButton variant="text" onClick={() => openTodo(todo.id)}>{`${
                index + 1
              }. ${todo.title}`}</MyButton>
            </ListItem>
          ))}
        </List>
      </Box>
      {todoId !== -1 && <TodosModal todoId={todoId}></TodosModal>}
    </TodosContainer>
  );
};

export default memo(Todos);
