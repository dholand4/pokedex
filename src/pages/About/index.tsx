import React, { useEffect, useState } from 'react';
import {useRoute, useNavigation, } from '@react-navigation/native';
import {Alert, ScrollView, Text} from 'react-native';
import api from '../../service/api';
import { useTheme } from 'styled-components/native';
import {Feather} from '@expo/vector-icons';

import circle from '../../assets/img/circle.png';
import dots from '../../assets/img/dots.png';

import * as S from './styles';
import { FadeAnimation } from '../../components/FadeAnimation';
import { Load } from '../../components/Load';

type RouteParams = {
    pokemonId: number;

}

type Stats = {
    base_stat: 62,
    stat: {
        name: string;
    }
}

type Ability = {
    ability: {
        name: string;
    }
}

export type TypeName =         
|'grass'
|'fire'
|'water'
|'poison'
|'normal'
|'bug'
|'flying'
|'electric'
|'ground'
|'fighting'
|'rock'
|'psychic'
|'ghost'
|'ice'
|'dragon'



type PokemonType = {
    type: {
        name: TypeName;

    }
}


type PokemonProps = {
    id: number;
    name: string;
    stats: Stats[]
    abilities: Ability[]
    color: string;
    types: PokemonType[]

}

export function About() {
    const route = useRoute();
    const { goBack } = useNavigation();
    const {pokemonId} = route.params as RouteParams;
    const {colors} = useTheme();

    const [pokemon, setPokemon] = useState({} as PokemonProps);
    const [load, setLoad] = useState(true);


    useEffect(() => {
        async function getPokemonDetail() {
            try{
                const response = await api.get(`/pokemon/${pokemonId}`)
                const {stats, abilities, id, name, types} = response.data;
                
                const currentType = types[0].type.name as TypeName;
                const color = colors.backgroundCard[currentType];
                
                setPokemon({
                    stats, abilities, id, name, types, color

                })


            } catch(error){
                Alert.alert('ops, ocorreu algum erro!')
            } finally {
                setLoad(false)
            }
        }

        getPokemonDetail()

    }, [])

    function handleGoBack() {
        goBack();
    }


    return <>
    {load ? <> 
        <S.LoadingScreen>
      <Load />
    </S.LoadingScreen>
        </> : <ScrollView style={{flex: 1, backgroundColor: '#FFF'}}>
        <S.Header type={pokemon.types[0].type.name} >
            <S.BackButton onPress={handleGoBack}>
                <Feather name="chevron-left" size={24} color="#FFF" />
            </S.BackButton>


        <S.ContentImage>
            <S.CircleImage source={circle} />
            <FadeAnimation>
            <S.PokemonImage source={{
              uri: 
              `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`
            }} />
             </FadeAnimation>
        </S.ContentImage>
           
            <S.Content>
                <S.PokemonId>#{pokemon.id}</S.PokemonId>
                <S.PokemonName>{pokemon.name}</S.PokemonName>

                <S.PokemonTypeContainer>
                    {pokemon.types.map(({type}) => 
                    <S.PokemonType type ={type.name} key={type.name}>
                        <S.PokemonTypeText>{type.name}</S.PokemonTypeText>
                    </S.PokemonType> 
                )}
                </S.PokemonTypeContainer>
            </S.Content>
                <S.DotsImage source={dots} />
        </S.Header>        

        <S.Container>
            <S.Title type={pokemon.types[0].type.name}>Base States</S.Title>

            {pokemon.stats.map(attribute => 
                <S.StatusBar key={attribute.stat.name}>
                    <S.Attributes>{attribute.stat.name}</S.Attributes>
                    <S.AttributesValue>{attribute.base_stat}</S.AttributesValue>
                    <S.ContentBar>
                        <S.ProgressBar 
                        type={pokemon.types[0].type.name}
                        borderWidth={0}
                        progress={100}
                        width={attribute.base_stat}
                        color={pokemon.color}
                        />
                    </S.ContentBar>
                </S.StatusBar>
            )
            }
            <S.Title type={pokemon.types[0].type.name}>Abilities</S.Title>
            {pokemon.abilities.map(currentAbility =>  <S.Ability>
                {currentAbility.ability.name}
            </S.Ability>
                
                )}

        </S.Container>
    </ScrollView>
}
    </>

}
