import styled from "styled-components"
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import React from "react";
import Secoes from "../../components/Secoes";
import Footer from "../../components/Footer";


export default function SessionsPage() {

    const params = useParams();
    const [filme, setFilme] = React.useState(null);
    console.log(filme)

    useEffect(() => {
        const requisicao = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/movies/${params.idFilme}/showtimes`);

        requisicao.then(resposta => {
            setFilme(resposta.data)
        });

    }, []);

    // Caso o react tente carregar o componente e nao ache, ele crasha
    if (filme === null) {
        return (
            <p>Carregando</p>
        )
    }

    return (
        <PageContainer>
            Selecione o horário
            <div>

                {filme.days.map(horario => <Secoes key={horario.id} id={horario.id} weekday={horario.weekday} showtimes={horario.showtimes} date={horario.date} />)}

            </div>

            <Footer posterURL={filme.posterURL} data-test="footer">
                <p>{filme.title}</p>
            </Footer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
    div {
        margin-top: 20px;
    }
`

const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`