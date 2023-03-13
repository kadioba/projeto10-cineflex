import styled from "styled-components";
import { Link, useParams } from "react-router-dom"

export default function ContainerFilme(props) {
    return (
        <Link to={`/sessoes/${props.id}`} data-test="movie">
            <MovieContainer>
                <img src={props.imagem} alt="poster" />
            </MovieContainer>
        </Link>
    )
}

const MovieContainer = styled.div`
    width: 145px;
    height: 210px;
    box-shadow: 0px 2px 4px 2px #0000001A;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    img {
        width: 130px;
        height: 190px;
    }
    `