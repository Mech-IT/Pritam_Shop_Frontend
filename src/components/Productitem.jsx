import styled from "styled-components"
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { mobile, smallMobile } from "../responsive"
import { useNavigate } from "react-router-dom";

const Container = styled.div`
flex:1;
margin:5px;
min-width: 350px;
height: 350px;
display:flex;
justify-content: center;
align-items: center;
background-color: #bfbffb;
position:relative;
transition:all 0.5s ease;
border-radius:10px;
&:hover{
    transform:scale(1.02);

}
${mobile({ minWidth: '200px' })}
${smallMobile({ minWidth: '150px' })}
`
const Circle = styled.div`
width:80%;
height: 80%;
border-radius:5%;
background-color: #f3dbdb;
position:absolute;
display:flex;
justify-content: center;
align-items: center;
flex-direction: column;
`

const Image = styled.img`
height: 75%;
z-index: 2;
object-fit:cover;
`
const Info = styled.div`
opacity: 0;
width:100%;
height: 100%;
position:absolute;
top: 0;
left: 0;
background-color:rgba(0,0,0,0.2);
border-radius:10px;
z-index:3;
display:flex;
justify-content:center;
align-items:center;
cursor: pointer;
transform: all 0.5s ease;
&:hover{
    opacity: 1;
}
`


const Icon = styled.div`
 width: 40px;
 height: 40px;
 border-radius:50%;
 background-color:white;
 display:flex;
 justify-content:center;
 align-items:center;
 margin: 10px;
 cursor: pointer;
 transition: all 0.5s ease;
 &:hover{
    background-color: red;
    transform:scale(1.1) }
`
const PriceContainer = styled.div`
margin:10px 0px;
font-size:25px;
font-weight:600;`

const Productitem = (props) => {
    const navigate = useNavigate()
    const handleSearch = () => {
        navigate(`/product/${props.item._id}`)
    }


    function arrayBufferToBase64(buffer) {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    }

    const base64Image= arrayBufferToBase64(props.item.image.data)
    return (
        <Container>
            <Circle>
                <Image src={`data:image/png;base64,${base64Image}`}></Image>
                <PriceContainer>
                    {`Rs.${props.item.price}`}
                </PriceContainer>
            </Circle>

            {/* <Image src={props.item.img}></Image> */}
            <Info>
                <Icon>
                    <SearchOutlinedIcon onClick={handleSearch}></SearchOutlinedIcon>
                </Icon>
            </Info>
        </Container>
    )
}

export default Productitem