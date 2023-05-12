import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import { Container, Wrapper, NavigateLink, IconImg } from "./styles";
import Icon from "../../media/cat-animal-icon.png";

export default function Layout() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const { token } = user || {};

  return (
    <Wrapper>
      <Container>
        <IconImg src={Icon}></IconImg>
        <NavigateLink to="/">Home</NavigateLink>
        {!token && <NavigateLink to="/login">Login</NavigateLink>}
        {!token && <NavigateLink to="/register">Register</NavigateLink>}
      </Container>
      <Outlet />
    </Wrapper>
  );
}
