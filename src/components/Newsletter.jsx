import { Send } from '@mui/icons-material';
import styled from 'styled-components';
import {mobile,smallMobile} from "../responsive"

const Container=styled.div`
height: 60vh;
background-color: #d8c779;
display:flex;
justify-content:center;
align-items:center;
flex-direction:column`

const Title=styled.h1`
font-size:70px;
margin-bottom:20px;
${mobile({fontSize:'50px'})}
${smallMobile({fontSize:'35px'})}
`

const Desc=styled.div`
font-size:24px;
margin-bottom:20px;
font-weight:300;
${mobile({textAlign:'center'})}
${smallMobile({textAlign:'center'})}
`

const InputContainer=styled.div`
width:50%;
height:40px;
background-color:white;
display:flex;
justify-content:space-between;
border:1px solid black;
${mobile({width:'80%'})}
${smallMobile({width:'85%'})}
`


const Input=styled.input`
border:none;
flex:8;
padding-left:20px;
text-align:center;
${smallMobile({paddingLeft:"0px"})}
`

const Button=styled.button`
flex:1;
border:none;
background-color: teal;
cursor: pointer;
color: white;
padding-right:0;
margin-right:0;
`

const Newsletter = () => {
  return (
    <Container>
        <Title>Newsletter</Title>
        <Desc>Get timely updates from your favourite products.</Desc>
        <InputContainer>
         <Input placeholder='Your Email'></Input>
         <Button><Send/></Button>
        </InputContainer>
    </Container>
  )
}

export default Newsletter