import styled from "styled-components"
import Typewriter from 'typewriter-effect';

const Container = styled.div`
    height: 30px;  
    background-color:teal;
    color:white;
    text-align:center;
    display:flex;
    align-items:center;
    justify-content:center;
    font-size:14px;
    font-weight:500;
`

const Announcement = () => {
  return (
    <Container>
         <Typewriter 
           options={{ 
           strings:['Super Deal! Free Shipping on Orders Over 500 Rs.','Subscribe to Premium! To Get Delivery of Your Products Within 24 Hours.'],
           autoStart:true,
           delay:75,
           pauseFor:2000,
           loop:true
           }} 
           />
    </Container>
  )
}

export default Announcement