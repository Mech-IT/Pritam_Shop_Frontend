import React, { useState, useRef } from 'react'
import { useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';
import MojoAuth from "mojoauth-web-sdk"
import { RotatingLines } from 'react-loader-spinner'
import styled from 'styled-components'
import { mobile, smallMobile, tablet } from "../responsive"

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
height: 100%;
z-index: -1;
opacity: 0.4;
}
`
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
     ${smallMobile({ height: "25px" })}
`
const Wrapper = styled.div`
padding: 20px;
display: flex;
flex-direction: column;
width:40%;
background-color: white;
${mobile({ width: "75%", height: "83vh", padding: "12px" })};
${smallMobile({ width: "75%", height: "83vh", padding: "8px" })};
${tablet({ width: "75%" })};`

const Changepassword = () => {
    const [user, setUser] = useState({ password: "" })
    const { stayUser } = useSelector(state => state.user);
    const [payload, setPayload] = React.useState(null)
    const [result, setResult] = useState("")
    let navigate = useNavigate()
    const ref = useRef()
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }


    React.useEffect(() => {
        document.getElementById('mainCH').style.display = 'none'
        const mojoauth = new MojoAuth(`${process.env.REACT_APP_MOJO_AUTH_KEY}`, {
            source: [{ type: 'email', feature: 'magiclink' }]
        });
        mojoauth.signIn().then(payload => {
            setPayload(payload)
            document.getElementById("mojoauth-passwordless-form").remove();
            document.getElementById('mainCH').style.display = 'block'
        })
    }, [])

    const handlechpassword = async (e) => {
        e.preventDefault()
        if (!ref.current.checkValidity()) {
            e.preventDefault()
            e.stopPropagation()
        }
        else {
            document.getElementById('loaderCH').style.display = 'flex'
            document.getElementById('mainCH').style.opacity = 0.5
            // const host = "http://localhost:5000"
            const host = process.env.REACT_APP_BASE_URL 
            const response = await fetch(`${host}/api/users/changepassword`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': stayUser === true ? localStorage.getItem("token") : sessionStorage.getItem("token")
                },
                body: JSON.stringify(user)
            })
            if (response.status >= 200 && response.status <= 299) {
                document.getElementById('loaderCH').style.display = 'none'
                setResult("success")
                document.getElementById('alertCH').style.display = 'block'
                setTimeout(() => {
                    document.getElementById('alertCH').style.display = 'none'
                    navigate("/login")
                }, 3000);
            } else {
                const json = await response.json()
                console.log(json)
                document.getElementById('loaderCH').style.display = 'none'
                document.getElementById('mainCH').style.opacity = 1;
                setResult("error")
                document.getElementById('alertCH').style.display = 'block'
                setTimeout(() => {
                    document.getElementById('alertCH').style.display = 'none'
                }, 3000);
        
            }
        }
        ref.current.classList.add('was-validated')

    }
    return (
        <>

            <Navbar />
            <Container>
                <AlertContainer id='alertCH'>
                    <Alert variant="filled" severity={`${result}`}>
                        {result === 'success' ? "Password has changed successfully." : "Something Went Wrong..."}
                    </Alert>
                </AlertContainer>
                <Divloader id='loaderCH'>
                    <RotatingLines
                        strokeColor="green"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="96"
                        visible={true}
                    />
                </Divloader>
                <div id="mojoauth-passwordless-form" className="mx-1 my-1">
                </div>
                <pre style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor:"gray" }}>
                    <div className='container my-2 ' id='mainCH' >
                        <h2 className='text-center my-5' >Welcome To Pritam-Shop</h2>
                        <h3 className='text-center my-5'>Change Password</h3>
                        <form className='needs-validation' ref={ref} onSubmit={handlechpassword} noValidate oninput='confirmPassword.setCustomValidity(confirmPassword.value != newPassword.value ? true : false)'>
                            <div className="row mb-3 container">
                                <div className="col-sm-10 container">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label"> New Password</label>
                                    <input type="password" className="form-control" id="password" name="password"  onChange={handleChange} required pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@$#!%*?&]{8,}$" />
                                    <div className="invalid-feedback">
                                        Password must contain at least one Uppercase letter and one Smallcase letter and one Number and one Special character.
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-3 container">
                                <div className="col-sm-10 container">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Confirm Password</label>
                                    <input type="password" className="form-control" id="confirmPassword" name="confirmPassword"  onChange={handleChange} required pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@$#!%*?&]{8,}$" />
                                    <div className="invalid-feedback">
                                        Password do not match.
                                    </div>
                                </div>
                            </div>
                            <div className='row mb-3 container'>
                                <div className="col-sm-10 container">
                                    <button type="submit" className="btn btn-primary align-self-center" >Change Password</button>
                                </div>
                            </div>
                        </form>
                    </div>
              
                </pre>
            </Container>
        </>
    )
}

export default Changepassword