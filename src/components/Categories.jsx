import styled from "styled-components";
import {categories} from "../data";
import Categoryitem from "./Categoryitem";
import {mobile,smallMobile} from "../responsive"


const Container=styled.div`
    display:flex;
    padding: 20px;
    justify-content:space-between;
    ${mobile({padding:'0px',flexDirection:'column'})}
    ${smallMobile({padding:'0px',flexDirection:'column'})}

`

const Categories = () => {
  
  return (
    <Container>
        {categories.map(item=>{
           return <Categoryitem item={item} key={item.id}/>
        })}
    </Container>
  )
}

export default Categories