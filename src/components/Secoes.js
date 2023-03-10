import styled from "styled-components"
import { useNavigate } from "react-router-dom"


export default function Secoes(props) {
    const navigate = useNavigate()

    function escolherAssento(id) {
        navigate(`/assentos/:id`)
    }

    return (
        <SessionContainer>
            {props.weekday} - {props.date}
            <ButtonsContainer>
                {props.showtimes.map(showtime => <button key={showtime.id} onClick={() => escolherAssento(showtime.id)} >{showtime.name}</button>)}
            </ButtonsContainer>
        </SessionContainer>
    )
}

const SessionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: 'Roboto';
    font-size: 20px;
    color: #293845;
    padding: 0 20px;
`

const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px 0;
    button {
        margin-right: 20px;
    }
    a {
        text-decoration: none;
    }
`