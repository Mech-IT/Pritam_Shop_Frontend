import styled from "styled-components"
import ArrowLeftOutlinedIcon from '@mui/icons-material/ArrowLeftOutlined';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import { sliderItems } from "../data"
import { useState } from "react";
import {mobile, smallMobile} from "../responsive"
import {tablet} from "../responsive"
import {
    useNavigate
  } from "react-router-dom";

const Container = styled.div`
    height: 100vh;
    width:100%;  
    display:flex;
    position:relative;
    overflow:hidden;
    ${smallMobile({display:'none'})}
    ${mobile({display:'none'})}
    ${tablet({display:'none'})}
`
const Arrow = styled.div`
    width: 50px;
    height: 50px;
    background-color: #fbe0e0;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content:center;
    position:absolute;
    top:0;
    bottom: 0;
    left:${props => props.direction === 'left' && "10px"};   
    right:${props => props.direction === 'right' && "10px"};    
    margin: auto;
    cursor: pointer;
    opacity: 0.5;
    z-index: 2;
    ${mobile({width:'25px',height:'25px'})}
`
const Wrapper = styled.div`
    height: 100%;
    display:flex;
    transition: all 1.5s ease;
    transform: translateX(${props=>props.slide * (-100)}vw)
`
const Slide = styled.div`
width:100vw;
height:100vh;
display:flex;
align-items: center;
background-color:#${props=>props.bg};

`
const ImageContainer = styled.div`
flex:1;
height: 100%;
`
const Image = styled.img`
     height:80%;  
`
const InfoContainer = styled.div`
flex:1;
padding: 50px;
`
const Title = styled.h1`
font-size:70px;
`
const Desc = styled.p`
 margin:50px 0px;
 font-size:20px;
 font-weight: 500;
 letter-spacing: 3px;
`
const Button = styled.button`
    padding: 10px;
    font-size:20px;
    background-color:transparent;
    cursor: pointer;
    border-radius:5px;
    &:hover{
        background-color: red;
        color: white;
    }
`
const Slider = () => {
    const [sliderIndex, setSliderIndex]=useState(0);
    const navigate=useNavigate();
    const handleClick=(direction)=>{
        if(direction==='left'){
           setSliderIndex(sliderIndex===0 ? 2:sliderIndex-1)
           
        }
        else{
            setSliderIndex(sliderIndex===2 ? 0:sliderIndex+1)
        }
         
    };

    const handleShop=(cat)=>{
        navigate(`/products/${cat}`)
    }
    return (
        <Container>
            <Arrow direction='left' onClick={()=>{handleClick('left')}}>
                <ArrowLeftOutlinedIcon />
            </Arrow>
            <Wrapper slide={sliderIndex}>
                {sliderItems.map(item => {
                    return <Slide key={item.id} bg={item.bg}>
                        <ImageContainer>
                            <Image src={item.img}></Image>
                        </ImageContainer>
                        <InfoContainer>
                            <Title>{item.title}</Title>
                            <Desc>{item.desc}</Desc>
                            <Button onClick={()=>handleShop(item.cat)}>SHOP NOW</Button>
                        </InfoContainer>
                    </Slide>
                })}
            </Wrapper>
            <Arrow direction='right' onClick={()=>{handleClick('right')}}>
                <ArrowRightOutlinedIcon />
            </Arrow>
        </Container>
    )
}

export default Slider