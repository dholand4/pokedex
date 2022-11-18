import React, { useState, useEffect } from 'react';
import { Alert, FlatList} from 'react-native';

import { Card } from '../../components/Card';
import { Load } from '../../components/Load';

import pokeballImage from '../../assets/img/pokeball.png';

import api from '../../service/api';

import * as S from './styles';
import { useNavigation } from '@react-navigation/native';
import { Search } from '../../components/Search';

type PokemonType = {
  type: {
    name: string;
  };
};

export interface Pokemon {
  name: string;
  url: string;
  id: number;
  types: PokemonType[];
}

export interface Request {
  id: number;
  types: PokemonType[];
}

export function Home() {
  const { navigate } = useNavigation();

  const [load, setLoad] = useState<boolean>(true);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);


  const [searchPokemons, setSearchPokemons] = useState([]);



  useEffect(() => {
    async function getPokemons(): Promise<void> {
      try {
        const response = await api.get('/pokemon?limit=151&offset=00');
        const { results } = response.data;

        const payloadPokemons = await Promise.all(
          results.map(async (pokemon: Pokemon) => {
            const { id, types } = await getMoreInfoAboutPokemonsByUrl(
              pokemon.url,
            );

            return {
              name: pokemon.name,
              id,
              types,
            };
          }),
        );

        setPokemons(payloadPokemons as Pokemon[]);
        setSearchPokemons(payloadPokemons as Pokemon[])
      } catch (err) {
        Alert.alert('ops, algo de errado aconteceu, tente mais tarde');
      } finally {
        setLoad(false);
      }
    }

    getPokemons();
  }, []);

  async function getMoreInfoAboutPokemonsByUrl(url: string): Promise<Request> {
    const response = await api.get(url);

    const { id, types } = response.data as Request;

    return { id, types };
  }

 

  function handleNavigationPokemonDetail(pokemonId: number) {
    navigate('About', {
      pokemonId,
    });
  }

  function search(sp) {
    let arr = JSON.parse(JSON.stringify(searchPokemons));

    setPokemons(arr.filter(
      (item) => item.name.toLowerCase().includes(sp.toLowerCase())));
  }
  
  return load ? (
    <S.LoadingScreen>
      <Load />
    </S.LoadingScreen>
  ) : (
    <>
      <S.Container>
        <FlatList
          ListHeaderComponent={
            <>
            
              <S.Header source={pokeballImage} />
              <S.Title>Pokédex</S.Title>
                <Search search={(sp: string) => search(sp)} />

    </>
          }
          contentContainerStyle={{
            paddingHorizontal: 20,
          }}
          data={pokemons}
          keyExtractor={pokemon => pokemon.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: pokemons }) => (
            <Card
              data={pokemons}
              onPress={() => {
                handleNavigationPokemonDetail(pokemons.id);
              }}
            />
          )}
        />
      </S.Container>
    </>
  );
}
''