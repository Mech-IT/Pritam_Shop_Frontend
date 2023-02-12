import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { set } from '../redux/cartRedux';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Container = styled.div`
    height:99vh;
    width: 99%;
    overflow-x: hidden;
    display: flex;
    justify-content:center;
    align-items: center;
    flex-direction:column;
    &::before{
background:url("https://images.pexels.com/photos/6407773/pexels-photo-6407773.jpeg?auto=compress&cs=tinysrgb&w=600") no-repeat center center/cover;
content: "";
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
z-index: -1;
opacity: 0.4;
}
`
const Button = styled.button`
font-size:50px;
border-radius:5px;
cursor: pointer;
:hover{
    background-color: #e7a4a4;
    font-weight:bold;
}`

const Span = styled.span`
color:green;
margin:3px 0px;
font-weight:bold;`

const Checkout = () => {
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch();
    const { product, orderId, totalRePay } = useSelector(state => state.order)
    const { currentUser, stayUser, name } = useSelector(state => state.user)
    const location = useLocation()
    const path = location.pathname.split("/")[2]
    const navigate = useNavigate();

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        navigate("/orders")
    };

    const options = {
        "key": `${process.env.REACT_APP_RAZORPAY_KEY_ID}`, // Enter the Key ID generated from the Dashboard
        "amount": `${path === "order" ? product.price * product.quantity * 100 : path === "cart" ? cart.total * 100 :(totalRePay*100)}`, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "Pritam Shop",
        "description": "payment for your orders",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ18fxZ4Sszq65Sn6jmQ1Zb5BTt82spNIB9lg&usqp=CAU",
        "order_id": sessionStorage.getItem("id"), //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler": async (response) => {
            // const host = "http://localhost:5000"
            const host = process.env.REACT_APP_BASE_URL 
            const res = await fetch(`${host}/api/payments/success`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': stayUser === true ? localStorage.getItem("token") : sessionStorage.getItem("token")
                },
                body: JSON.stringify({
                    details: response
                })
            })
            if (res.status >= 200 && res.status <= 299) {
                const json = await res.json()
                const updateOrder = async () => {
                    // const host = "http://localhost:5000"
                    const host = process.env.REACT_APP_BASE_URL 
                    const response = await fetch(`${host}/api/orders/updateorder/${orderId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'auth-token': stayUser === true ? localStorage.getItem("token") : sessionStorage.getItem("token")
                        },
                        body: JSON.stringify({
                            amountPaid: "successful"
                        })
                    })
                    if (response.status >= 200 && response.status <= 299) {
                        return true

                    } else {
                        const json = await response.json()
                        console.log(json)
                        return false

                    }

                }
                const response = await updateOrder();
                const deleteCarts = async (email) => {
                    // const host = "http://localhost:5000"
                    const host = process.env.REACT_APP_BASE_URL 
                    const response = await fetch(`${host}/api/carts/deleteallcarts/${email}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'auth-token': stayUser === true ? localStorage.getItem("token") : sessionStorage.getItem("token")
                        }
                    })
                    if (response.status >= 200 && response.status <= 299) {
                        return true

                    } else {
                        const json = await response.json()
                        console.log(json)
                        return false

                    }
                }
                const responseC = path === "cart" && await deleteCarts(currentUser.email);
                responseC && dispatch(set());
                response && navigate("/success");
                !response && handleClickOpen()

            } else {
                const json = await res.json()
                alert("retry payment")

            }

        },
        "prefill": {
            "name": `${name}`,
            "email": `${currentUser.email}`,

        },
        "notes": {
            "address": "Pritam Shop Corporate Office"
        },
        "theme": {
            "color": "#3399cc"
        }
    };
    var rzp1 = new window.Razorpay(options);

    const handlePayment = (e) => {
        rzp1.open();
        e.preventDefault();
    }
    return (
        <Container>
            <Button onClick={handlePayment}>{`PAY Rs.${path === "order" ? product.price * product.quantity : path === "cart" ? cart.total : totalRePay}`}</Button>
            <Span>Click on pay button to proceed for payment</Span>
            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Server Issue..."}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Due to server issue your amount paid status is still pending and if money deducted from your account then wait for atleast 3 hours our team will resolve it. After 3 hours go to your orders section and see amount paid status for respective order if it is still pending then call 0188 to resolve issue.
                            And if money not deducted from your account then go to your orders section and pay using pay button for respective order. 
                            We sincerely regret for the inconvenience!
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Ok</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </Container>
    )
}

export default Checkout