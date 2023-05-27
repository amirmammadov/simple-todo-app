import { styled } from "@mui/system";
import { Box } from "@mui/material";
export const ModalContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const UserDetailDiv = styled(Box)({
  minWidth: "70px",
  backgroundColor: "#45e100",
  padding: "5px 10px",
  borderRadius: "10px",
  fontSize: "20px",
  color: "#fff",
  letterSpacing: "0.2px",
});

export const UserDetailSpan = styled(Box)({
  marginLeft: "10px",
  fontSize: "20px",
});
