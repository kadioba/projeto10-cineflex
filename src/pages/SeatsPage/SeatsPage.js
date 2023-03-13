import styled from "styled-components"
import { useState, useEffect } from 'react';
import axios from 'axios';
import React from "react";
import Assento from "../../components/Assento";
import { Link, useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import Footer from "../../components/Footer";




export default function SeatsPage(props) {

    const params = useParams();
    const [sessao, setSessao] = React.useState(null)
    const [assentoSelecionado, setAssentoSelecionado] = React.useState([])
    const [numeroAssentoSelecionado, setNumeroAssentoSelecionado] = React.useState([])
    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");

    console.log(sessao)

    const navigate = useNavigate()


    useEffect(() => {
        const requisicao = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${params.idSessao}/seats`);

        requisicao.then(resposta => {
            setSessao(resposta.data)

        });

    }, []);

    function reservarAssentos(event) {
        event.preventDefault();

        console.log("Entrou na funcao")

        const requisicao = axios.post("https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many", {
            ids: assentoSelecionado,
            name: nome,
            cpf: cpf
        })

        requisicao.then((resposta) => {
            props.setDadosReserva({
                nome: nome,
                cpf: cpf,
                assentos: numeroAssentoSelecionado,
                dia: sessao.day.date,
                hora: sessao.name,
                filme: sessao.movie.title
            })
            navigate("/sucesso")
        })

    }

    if (sessao === null) {
        return (
            <h1>Carregando</h1>
        )
    }

    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {sessao.seats.map(assento => <Assento setNumeroAssentoSelecionado={setNumeroAssentoSelecionado} numeroAssentoSelecionado={numeroAssentoSelecionado} assentoSelecionado={assentoSelecionado} setAssentoSelecionado={setAssentoSelecionado} numero={assento.name} id={assento.id} isAvailable={assento.isAvailable} />)}
            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem >
                    <CaptionCircle cor={"#1AAE9E"} borda={"#0E7D71"} />
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle cor={"lightblue"} borda={"blue"} />
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle cor={"#FBE192"} borda={"#F7C52B"} />
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer>
                <form onSubmit={reservarAssentos}>
                    Nome do Comprador:
                    <input onChange={e => setNome(e.target.value)} type="text" value={nome} data-test="client-name" />

                    CPF do Comprador:
                    <input onChange={e => setCpf(e.target.value)} type="text" value={cpf} data-test="client-cpf" />

                    <button type="submit" data-test="book-seat-btn" >Reservar Assento(s)</button>
                </form>
            </FormContainer>

            <Footer posterURL={sessao.movie.posterURL}>
                <p>{sessao.movie.title}</p>
                <p>{sessao.day.weekday} - {sessao.name}</p>
            </Footer>

            {/*             /<FooterContainer>
                <div>
                    <img src={"https://br.web.img2.acsta.net/pictures/22/05/16/17/59/5165498.jpg"} alt="poster" />
                </div>
                <div>
                    <p>Tudo em todo lugar ao mesmo tempo</p>
                    <p>Sexta - 14h00</p>
                </div>
            </FooterContainer> */}



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
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.div`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`
    border: 1px solid ${props => props.borda};         // Essa cor deve mudar
    background-color: ${props => props.cor};    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
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