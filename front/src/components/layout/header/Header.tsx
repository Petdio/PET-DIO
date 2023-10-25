"use client";
import { AppBar, Grid, Toolbar, IconButton } from "@mui/material";
import Logo from "../../common/logo/Logo";
import { styled } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const StyledAppBar = styled(AppBar)`
  && {
    background-color: #fff;
    color: #757575;
    position: fixed;
    display: flex;
    justify-content: center;
    height: 72px;
    width: 100%;
    max-width: 480px;
  }
`;

export default function Header() {
  return (
    <StyledAppBar position="static" sx={{ zIndex: "modal" }} elevation={0}>
      <Toolbar sx={{ padding: "0 1rem 0 1rem" }}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={4} container justifyContent="flex-start">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="back"
              size="large"
            >
              <ArrowBackIcon sx={{ fontSize: "30px" }} />
            </IconButton>
          </Grid>
          <Grid item xs={4} container justifyContent="center">
            <Logo />
          </Grid>
          <Grid item xs={4} container justifyContent="flex-end">
            <IconButton
              edge="end"
              color="inherit"
              aria-label="user-info"
              size="large"
            >
              <AccountCircleIcon sx={{ fontSize: "30px" }} />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </StyledAppBar>
  );
}
