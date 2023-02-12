import styled from "styled-components"
import Announcement from "../components/Announcement"
import Navbar from "../components/Navbar"
import Newsletter from "../components/Newsletter"
import Footer from "../components/Footer"
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { mobile, smallMobile, tablet } from "../responsive"
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { addCartQuantity } from "../redux/cartRedux"
import { addOrderProduct } from "../redux/orderRedux"
import { useSelector } from "react-redux"
import { Alert } from "@mui/material"
import { RotatingLines } from 'react-loader-spinner'
import { addAlert, addLoaderDisplay } from "../redux/loaderRedux"

const Container = styled.div``

const Wrapper = styled.div`
padding: 50px;
display: flex;
${mobile({ padding: "10px", flexDirection: 'column', marginTop: "10px" })}
${smallMobile({ padding: "10px", flexDirection: 'column', marginTop: "25px" })}
${tablet({ padding: "10px", flexDirection: 'column', })}
`

const ImageContainer = styled.div`
flex:1;
height: 50%;
margin-bottom: 5px;
`

const Image = styled.img`
width:100%;
height:100%;
object-fit:cover;
margin-bottom: 5px;
${mobile({ height: "40vh" })}
${smallMobile({ height: "40vh" })}
${tablet({ height: "70vh" })}`

const InfoContainer = styled.div`
flex:1;
padding: 0px 50px;
${mobile({ padding: "0px 10px" })}
${smallMobile({ padding: "0px 10px" })}
${tablet({ padding: "0px 10px" })}`

const Title = styled.h1`
font-weight: 200;
`

const Desc = styled.p`
margin:20px 0px;`

const Price = styled.span`
font-weight: 100;
font-size: 40px;`

const FilterContainer = styled.div`
width:50%;
margin:30px 0px;
display: flex;
flex-wrap: wrap;
justify-content:space-between;
${mobile({ width: "100%" })}
${smallMobile({ width: "100%" })}
${tablet({ width: "100%" })}`

const Filter = styled.div`
display: flex;
align-items:center`

const FilterTitle = styled.span`
font-size: 20px;
font-weight: 200;
`

const FilterColor = styled.div`
width: 20px;
height: 20px;
border-radius:50%;
border: 1px solid black;
background-color:${props => props.color};
cursor: pointer;
margin:0px 5px`

const FilterSize = styled.select`
margin-left:10px;
padding: 5px;
${mobile({ border: "0.5px solid black" })}
${smallMobile({ marginLeft: "3px" })}
${tablet({ margin: "25px" })}
`

const FilterSizeOption = styled.option`
`
const AddContainer = styled.div`
width:min 50%;
display:flex;
align-items:center;
justify-content:space-between;
${mobile({ width: "100%" })};
${smallMobile({ width: "100%" })};
${tablet({ width: "100%" })};
`

const AmountContainer = styled.div`
display: flex;
align-items:center;
font-weight: 700;`


const Amount = styled.span`
width: 30px;
height: 30px;
border-radius:10px;
border:1px solid teal;
display: flex;
align-items:center;
justify-content:center;
margin: 5px;`

const Button = styled.button`
padding: 15px;
border:2px solid teal;
background-color: white;
cursor: pointer;
font-weight: 500;
border-radius:5px;
&:hover{
    background-color: #e19b9b;
    border:2px solid black;
}
${mobile({ margin: "10px", padding: "10px", fontSize: "10px" })};
${smallMobile({ margin: "5px", padding: "5px", fontSize: "5px" })};`


const Divloader = styled.div`
    display: none;
    justify-content: center;
    align-items:center;
    position: absolute;
    top:30%;
    left:46%;
    display: none;
    ${mobile({ top: "40%", left: "40%" })};
     ${smallMobile({ top: "50%", left: "35%" })}
`
const AlertContainer = styled.div`
     width: 80%;
     height: 50px;
     display:none;
     margin: auto;
     ${mobile({ height: "25px" })};
     ${smallMobile({ height: "25px" })}
`

const Product = () => {
    const location = useLocation();
    var id = location.pathname.split('/')[2]
    const [product, setProduct] = useState({})
    const [quantity, setQuantity] = useState(1)
    const [color, setColor] = useState("")
    const [size, setSize] = useState("")
    const [colorElement, setColorElement] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { currentUser, stayUser } = useSelector(state => state.user)
    const { loaderDisplay, alertDisplay, alertResult, errMsg } = useSelector(state => state.loader)

    const singleProduct = async () => {
        dispatch(addLoaderDisplay('flex'))
        /* const host = "http://localhost:5000" */
        const host = process.env.REACT_APP_BASE_URL 
        const response = await fetch(`${host}/api/products/getproduct/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (response.status >= 200 && response.status <= 299) {
            const product = await response.json()
            product.size.unshift("Size");
            setProduct(product)
            dispatch(addLoaderDisplay('none'))
            dispatch(addAlert({ alertDisplay: "block", alertResult: "success", errMsg: "" }))
            setTimeout(() => {
                dispatch(addAlert({ alertDisplay: "", alertResult: "", errMsg: "" }))
            }, 3000);

        } else {
            const json = await response.json()
            console.log(json)
            dispatch(addLoaderDisplay('none'))
            dispatch(addAlert({ alertDisplay: "block", alertResult: "error", errMsg: json.error }))
            setTimeout(() => {
                dispatch(addAlert({ alertDisplay: "", alertResult: "", errMsg: "" }))
            }, 3000);
        }

    }
    useEffect(() => {
        id && singleProduct()
    }, [id])

    const handleQuantity = (type) => {
        if (type === "inc") {
            const value = quantity + 1;
            setQuantity(value)
        }
        else {
            const value = quantity === 1 ? 1 : quantity - 1
            setQuantity(value)
        }

    }

    const handleCart = () => {
        dispatch(addCartQuantity());
        const addCart = async () => {
            /* const host = "http://localhost:5000" */
            const host = process.env.REACT_APP_BASE_URL 
            const response = await fetch(`${host}/api/carts/createcart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': stayUser === true ? localStorage.getItem("token") : sessionStorage.getItem("token")
                },
                body: JSON.stringify({
                    userEmail: currentUser && currentUser.email,
                    products: [{ productId: id, quantity: quantity, color: color, size: size }]
                })
            })
            if (response.status >= 200 && response.status <= 299) {
                const cart = await response.json()
                navigate('/cart')

            } else {
                const json = await response.json()
                console.log(json)

            }

        }
        addCart();

    }

    const handleOrder = () => {
        navigate("/payment/order")
        dispatch(addOrderProduct({ ...product, quantity, color, size }))
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

    const handleColor = (item, e) => {
        if (item !== color) {
            colorElement && (colorElement.style.width = "20px")
            colorElement && (colorElement.style.height = "20px")
            setColorElement(e.target)
            setColor(item)
            e.target.style.width = "40px"
            e.target.style.height = "40px";
        } else {

        }
    }

    return (
        <Container>
            <Announcement />
            <Navbar />
            <AlertContainer style={{ display: alertDisplay }}>
                <Alert variant="filled" severity={`${alertResult}`}>
                    {alertResult === 'success' ? "Product fetched successfully." : `${errMsg?errMsg:"Something went wrong..."}`}
                </Alert>
            </AlertContainer>
            <Divloader style={{ display: loaderDisplay }}>
                <RotatingLines
                    strokeColor="green"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="96"
                    visible={true}
                />
            </Divloader>
            <Wrapper style={{ display: loaderDisplay === 'flex' ? 'hidden' : "flex" }}>
                <ImageContainer>
                    <Image src={`data:image/png;base64,${product.image && arrayBufferToBase64(product.image.data)}`}></Image>
                </ImageContainer>
                <InfoContainer>
                    <Title>{product.title}</Title>
                    <Desc>{product.desc}</Desc>
                    <Price>{`Rs.${product.price}`}</Price>
                    <FilterContainer>
                        <Filter>
                            <FilterTitle>Color</FilterTitle>
                            {product.color?.map((item) => {
                                return <FilterColor color={item} key={item} id={item} onClick={(e) => { handleColor(item, e) }} />
                            })}
                        </Filter>
                        <Filter>
                            <FilterTitle>Size</FilterTitle>
                            <FilterSize onChange={(e) => setSize(e.target.value)}>
                                {product.size?.map((item) => {
                                    return <FilterSizeOption key={item} value={item === "Size" ? "" : item}>{item}</FilterSizeOption>
                                })}
                            </FilterSize>
                        </Filter>
                    </FilterContainer>
                    <AddContainer>
                        <AmountContainer>
                            <RemoveIcon onClick={() => handleQuantity('desc')} />
                            <Amount>{quantity}</Amount>
                            <AddIcon onClick={() => handleQuantity('inc')} />
                        </AmountContainer>
                        <Button onClick={handleCart} disabled={color && size ? false : true} style={{ pointerEvents: color && size ? "visible" : "none" }}> ADD TO CART</Button>
                        <Button onClick={handleOrder} disabled={color && size ? false : true} style={{ pointerEvents: color && size ? "visible" : "none" }}>Order Now</Button>
                    </AddContainer>
                </InfoContainer>
            </Wrapper>
            <Newsletter />
            <Footer />
        </Container>
    )
}

export default Product