import styled, { css } from "styled-components/native";

export const ContainerSearchPokemon = styled.View`
  justify-content: space-between;
  align-items: center;
`;

export const SearchPokemon = styled.TextInput`
  ${({ theme }) => css`
    font-size: 16px;
    font-weight: 400;    
  `}
  `;

export const ContainerSearch = styled.View`
width: 95%;
flex-direction: row;
padding: 20px 25px 20px 25px;
border-radius: 10px;
border-width: 1px;
justify-content: space-between;
align-items: center;
`;

