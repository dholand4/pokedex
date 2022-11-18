import React from 'react';
import {Feather} from '@expo/vector-icons';

import * as S from './styles';

type Props = {
    search: (arg0: string) => void;

}



export function Search({search}: Props) {

    return <S.ContainerSearchPokemon>
            <S.ContainerSearch>
        <Feather name="search" size={20} color="#747476" />
    <S.SearchPokemon
    placeholder='Qual Pokémon você está procurando?'
    onChangeText={search}

    ></S.SearchPokemon>
    </S.ContainerSearch> 
    </S.ContainerSearchPokemon> 
    

}
