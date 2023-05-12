import styled from "styled-components";

export const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  flex-direction: column;
`;

export const PetsCard = styled.div`
  padding: 10px;
  border: ${({ theme }) => `1px solid ${theme.primary}`};
  width: calc(33.3% - 35px);
  border-radius: 20px;
`;

export const FilterRow = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  justify-content: center;
`;

export const PetsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: start;
`;

export const SearchButton = styled.button`
  background-color: ${({ theme }) => theme.secondary};
  padding: 10px 20px;
  border-radius: 20px;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
`;

export const ResetButton = styled.button`
  background-color: ${({ theme }) => theme.gray};
  padding: 10px 20px;
  border-radius: 20px;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
`;
