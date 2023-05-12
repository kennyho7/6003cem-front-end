import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Container = styled.div`
  background-color: ${({ theme }) => theme.primary};
  width: 100%;
  padding: 10px 20px;
  display: flex;
  gap: 20px;
  align-items: center;
`;

export const Wrapper = styled.div`
  height: 100%;
`;

export const NavigateLink = styled(NavLink)`
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  transition: 300ms ease-in-out all;

  &:hover {
    opacity: 0.6;
  }
`;

export const IconImg = styled.img`
  height: 40px;
  width: auto;
  object-fit: contain;
  margin-right: 20px;
`;
