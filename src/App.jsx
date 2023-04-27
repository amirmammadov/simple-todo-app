import { useEffect } from "react";
import { styled } from "@mui/system";
import { Box, Button, List, ListItem } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getTodos, selectTodo, getError } from "./features/todosSlice";

const Container = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const UserDetailDiv = styled(Box)({
  minWidth: "70px",
  backgroundColor: "#45e100",
  padding: "5px 10px",
  borderRadius: "10px",
  fontSize: "20px",
  color: "#fff",
  letterSpacing: "0.2px",
});

const UserDetailSpan = styled(Box)({
  marginLeft: "10px",
  fontSize: "20px",
});

function App() {
  const { todos, selectedTodo, errorCase } = useSelector(
    (state) => state.todos
  );
  const dispatch = useDispatch();

  useEffect(() => {
    axios({
      method: "get",
      url: "https://jsonplaceholder.typicode.com/todos",
    })
      .then((res) => {
        dispatch(getTodos(res.data));
      })
      .catch((err) => {
        dispatch(getError(err.message));
      });
  }, [dispatch]);

  const openTodo = (id) => {
    const activeTodo = todos.filter((todo) => {
      return todo.id === id;
    });
    dispatch(selectTodo(activeTodo[0]));
  };

  if (errorCase) {
    return <Box sx={{ fontSize: 30 }}>{errorCase}</Box>;
  }

  if (todos.length == 0) {
    return (
      <Container
        sx={{
          width: "100%",
          height: "100vh",
          background: "rgb(100,255,51)",
          backgroundImage:
            "linear-gradient(90deg, rgba(100,255,51,1) 0%, rgba(0,212,255,1) 100%)",
          color: "#fff",
          fontSize: 65,
        }}
      >
        Loading...
      </Container>
    );
  }

  return (
    <Container
      sx={{
        width: "100%",
        height: "100vh",
        flexDirection: "column",
        gap: "10px",
        background: "rgb(100,255,51)",
        backgroundImage:
          "linear-gradient(90deg, rgba(100,255,51,1) 0%, rgba(0,212,255,1) 100%)",
      }}
    >
      <Box component="h2" sx={{ fontSize: "40px", color: "#fff" }}>
        Todos List
      </Box>
      <Container
        sx={{
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
          {todos.map((todo, index) => (
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
              <Button
                variant="text"
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  border: "none",
                  outline: "none",
                  background: "none",
                  width: "100%",
                  height: "100%",
                  padding: "10px",
                  color: "#000",
                  textTransform: "capitalize",
                  fontSize: "18px",
                  "&:hover": {
                    cursor: "pointer",
                    color: "#45e100",
                    backgroundColor: "#fff",
                    transition: "color 0.1s ease-in",
                  },
                }}
                onClick={() => openTodo(todo.id)}
              >{`${index + 1}. ${todo.title}`}</Button>
            </ListItem>
          ))}
        </List>
      </Container>
      <Box
        sx={{
          display: selectedTodo ? "flex" : "none",
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
        <Container
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
          <Container>
            <UserDetailDiv component="div">UserId</UserDetailDiv>
            <UserDetailSpan component="span">{`${selectedTodo?.userId}`}</UserDetailSpan>
          </Container>
          <Container>
            <UserDetailDiv component="div">TodoId</UserDetailDiv>
            <UserDetailSpan component="span">{`${selectedTodo?.id}`}</UserDetailSpan>
          </Container>
          <Container>
            <UserDetailDiv component="div">Title</UserDetailDiv>
            <UserDetailSpan component="span">{`${selectedTodo?.title}`}</UserDetailSpan>
          </Container>
          <Container>
            <UserDetailDiv component="div">Completed</UserDetailDiv>
            <UserDetailSpan component="span">{`${
              selectedTodo?.completed ? "true" : "false"
            }`}</UserDetailSpan>
          </Container>
        </Container>
        <CloseIcon
          sx={{
            position: "fixed",
            top: 10,
            right: 20,
            fontSize: 60,
            color: "#45e100",
            "&:hover": { cursor: "pointer", color: "#00d4ff" },
          }}
          onClick={() => {
            dispatch(selectTodo(null));
          }}
        />
      </Box>
    </Container>
  );
}

export default App;
