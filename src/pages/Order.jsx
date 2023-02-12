import React from 'react'
import Announcement from "../components/Announcement"
import Navbar from "../components/Navbar"
import Newsletter from "../components/Newsletter"
import Footer from "../components/Footer"
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { orderRePay } from '../redux/orderRedux'
import { mobile, smallMobile, tablet } from "../responsive"
import { Alert } from "@mui/material"
import { RotatingLines } from 'react-loader-spinner'
import { addAlert, addLoaderDisplay } from '../redux/loaderRedux'

const Container = styled.div`
`
const Wrapper = styled.div`
display: flex;
margin: auto;
flex-direction: column;
gap:10px;

`
const Title = styled.h1`
font-weight: 300;
text-align:center;`

const OrderInfo = styled.div`
width: 50%;
margin: auto;
display: flex;
flex-wrap: wrap;
flex-direction: column;
justify-content: center;
align-items: baseline;
margin: auto;
${mobile({ width:"100%",margin:"7px",flexWrap:"wrap"})};
${smallMobile({ width:"100%",margin:"5px"})};
`

const OrderId = styled.div`
   font-size: large;
   font-weight: bold;
   ${mobile({fontSize:"12px"})};
   ${smallMobile({fontSize:"8px"})};
`

const OrderAmount = styled.div`
       font-size: large;
       font-weight: bold;
       ${mobile({fontSize:"12px"})};
       ${smallMobile({fontSize:"8px"})};
`

const OrderStatus = styled.div`
       font-size: large;
       font-weight: bold;
       ${mobile({fontSize:"12px"})};
       ${smallMobile({fontSize:"8px"})};
`
const OrderSpan = styled.span`
    color: ${props => props.status === "delivered" ? "green" : props.status === "dispatch" ? "goldenrod" : "#B6B645"};
`

const ProductContainer = styled.div`
   display: flex;
   flex-direction: column;
   flex-wrap: wrap;
   justify-content: center;
   align-items: center;
   gap:10px;
   width: 100%;
   ${mobile({alignItems:"baseLine"})};
   ${smallMobile({alignItems:"center"})};
`
const Product = styled.div`
    display: flex;
    width: 50%;
   ${mobile({width:"100%",flexDirection: 'column',})};
   ${smallMobile({flexDirection: 'column',})};
`

const Left = styled.div`
flex:1;
display: flex;
margin: 10px;
justify-content: center;
align-items: flex-start;
${mobile({ margin: "7px" })};
${smallMobile({ margin: "5px" })};
`
const ImageContainer = styled.div`
  width: 50%;
  border: 1px solid red;
  border-radius: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  object-fit: cover;
`

const ProductImage = styled.img`
   width: 100%;
   height: 100%;
   border-radius: 5%;
   object-fit:cover;
`

const Right = styled.div`
flex:1;
margin: 10px;
display: flex;
flex-direction: column;
flex-wrap: wrap;
${mobile({ margin: "7px" })};
`


const ProductTitle = styled.h3`
text-align: center;
`

const ProductInfo = styled.div`
margin: 10px;
display: flex;
justify-content: space-between;
align-items: center;
${mobile({margin: "7px",justifyContent:"center",flexDirection:"column",alignItems:"center"})};
${smallMobile({margin: "5px",justifyContent:"center",flexDirection:"column",alignItems:"center"})};
${tablet({margin: "5px",justifyContent:"center",flexDirection:"column"})};
`

const ProductColor = styled.div`
width: 40px;
height: 40px;
border-radius:50%;
border: 1px solid teal;
background-color:${props => props.color};
${mobile({ height: "20px",width:"20px" })};
${smallMobile({ height: "15px",width:"15px" })};

`

const ProductSize = styled.div`
 font-size: 30px;
 ${mobile({ fontSize: "20px" })};
 ${smallMobile({ fontSize: "10px" })};
`

const ProductQuantity = styled.div`
   font-size: 30px;
   ${mobile({ fontSize: "20px" })};
   ${smallMobile({ fontSize: "10px" })};
`

const AmountInfo = styled.div`
    width: 50%;
    margin: auto;
    display: flex;
    gap:10px;
    justify-content: space-evenly;
    align-items: center;
    ${mobile({width:"75%",flexDirection: 'column',})};
    ${smallMobile({flexDirection: 'column',})};
   
`

const AmountStatus = styled.div`
       font-size: large;
       font-weight: bold;
      
`
const Span = styled.span`
color: ${props => props.status === "successful" ? "green" : props.status === "decline" ? "red" : "#B6B645"};
`

const PayButton = styled.button`
padding: 10px;
display: ${props => props.status === "pending" ? "block" : "none"};
width: 10%;
border-radius: 5px;
background-color: black;
color: white;
font-weight: 600;
cursor: pointer;
${mobile({width:"20%"})};
${smallMobile({width:"40%"})};
`

const Hr = styled.hr`
background-color:#e80c0c;
border:none;
height: 1px;`

const Divloader = styled.div`
    display: none;
    justify-content: center;
    align-items:center;
    position: absolute;
    top:20%;
    left:46%;
    display: none;
    ${mobile({ top: "18%", left: "40%" })};
     ${smallMobile({ top: "18%", left: "35%" })}
`
const AlertContainer = styled.div`
     width: 80%;
     height: 50px;
     display:none;
     margin: auto;
     ${mobile({ height: "25px" })};
     ${smallMobile({ height: "25px" })}
`

const Order = () => {
  const { currentUser, stayUser } = useSelector(state => state.user)
  const [orders, setOrders] = useState([])
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const { loaderDisplay,alertDisplay,alertResult,errMsg } = useSelector(state => state.loader)

  const ordersAll = async () => {
    dispatch(addLoaderDisplay('flex'))
    // const host = "http://localhost:5000"
    const host = process.env.REACT_APP_BASE_URL 
    const response = await fetch(`${host}/api/orders/getorder/${currentUser.email}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': stayUser === true ? localStorage.getItem("token") : sessionStorage.getItem("token")
      },

    })
    if (response.status >= 200 && response.status <= 299) {
      const orders = await response.json()
      setOrders(orders.reverse())
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
    ordersAll()
  }, [])



  function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  const checkout = async (total) => {
    // const host = "http://localhost:5000"
    const host = process.env.REACT_APP_BASE_URL 
    const response = await fetch(`${host}/api/payments/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': stayUser === true ? localStorage.getItem("token") : sessionStorage.getItem("token")
      },
      body: JSON.stringify({
        "total": total*100, 
        "receipt": "pritamdupare440@gmail.com",
      })
    })
    if (response.status >= 200 && response.status <= 299) {
      const order = await response.json()
      sessionStorage.setItem("id", order.order.id)
      navigate('/checkout/rePay');
      dispatch(orderRePay(total))
    } else {
      const json = await response.json()
      console.log(json)

    }

  }
  const handlePay=(total)=>{
      checkout(total);
  }
  return (
    <>
      <Container>
        <Announcement />
        <Navbar />
        <AlertContainer style={{display:alertDisplay}}>
        <Alert variant="filled" severity={`${alertResult}`}>
          {alertResult === 'success' ? "Orders fetched successfully." : `${errMsg?errMsg:"Something went wrong..."}`}
        </Alert>
      </AlertContainer>
        <Title>Your Orders</Title>
        <Divloader style={{ display: loaderDisplay }}>
        <RotatingLines
          strokeColor="green"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
        />
      </Divloader>
        {orders.length !== 0 && orders.map((order) => {
          return <>
            <Wrapper>
              <OrderInfo>
                <OrderId>OrderId: {order._id}</OrderId>
                <OrderAmount>Order Amount: {order.amount} Rupees</OrderAmount>
                <OrderStatus> Order Status:  <OrderSpan status={order.status}> {order.status}</OrderSpan> </OrderStatus>
              </OrderInfo>
              {order.products.map((product) => {
                return <>
                  <ProductContainer>
                    <Product>
                      <Left>
                        <ImageContainer>
                          <ProductImage src={`data:image/png;base64,${product.productImage && arrayBufferToBase64(product.productImage.data)}`}></ProductImage>
                        </ImageContainer>
                      </Left>
                      <Right>
                        <ProductTitle>{product.productTitle}</ProductTitle>
                        <ProductInfo>
                          <ProductColor color={product.color}></ProductColor>
                          <ProductSize>Size: {product.size}</ProductSize>
                          <ProductQuantity>Quantity: {product.quantity}</ProductQuantity>
                        </ProductInfo>
                      </Right>
                    </Product>
                  </ProductContainer>
                  <Hr style={{ width: "50%", margin: "auto" }}></Hr>
                </>
              })}
              <AmountInfo>
                <AmountStatus> Amount Paid Status : <Span status={order.amountPaid}>{order?.amountPaid[0]?.toUpperCase() + order?.amountPaid.slice(1,)}</Span></AmountStatus>
                <PayButton status={order.amountPaid} onClick={()=>handlePay(order.amount)}>Pay</PayButton>
              </AmountInfo>
              <Hr></Hr>
            </Wrapper>

          </>
        })}

        <Newsletter />
        <Footer />
      </Container>
    </>

  )
}

export default Order