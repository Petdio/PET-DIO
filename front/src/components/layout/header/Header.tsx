"use client";
import { AppBar } from "@mui/material";
import Logo from "../../common/logo/Logo";
import { styled } from "@mui/material/styles";
import MyPage from "@/components/common/my-page/MyPage";
import BackButton from "@/components/common/back-button/BackButton";

const StyledAppBar = styled(AppBar)`
  && {
    background-color: #fff;
    color: #757575;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 72px;
    width: 100%;
    max-width: 480px;
  }
`;

export default function Header() {
  return (
    <>
      <StyledAppBar position="static" sx={{ zIndex: 1000 }} elevation={0}>
        <Logo />
        <MyPage />
      </StyledAppBar>
      <BackButton />
    </>
  );
}
