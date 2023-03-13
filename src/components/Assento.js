import styled from "styled-components"
import React from "react";


export default function Assento(props) {

    const [corAssento, setCorAssento] = React.useState("lightblue")
    const [corAssentoBorda, setCorAssentoBorda] = React.useState("blue")




    function selecionarAssento() {
        if (!props.assentoSelecionado.includes(props.id)) {
            if (props.isAvailable) {
                props.setAssentoSelecionado([...props.assentoSelecionado, props.id])
                props.setNumeroAssentoSelecionado([...props.numeroAssentoSelecionado, props.numero])
                setCorAssento("#1AAE9E")
                setCorAssentoBorda("#0E7D71")
            }
            else {
                setCorAssento("#FBE192")
                setCorAssentoBorda("#F7C52B")
            }
        }
        else {
            const arrayItemRemovido = props.assentoSelecionado.filter(item => item != props.id);
            const arrayNumeroRemovido = props.numeroAssentoSelecionado.filter(item => item != props.numero)
            props.setAssentoSelecionado(arrayItemRemovido);
            props.setNumeroAssentoSelecionado(arrayNumeroRemovido);
            setCorAssento("lightblue")
            setCorAssentoBorda("blue")
        }


    }

    return (
        <SeatItem onClick={() => selecionarAssento()} corAssentoBorda={corAssentoBorda} corAssento={corAssento} data-test="seat">{props.numero}</SeatItem>
    )
}

const SeatItem = styled.div`
    border: 1px solid ${props => props.corAssentoBorda};         // Essa cor deve mudar
    background-color: ${props => props.corAssento};    // Essa cor deve mudar
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