import React, { useState } from 'react'
import styled from 'styled-components'
import { mobile, smallMobile, tablet } from "../responsive"
import { RotatingLines } from 'react-loader-spinner'
import Alert from '@mui/material/Alert';
import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addOrderId } from '../redux/orderRedux';

const Container = styled.div`
width: 100vw;
height: 100vh;
position: relative;
display: flex;
align-items:center;
justify-content: center;
flex-direction: column;
overflow:hidden;
&::before{
background:url("https://i.ibb.co/WBsRr7r/pexels-ksenia-chernaya-3965545.jpg") no-repeat center center/cover;
content: "";
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 200%;
z-index: -1;
opacity: 0.4;
}
${mobile({ height: "115vh" })};
${smallMobile({ height: "115vh" })};`

const AlertContainer = styled.div`
     width: 80%;
     height: 50px;
     display:none;
     margin: auto;
     ${mobile({ height: "25px" })};
     ${smallMobile({ height: "25px" })}
`
const Divloader = styled.div`
    display: flex;
    justify-content: center;
    align-items:center;
    position: absolute;
    top:40%;
    left:46%;
    display: none;
    ${mobile({ top: "40%", left: "40%" })};
     ${smallMobile({top:"40%",left:"35%"})}
`

const Wrapper = styled.div`
padding: 20px;
display: flex;
flex-direction: column;
width:40%;
background-color: white;
${mobile({ width: "75%",margin:"10px 0px", padding: "12px" })};
${smallMobile({ width: "75%", margin:"10px 0px",padding: "8px" })};
${tablet({ width: "75%" })};`

const Title = styled.h1`
text-align:center;
font-size: 24px;
font-weight: 300;
${mobile({ fontSize: "17px" })};
${smallMobile({ fontSize: "12px" })}`

const Payment = () => {
    const [result, setResult] = useState("")
    const dispatch=useDispatch()
    const navigate = useNavigate();
    const location = useLocation()
    const path = location.pathname.split("/")[2]
    const { currentUser, stayUser } = useSelector(state => state.user);
    const { product } = useSelector(state => state.order);
    const cart = useSelector(state => state.cart)
    const [order, setOrder] = useState({ userMobile: "", city: "", state: "", location: "", pinCode: "" })

    const handleChange = (e) => {
        setOrder({ ...order, [e.target.name]: e.target.value })

    }

    const finalProducts = []
    cart.products.forEach((item) => { finalProducts.push({ productTitle: item.title,productImage:item.image.data, quantity: item.quantity,color:item.color,size:item.size }) })

    const handleSubmit = async(e) => {
        e.preventDefault();
        document.getElementById('loaderP').style.display = 'flex'
        document.getElementById('mainP').style.opacity = 0.5
        const addOrder = async () => {
            // const host = "http://localhost:5000"
            const host = process.env.REACT_APP_BASE_URL 
            const response = await fetch(`${host}/api/orders/createorder`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': stayUser === true ? localStorage.getItem("token") : sessionStorage.getItem("token")
                },
                body: JSON.stringify({
                    userEmail: currentUser.email,
                    userMobile: order.userMobile,
                    products: path === "order" ? [{ productTitle: product.title,productImage:product.image, quantity: product.quantity,color:product.color,size:product.size}] : finalProducts,
                    amount: path === "order" ? product.price * product.quantity : cart.total,
                    address: { city: order.city, state: order.state, location: order.location, pinCode: order.pinCode }

                })
            })
            if (response.status >= 200 && response.status <= 299) {
                const order = await response.json()
                 dispatch(addOrderId(order._id))
                 return true

            } else {
                const json = await response.json()
                console.log(json)
                document.getElementById('loaderP').style.display = 'none'
                document.getElementById('mainP').style.opacity = 1;
                setResult("error")
                document.getElementById('alertP').style.display = 'block'
                setTimeout(() => {
                    document.getElementById('alertP').style.display = 'none'
                }, 3000);
                return false 

            }

        }

        const checkout = async () => {
            // const host = "http://localhost:5000"
            const host = process.env.REACT_APP_BASE_URL 
            const response = await fetch(`${host}/api/payments/checkout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': stayUser === true ? localStorage.getItem("token") : sessionStorage.getItem("token")
                },
                body: JSON.stringify({
                    "total": path === "order" ? (product.price * product.quantity) * 100 : cart.total * 100,
                    "receipt": "pritamdupare440@gmail.com",
                })
            })
            if (response.status >= 200 && response.status <= 299) {
                const order = await response.json()
                sessionStorage.setItem("id", order.order.id)
                path==="order" && navigate('/checkout/order');
                path==="cart" && navigate('/checkout/cart');
              

            } else {
                const json = await response.json()
                console.log(json)

            }

        }
        const response= await addOrder();
        response===true && checkout();
    }
    return (
        <>
            <Navbar />
            <Container>
                <AlertContainer id='alertP'>
                    <Alert variant="filled" severity={`${result}`}>
                        {result === 'success' ? "Order Placed successfully." : "Something Went Wrong..."}
                    </Alert>
                </AlertContainer>
                <Divloader id='loaderP'>
                    <RotatingLines
                        strokeColor="green"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="96"
                        visible={true}
                    />
                </Divloader>
                <Wrapper id='mainP'>
                    <form className="row g-3" onSubmit={handleSubmit}>
                        <Title>{`Pay Rs. ${path === "order" ? product.price * product.quantity : cart.total} For Your Order`}</Title>
                        <div className="col-md-6">
                            <label htmlFor="inputEmail4" className="form-label">Email</label>
                            <input type="email" className="form-control" name="userEmail" id="inputEmail4" value={currentUser.email} disabled required />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputPassword4" className="form-label">Mobile</label>
                            <input type="number" className="form-control" name="userMobile" id="inputPassword4" onChange={handleChange} required pattern='^[6-9]\d{9}$' />
                        </div>
                        <div className="col-12">
                            <label htmlFor="inputAddress" className="form-label">Address</label>
                            <input type="text" className="form-control" id="inputAddress" name='location' placeholder="1234 Main St" onChange={handleChange} required />
                        </div>
                        <div className="col-12">
                            <label htmlFor="inputAddress2" className="form-label">Address 2</label>
                            <input type="text" className="form-control" id="inputAddress2" name='location' placeholder="Apartment, studio, or floor"
                                onChange={handleChange} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputCity" className="form-label">City</label>
                            <input type="text" className="form-control" id="inputCity" name='city' onChange={handleChange} required />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="inputState" className="form-label">State</label>
                            <select id="inputState" className="form-select" onChange={handleChange} name='state' required>
                                <option selected>Choose...</option>
                                <option value="Andhra Pradesh">Andhra Pradesh</option>
                                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                <option value="Assam">Assam</option>
                                <option value="Bihar">Bihar</option>
                                <option value="Chhattisgarh">Chhattisgarh</option>
                                <option value="Goa">Goa</option>
                                <option value="Gujarat">Gujarat</option>
                                <option value="Haryana">Haryana</option>
                                <option value="Himachal Pradesh">Himachal Pradesh</option>
                                <option value="Jharkhand">Jharkhand</option>
                                <option value="Karnataka">Karnataka</option>
                                <option value="Kerala">Kerala</option>
                                <option value="Madhya Pradesh">Madhya Pradesh</option>
                                <option value="Maharashtra">Maharashtra</option>
                                <option value="Manipur">Manipur</option>
                                <option value="Meghalaya">Meghalaya</option>
                                <option value="Mizoram">Mizoram</option>
                                <option value="Nagaland">Nagaland</option>
                                <option value="Odisha">Odisha</option>
                                <option value="Punjab">Punjab</option>
                                <option value="Rajasthan">Rajasthan</option>
                                <option value="Sikkim">Sikkim</option>
                                <option value="Tamil Nadu">Tamil Nadu</option>
                                <option value="Telangana">Telangana</option>
                                <option value="Tripura">Tripura</option>
                                <option value="Uttar Pradesh">Uttar Pradesh</option>
                                <option value="Uttarakhand">Uttarakhand</option>
                                <option value="West Bengal">West Bengal</option>
                                <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                                <option value="Chandigarh">Chandigarh</option>
                                <option value="Dadra & Nagar Haveli and Daman & Diu">Dadra & Nagar Haveli and Daman & Diu</option>
                                <option value="Delhi">Delhi</option>
                                <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                                <option value="Lakshadweep">Lakshadweep</option>
                                <option value="Puducherry">Puducherry</option>
                                <option value="Ladakh">Ladakh</option>
                            </select>
                        </div>
                        <div className="col-md-2">
                            <label htmlFor="inputZip" className="form-label">Zip</label>
                            <input type="number" className="form-control" id="inputZip" name='pinCode' onChange={handleChange} required />
                        </div>
                        <div className="col-12">
                            <button type="submit" className="btn btn-primary">Placed Order</button>
                        </div>
                    </form>
                </Wrapper>
            </Container>
        </>
    )
}

export default Payment