import styled from "styled-components"
import Announcement from "../components/Announcement"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { mobile, smallMobile, tablet } from "../responsive"
import { useSelector } from "react-redux";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { Badge } from "@mui/material"
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import { useNavigate } from "react-router-dom";
import { addProduct, deleteCartQuantity, set, setTotal } from "../redux/cartRedux"
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux"
import Alert from '@mui/material/Alert';
import swal from 'sweetalert';
import { RotatingLines } from 'react-loader-spinner'
import { addAlert, addLoaderDisplay } from '../redux/loaderRedux'
const Container = styled.div``

const Wrapper = styled.div`
padding: 20px;
display:none;
${mobile({ padding: "10px" })}
${smallMobile({ padding: "10px" })}`

const Title = styled.h1`
font-weight: 300;
text-align:center;`



const Top = styled.div`
display:flex;
align-items:center;
justify-content:space-between;
padding: 20px;`


const TopButton = styled.button`
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    border-radius:5PX;
    border:${props => props.type === "filled" && "none"};
    background-color:${props => props.type === "filled" ? "black" : "transparent"};
    color:${props => props.type === "filled" ? "white" : "black"};
    ${smallMobile({ marginRight: '20px' })}
    ${mobile({ marginRight: '20px' })}
`
const TopTexts = styled.div`
${mobile({ display: "none" })}
${smallMobile({ display: "none" })}
${tablet({ display: 'flex', flexDirection: 'column' })}`

const TopText = styled.span`
    /* text-decoration:underline; */
    cursor: pointer;
    margin:0px 10px;
    ${tablet({ margin: '5px' })}
`
const Bottom = styled.div`
display:flex;
justify-content:space-between;
${mobile({ flexDirection: "column" })}
${smallMobile({ flexDirection: "column" })}
${tablet({ flexDirection: "column" })}`

const Info = styled.div`
flex:3;`

const Product = styled.div`
display: flex;
justify-content:space-between;
margin: 20px;
${mobile({ flexDirection: "column" })}
${smallMobile({ flexDirection: "column" })}
`


const ProductDetail = styled.div`
flex:2;
display: flex;
flex-wrap:wrap;
${mobile({ justifyContent: "center", alignItems: "center" })}
${smallMobile({ justifyContent: "center", alignItems: "center" })}
`

const Image = styled.img`
width:200px;`


const Details = styled.div`
padding: 20px;
display: flex;
flex-direction:column;
justify-content:space-evenly;
${mobile({ justifyContent: "space-around" })};
${smallMobile({ justifyContent: "space-around" })};
`

const ProductName = styled.span``

const ProductId = styled.span``

const ProductColor = styled.div`
width: 20px;
height: 20px;
border-radius:50%;
border: 1px solid teal;
background-color:${props => props.color}`

const ProductSize = styled.span``

const PriceDetail = styled.div`
flex:1;
display: flex;
flex-direction:column;
justify-content: center;
align-items:center;
gap:10px;`

const ProductAmountContainer = styled.div`
display: flex;
align-items:center;
font-size: large;
cursor: pointer;
`
const ProductAmount = styled.div`
font-size: 24px;
width: 30px;
height: 30px;
margin:5px;
border:1px solid teal;
border-radius:10Px;
display: flex;
justify-content: center;
align-items: center;
${mobile({ margin: "5px 15px" })}
${smallMobile({ margin: "5px 15px" })}
${tablet({ margin: "5px 15px" })}
`

const ProductPrice = styled.div`
font-size: 30px;
font-weight: 200;
${mobile({ marginBottom: "20px" })}
${smallMobile({ marginBottom: "20px" })}
`
const Hr = styled.hr`
background-color:#e80c0c;
border:none;
height: 1px;`



const Summary = styled.div`
flex:1;
border:0.5px solid lightgray;
border-radius:10px;
padding: 20px;
height:60vh;`

const SummaryTitle = styled.h1`
font-weight: 200;`

const SummaryItem = styled.div`
margin:30px 0px;
display: flex;
justify-content: space-between;
font-weight:${props => props.type === 'total' && "500"};
font-size:${props => props.type === 'total' && "24px"};
`
const SummaryItemText = styled.span`
`
const SummaryItemPrice = styled.span`
`
const Button = styled.button`
/* width: 100%; */
padding: 10px;
border-radius: 5px;
background-color: black;
color: white;
font-weight: 600;
cursor: pointer;`


const AlertContainerDelete = styled.div`
     width: 80%;
     height: 50px;
     display: none;
     margin: auto;
`
const Divloader = styled.div`
    display: none;
    justify-content: center;
    align-items:center;
    position: absolute;
    top:12%;
    left:48%;
    display: none;
    ${mobile({ top: "12%", left: "40%" })};
     ${smallMobile({ top: "12%", left: "35%" })}
`
const AlertContainer = styled.div`
     width: 80%;
     height: 50px;
     display:none;
     margin: auto;
     ${mobile({ height: "25px" })};
     ${smallMobile({ height: "25px" })}
`
const Cart = () => {

    const cart = useSelector(state => state.cart)
    const { currentUser, stayUser } = useSelector(state => state.user)
    const navigate = useNavigate()
    const [resultDelete, setResultDelete] = useState("")
    const [carts, setCarts] = useState([])
    const dispatch = useDispatch()
    const { loaderDisplay, alertDisplay, alertResult, errMsg } = useSelector(state => state.loader)

    const userCart = async () => {
        /* const host = "http://localhost:5000" */
        const host = process.env.REACT_APP_BASE_URL 
        const response = await fetch(`${host}/api/carts/getcart/${currentUser.email}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': stayUser === true ? localStorage.getItem("token") : sessionStorage.getItem("token")
            },
        })
        if (response.status >= 200 && response.status <= 299) {
            const carts = await response.json()
            carts.length === 0 && dispatch(set());
            setCarts(carts)


        } else {
            const json = await response.json()
            console.log(json)

        }

    }


    var products = []
    var total = 0
    var z = 0
    const cartProducts = async (id, size, color, quantity, i) => {
        dispatch(addLoaderDisplay('flex'))
        /* const host = "http://localhost:5000" */
        const host = process.env.REACT_APP_BASE_URL 
        const response = await fetch(`${host}/api/products/getproduct/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': stayUser === true ? localStorage.getItem("token") : sessionStorage.getItem("token")
            },
        })
        if (response.status >= 200 && response.status <= 299) {
            const product = await response.json()
            product.color = color;
            product.size = size;
            product.quantity = quantity;
            products.push(product)
            total += product.price * product.quantity;
            z += 1
            if (z === i) {
                dispatch(addProduct(products))
                dispatch(setTotal(total))
                dispatch(addLoaderDisplay('none'))
                document.getElementById('cartMain').style.display = "block"
                dispatch(addAlert({ alertDisplay: "block", alertResult: "success", errMsg: "" }))
                setTimeout(() => {
                    dispatch(addAlert({ alertDisplay: "", alertResult: "", errMsg: "" }))
                }, 3000);

            }

        } else {
            const json = await response.json()
            console.log(json)
            dispatch(addLoaderDisplay('none'))
            dispatch(addAlert({ alertDisplay: "block", alertResult: "error", errMsg: json.error}))
            setTimeout(() => {
                dispatch(addAlert({ alertDisplay: "", alertResult: "", errMsg: "" }))
            }, 3000);


        }

    }


    useEffect(() => {
        userCart();
    }, [])

    useEffect(() => {
        carts.length !== 0 && carts.forEach((item) => { cartProducts(item.products[0].productId, item.products[0].size, item.products[0].color, item.products[0].quantity, carts.length) })
    }, [carts])

    const handleDelete = async (id) => {
        dispatch(deleteCartQuantity())
        const cartD = carts.filter((item) => { return item.products[0].productId === id });


        const deleteProduct = async (cartId) => {
            const confirm = await swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this cart information",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            if (confirm === true) {
                /* const host = "http://localhost:5000" */
                const host = process.env.REACT_APP_BASE_URL 
                const response = await fetch(`${host}/api/carts/deletecart/${cartId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': stayUser === true ? localStorage.getItem("token") : sessionStorage.getItem("token")
                    }
                })
                if (response.status >= 200 && response.status <= 299) {
                    setResultDelete("success")
                    document.getElementById('alertTD').style.display = 'block'
                    setTimeout(() => {
                        document.getElementById('alertTD').style.display = 'none'
                        /* window.location.reload() */
                        userCart()
                    }, 3000);

                } else {
                    const json = await response.json()
                    console.log(json)
                    setResultDelete("error")
                    document.getElementById('alertTD').style.display = 'block'
                    setTimeout(() => {
                        document.getElementById('alertTD').style.display = 'none'
                    }, 3000);

                }


            }


            else {

            }

        }
        deleteProduct(cartD[0]._id)
    }
    const handleCheckout = async () => {
        navigate("/payment/cart")
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


    return (
        <Container>
            <Announcement />
            <Navbar />
            <AlertContainerDelete id='alertTD'>
                <Alert variant="filled" severity={`${resultDelete}`}>
                    {resultDelete === 'success' ? "Cart product deleted successfully." : "Something Went Wrong..."}
                </Alert>
            </AlertContainerDelete>
            <AlertContainer style={{ display: alertDisplay }}>
                <Alert variant="filled" severity={`${alertResult}`}>
                    {alertResult === 'success' ? "Carts fetched successfully." : `${errMsg ? errMsg : "Something went wrong..."}`}
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
            <Wrapper id="cartMain">
                <Title>YOUR BAG</Title>
                <Top>
                    <TopButton onClick={() => { navigate("/") }}>CONTINUE SHOPPING</TopButton>
                    <TopTexts>
                        <TopText><Badge badgeContent={cart.cartQuantity} color="secondary" anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}>
                            <ShoppingBagIcon style={{ fontSize: "50px" }}></ShoppingBagIcon>
                        </Badge></TopText>
                        <TopText><Badge badgeContent={cart.cartQuantity} color="secondary" anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}>
                            <FavoriteOutlinedIcon style={{ fontSize: "50px" }}></FavoriteOutlinedIcon>
                        </Badge></TopText>
                    </TopTexts>
                    <TopButton type="filled" onClick={handleCheckout} style={{ display: cart.total === 0 ? "none" : "flex" }}>CHECKOUT NOW</TopButton>
                </Top>
                <Bottom>
                    <Info>
                        {cart.products.length !== 0 && cart.products.map((product) => {
                            return <><Product key={product._id} >
                                <ProductDetail>
                                    <Image src={`data:image/png;base64,${product.image && arrayBufferToBase64(product.image.data)}`}></Image>
                                    <Details>
                                        <ProductName><b>Product:</b> {product.title}</ProductName>
                                        <ProductId><b>ID:</b> {product._id} </ProductId>
                                        <ProductColor color={product.color} />
                                        <ProductSize><b>SIZE:</b>{product.size}</ProductSize>
                                    </Details>
                                </ProductDetail>

                                <PriceDetail>
                                    <ProductAmountContainer>
                                        Quantity:<ProductAmount>{product.quantity}</ProductAmount>
                                    </ProductAmountContainer>
                                    <ProductPrice>{`Rs.${product.price * product.quantity}`}</ProductPrice>
                                    <TopButton type="filled" onClick={() => handleDelete(product._id)}>Delete</TopButton>
                                </PriceDetail>
                            </Product>
                                <Hr></Hr>
                            </>
                        })}
                    </Info>

                    <Summary>
                        <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>Subtotal</SummaryItemText>
                            <SummaryItemPrice>Rs.{cart.total}</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Estimated Shipping</SummaryItemText>
                            <SummaryItemPrice>Rs.200 </SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Shipping Discount</SummaryItemText>
                            <SummaryItemPrice>Rs. -200</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem type="total">
                            <SummaryItemText >Total</SummaryItemText>
                            <SummaryItemPrice>Rs.{cart.total}</SummaryItemPrice>
                        </SummaryItem>
                        <Button onClick={handleCheckout} style={{ display: cart.total === 0 ? "none" : "flex" }}>CHECKOUT NOW</Button>
                    </Summary>
                </Bottom>
            </Wrapper>
            <Footer />

        </Container>
    )
}

export default Cart