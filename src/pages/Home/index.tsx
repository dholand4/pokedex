import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Card, Pokemon, PokemonType } from '../../components/Card';
import pokeballHeader from '../../assets/img/pokeball.png'
import api from '../../service/api';

import * as S from './styles'
import { useNavigation } from '@react-navigation/native';

type Request= {
    id: number;
    types: PokemonType[]
}

export function Home() {

    const [pokemons, setPokemons] = useState<Pokemon[]>([])

    const {navigate} = useNavigation();

    function handleNavigation(pokemonId: number) {
        navigate('About', {

            pokemonId,
        }
        
        )
    }


    useEffect(() => {
        async function getAllPokemons() {
            const response = await api.get('/pokemon')
            const { results } = response.data;

            const payLoadPokemon = await Promise.all(
                results.map(async (pokemon: Pokemon) => {
                    const {id, types} = await getMoreInfo(pokemon.url)

                    return {
                        name: pokemon.name,
                        id,
                        types
                    }

                })
            )
                setPokemons(payLoadPokemon)
        }
        getAllPokemons()

    }, [])

    async function getMoreInfo(url: string): Promise<Request> {
        const response = await api.get(url)
        const {id, types} = response.data;

        return{
            id, types
        }
    }


    return(
    <S.Container>
        <FlatList 
        
        ListHeaderComponent={
            <>
            <S.Header source={pokeballHeader} />
            <S.Title> Pokédex</S.Title>
            </>

        }
        contentContainerStyle = {{
            paddingHorizontal: 20

        }}
        data={pokemons}
        keyExtractor={pokemon => pokemon.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({item: pokemon}) => (
                <Card 
                data={pokemon} 
                onPress={() => {
                    handleNavigation(pokemon.id)
                }} />
        
        )}
        />
        
    </S.Container>
    ) 
}