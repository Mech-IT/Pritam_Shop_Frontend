import React from 'react'
import styled from 'styled-components'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from "react-router-dom";
import { mobile, smallMobile, tablet } from "../responsive"
const Container = styled.div`
    height:99vh;
    width: 99%;
    overflow-x: hidden;
    display: flex;
    justify-content:center;
    align-items: center;
    flex-direction:column;
    &::before{
background:url("https://images.pexels.com/photos/327533/pexels-photo-327533.jpeg?auto=compress&cs=tinysrgb&w=600") no-repeat center center/cover;
content: "";
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
z-index: -1;
opacity: 0.4;
}
`
const Span = styled.span`
    font-size:50px;
    margin: 10px;
    text-align: center;
    ${mobile({fontSize:"25px"})};
    ${smallMobile({fontSize:"15px"})};
    ${tablet({fontSize:"35px"})};
`
const Button=styled.button`
font-size:50px;
border-radius:5px;
cursor: pointer;
:hover{
    background-color: #e7a4a4;
    font-weight:bold;
};
${mobile({fontSize:"25px"})};
${smallMobile({fontSize:"15px"})};
${tablet({fontSize:"35px"})};
`

const Success = () => {
    const navigate=useNavigate()
    setTimeout(() => {
        navigate("/")
    }, 10000);
    return (
        <Container>
            <CheckCircleIcon style={{fontSize:"50px"}}></CheckCircleIcon>
            <Span>YOUR ORDER IS ON THE WAY...THANK YOU FOR SHOPPING WITH US</Span>
            <Button onClick={()=>{navigate("/")}}>Continue Shopping</Button>
        </Container>
    )
}

export default Success