/* eslint-disable react/prop-types */
import styled from "styled-components";
import { ToastContainer, Flip } from "react-toastify";
import React from "react";

const StyledToastContainer = styled(ToastContainer)`
  .Toastify__toast {
    font-family: "Poppins", serif;
    font-size: 14px;
    font-weight: bold;
    color: #5a5a5a;
  }
`;

export default function StyledToast({ position, hideProgressBar }) {
  return (
    <StyledToastContainer
      position={position}
      hideProgressBar={hideProgressBar}
      autoClose={3000}
      transition={Flip}
      zIndex={9999}
    />
  );
}
