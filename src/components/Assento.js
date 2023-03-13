import styled from "styled-components"
import React from "react";


export default function Assento(props) {

    function corDoAssento() {
        if (props.assentoSelecionado.includes(props.id)) {
            return "#1AAE9E"
        }
        else if (!props.isAvailable) {
            return "#FBE192"
        }
        else {
            return "#C3CFD9"
        }
    }

    function corDaBordaAssento() {
        if (props.assentoSelecionado.includes(props.id)) {
            return "#0E7D71"
        }
        else if (!props.isAvailable) {
            return "#F7C52B"
        }
        else {
            return "#808F9D"
        }
    }


    function selecionarAssento() {
        if (!props.assentoSelecionado.includes(props.id)) {
            if (props.isAvailable) {
                props.setAssentoSelecionado([...props.assentoSelecionado, props.id])
                props.setNumeroAssentoSelecionado([...props.numeroAssentoSelecionado, props.numero])
            }
            else {
                alert("Esse assento não está disponível")
            }
        }
        else {
            const arrayItemRemovido = props.assentoSelecionado.filter(item => item != props.id);
            const arrayNumeroRemovido = props.numeroAssentoSelecionado.filter(item => item != props.numero)
            props.setAssentoSelecionado(arrayItemRemovido);
            props.setNumeroAssentoSelecionado(arrayNumeroRemovido);
        }


    }


    return (
        <SeatItem onClick={() => selecionarAssento()} corDaBordaAssento={corDaBordaAssento} corDoAssento={corDoAssento} data-test="seat">{props.numero}</SeatItem>
    )
}

const SeatItem = styled.div`
    border: 1px solid ${props => props.corDaBordaAssento};         // Essa cor deve mudar
    background-color: ${props => props.corDoAssento};    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`