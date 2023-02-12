import styled from "styled-components"
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import PlaceIcon from '@mui/icons-material/Place';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import {mobile,smallMobile} from "../responsive"

const Container=styled.div`
display:flex;
${mobile({flexDirection:'column'})}
${smallMobile({flexDirection:'column'})}
`

const Left=styled.div`
flex:1;
display:flex;
flex-direction:column;
padding:20px;`

const Logo=styled.h1``

const Desc=styled.p`
margin:20px 0px`

const SocialContainer=styled.div`
display:flex;
`

const SocialIcon=styled.div`
width:40px;
height: 40px;
border-radius:50%;
color: white;
background-color:${props=>props.color};
display:flex;
justify-content:center;
align-items:center;
margin-right:20px`

const Center=styled.div`
flex:1;
padding: 20px;
${mobile({display:'none'})}
${smallMobile({display:'none'})}
`

const Title=styled.h3`
margin-bottom:30px`

const List=styled.ul`
margin: 0;
padding: 0;
list-style:none;
display:flex;
flex-wrap:wrap;
`

const ListItem=styled.li`
width:50%;
margin-bottom: 10px;
`

const Right=styled.div`
flex:1;
padding: 20px;
${mobile({backgroundColor:'#ebdada'})}
${smallMobile({backgroundColor:'#ebdada'})}`

const ContactItem=styled.div`
 display:flex;
 align-items:center;
 margin-bottom: 20px;
`
const Payment=styled.img`
width:100%`

const Footer = () => {
  return (
    <Container>
        <Left>
        <Logo>PritamShop</Logo>
        <Desc>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste, temporibus?</Desc>
        <SocialContainer>
        <SocialIcon color='#012542'><LinkedInIcon/></SocialIcon>
        <SocialIcon color='#023013'><GitHubIcon/></SocialIcon>
        </SocialContainer>
        </Left>
        <Center>
        <Title>Useful Links</Title>
        <List>
        <ListItem>Home</ListItem>
        <ListItem>Cart</ListItem>
        <ListItem>Man Fashion</ListItem>
        <ListItem>Women Fashion</ListItem>
        <ListItem>My Account</ListItem>
        <ListItem>Order Tracking</ListItem>
        <ListItem>Wishlist</ListItem>
        <ListItem>Terms and Conditions</ListItem>
        </List>
        </Center>
        <Right>
        <Title> Contact </Title>
        <ContactItem>
        <PlaceIcon style={{marginRight:'10px'}}/>
        652 steveNagar Mumbai,Maharashtra
        </ContactItem>
        <ContactItem>
        <PhoneIcon style={{marginRight:'10px'}}></PhoneIcon>
        +912255887856
        </ContactItem>
        <ContactItem>
        <EmailIcon style={{marginRight:'10px'}}/>
        contact@gmail.com
        </ContactItem>

        <Payment src="https://i.ibb.co/Kx0T4zg/Payment-Modes.jpg"></Payment>
        </Right>
    </Container>
  )
}

export default Footer