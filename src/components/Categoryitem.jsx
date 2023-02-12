import styled from "styled-components"
import { mobile, tablet } from "../responsive"
import {
  useNavigate
} from "react-router-dom";

const Container = styled.div`
flex:1;
margin:3px;
height:70vh;
position: relative;
transition:all 0.5s ease;
border-radius:10px;
&:hover{
    transform:scale(1.02);

}
`

const Image = styled.img`
width:100%;
height:100%;
object-fit:cover;
${mobile({ height: '70vh' })}

`
const Info = styled.div`
position:absolute;
top:0;
left:0;
width:100%;
height:100%;
display:flex;
align-items: center;
justify-content: center;
flex-direction: column;
`
const Title = styled.h1`
   color:red;
   margin-bottom:20px;
   ${tablet({ fontSize: '20px', textAlign: 'center' })}
`
const Button = styled.button`
     border:none;
     padding: 10px;
     background-color:white;
     cursor: pointer;
     color:gray;
     font-weight:600;
     border-radius:5px;
     &:hover{
        background-color: red;
        color: white;
    }
`

const Categoryitem = (props) => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(`/products/${props.item.cat}`)
  }
 
  return (
    <Container>
      <Image src={props.item.img}></Image>
      <Info>
        <Title>{props.item.title}</Title>
        <Button onClick={handleClick}>SHOP NOW</Button>
      </Info>
    </Container>
  )
}

export default Categoryitem