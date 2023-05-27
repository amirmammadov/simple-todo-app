import { styled } from "@mui/system";
import { Box } from "@mui/material";

export const TodosContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100vh",
  background: "rgb(100,255,51)",
  backgroundImage:
    "linear-gradient(90deg, rgba(100,255,51,1) 0%, rgba(0,212,255,1) 100%)",
});
