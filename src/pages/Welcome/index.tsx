import React from 'react';
import * as S from './styles'
import AnimatedLottieView from 'lottie-react-native';
import pokemonAnimated from './assets/pokemon.json';
import { Button } from '../../components/Button';

export function Welcome(){
    return <S.Container>
    <S.Content>
        <S.WrapperAnimation>
            <S.WrapperImage>
            <AnimatedLottieView style={{width: 200}} autoPlay source={pokemonAnimated} loop />
            </S.WrapperImage>

        
        </S.WrapperAnimation>
        <S.Title>Bem Vindo</S.Title>
        <S.SubTitle>Encontre todos os pokémons em um só lugar!</S.SubTitle>
    </S.Content>
    <S.Footer>
        <Button title='Iniciar'></Button>

    </S.Footer>

    </S.Container>
    
}