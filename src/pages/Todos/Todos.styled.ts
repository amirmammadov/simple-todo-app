import { styled } from "@mui/system";
import { Button } from "@mui/material";

export const MyButton = styled(Button)({
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
});
