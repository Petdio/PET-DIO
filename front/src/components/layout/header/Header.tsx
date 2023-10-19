"use client";
import {
  AppBar,
  Grid,
  Toolbar,
  IconButton,
  Typography,
  useScrollTrigger,
} from "@mui/material";
import Logo from "../../common/logo/Logo";
import { styled } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Slide from "@mui/material/Slide";
import zIndex from "@mui/material/styles/zIndex";

function HideOnScroll({ children }: { children: React.ReactElement }) {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const StyledAppBar = styled(AppBar)`
  && {
    background-color: #fff;
    color: #757575;
    position: fixed;
  }
`;

export default function Header() {
  return (
    <HideOnScroll>
      <StyledAppBar position="static" sx={{ zIndex: "modal" }}>
        <Toolbar>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            margin={1}
          >
            <Grid item xs={4} container justifyContent="flex-start">
              <IconButton edge="start" color="inherit" aria-label="back">
                <ArrowBackIcon sx={{ fontSize: "14px", marginRight: "5px" }} />
                <Typography
                  fontSize={14}
                  fontWeight="regular"
                  flexGrow={1}
                  textAlign="center"
                >
                  이전으로
                </Typography>
              </IconButton>
            </Grid>
            <Grid item xs={4} container justifyContent="center">
              <Logo />
            </Grid>
            <Grid item xs={4} container justifyContent="flex-end">
              <IconButton edge="end" color="inherit" aria-label="user-info">
                <AccountCircleIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </StyledAppBar>
    </HideOnScroll>
  );
}
