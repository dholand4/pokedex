import { Dimensions } from 'react-native';
import styled, { css } from 'styled-components/native';

const windowWidth = Dimensions.get('window').width;

export const LoadingScreen = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.View`
  ${({ theme }) => css`
    background: ${theme.colors.background};
    flex: 1;

    position: relative;
  `}
`;

export const Header = styled.ImageBackground`
  ${({ theme }) => css`
    width: ${windowWidth}px;
    margin-left: -20px;
    height: 220px;
    background: ${theme.colors.background};
  `}
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.text};
    font-size: 32px;
    line-height: 38px;
    font-weight: bold;
    margin-top: -70px;
    margin-bottom: 16px;
    margin-left: 12px;
  `}
`;

export const ContainerSearchPokemon = styled.View`
  align-items: center;
`;

export const SearchPokemon = styled.TextInput`
    font-size: 16px;
    font-weight: 400;    
  `;

export const ContainerSearch = styled.View`
width: 95%;
flex-direction: row;
padding: 20px 25px 20px 25px;
border-radius: 10px;
border-width: 0.5px;
justify-content: space-between;
align-items: center;
`;


