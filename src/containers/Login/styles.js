import styled from "styled-components";

export const Form = styled.form`
  height: 100%;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.p`
  font-size: 30px;
  font-weight: bold;
  margin: 0px 0px 20px 0px;
  color: ${({ theme }) => theme.primary};
`;

export const Card = styled.div`
  border-radius: 20px;
  border: ${({ theme }) => `3px solid ${theme.primary}`};
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 40px;
  width: 300px;
`;

export const LoginButton = styled.button`
  background-color: ${({ theme }) => theme.secondary};
  padding: 10px 20px;
  border-radius: 20px;
  color: ${({ theme }) => theme.text};
  margin-top: 20px;
  cursor: pointer;
`;
