import styled from "styled-components";
import { useState, useEffect } from 'react';
import axios from 'axios';
import ContainerFilme from "../../components/ContainerFilme";
import React from "react";

export default function HomePage() {

    const [listaFilmes, setListaFilmes] = React.useState([]);

    useEffect(() => {
        const urlListaFilmes = "https://mock-api.driven.com.br/api/v8/cineflex/movies"
        const requisicao = axios.get(urlListaFilmes);

        requisicao.then(resposta => {
            console.log(resposta);
            setListaFilmes(resposta.data)
        });
    }, []);

    return (
        <PageContainer>
            Selecione o filme

            <ListContainer>
                {listaFilmes.map(filme => <ContainerFilme key={filme.id} imagem={filme.posterURL} />)}
            </ListContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-top: 70px;
`
const ListContainer = styled.div`
    width: 330px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    padding: 10px;
`
