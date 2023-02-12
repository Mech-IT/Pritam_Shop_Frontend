import React, { useState, useRef } from 'react'
import { useNavigate } from "react-router-dom";
import styled from 'styled-components'
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { mobile, smallMobile, tablet } from "../responsive"
import { RotatingLines } from 'react-loader-spinner'
import Alert from '@mui/material/Alert';
import MojoAuth from "mojoauth-web-sdk"

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

const Title = styled.h1`
text-align:center;
font-size: 24px;
font-weight: 300;
${mobile({ fontSize: "17px" })};
${smallMobile({ fontSize: "12px" })}`

const Left = styled.div`
flex:1;
text-align:center;
margin-bottom: 10px;
${mobile({ marginBottom: '5px', display: "none" })}
${smallMobile({ marginBottom: '5px', display: "none" })}`

const Image = styled.img`
width: 100px;
height: 100px;
border-radius:50%;
object-fit:cover;
${mobile({ width: "60px", height: "60px", display: "none" })};
${smallMobile({ width: "50px", height: "50px", display: "none" })}`

const Right = styled.div`
flex:2;
`


const Form = styled.form`
display:flex;
flex-wrap:wrap;
align-items:center;
justify-content: center;
`

const FormInput = styled.div`
width: 40%;
margin: 10px;
display: flex;
justify-content: center;
flex-direction: column;
align-items:"center";
${mobile({ width: '100%', margin: "7px" })}
${smallMobile({ width: '100%', margin: "5px" })}
`

const Label = styled.label`
display:flex;
align-items:center;
gap:10px;`

const Input = styled.input`
flex:1;
min-width:40%;
padding: 5px;
${mobile({ padding: "3px" })};
${smallMobile({ padding: "1px" })}
`

const Div = styled.div`
width: 100%;
`

const Agreement = styled.div`
font-size: 12px;
min-width:40%;
margin:20px 0px;
${mobile({ marginBottom: "10px" ,fontSize:"6px"})}    
${smallMobile({ marginBottom: "10px",fontSize:"5px"})}`

const Button = styled.button`
width:40%;
border:none;
padding: 15px 20px;
background-color:teal;
color: white;
cursor: pointer;
${mobile({ padding: "11px 15px" })}    
${smallMobile({ padding: "8px 10px" })}
`

const Register = () => {
    const [result, setResult] = useState("")
    const [errMsg, setErrMsg] = useState({})
    const [payload, setPayload] = React.useState(null)
    const [file, setFile] = useState(null)
    const [user, setUser] = useState({ name: "", email: "", password: "", image: "" })
    const navigate = useNavigate();
    const ref = useRef()
    const handleImage = (e) => {
        setFile(e.target.files[0])
    }
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
        e.target.name === "image" && handleImage(e)
    }


    React.useEffect(() => {
        document.getElementById('mainN').style.display = 'none'
        const mojoauth = new MojoAuth(`${process.env.REACT_APP_MOJO_AUTH_KEY}`, {
            source: [{ type: 'email', feature: 'magiclink' }]
        });
        mojoauth.signIn().then(payload => {
            setPayload(payload)
            console.log(payload);
            document.getElementById("mojoauth-passwordless-form").remove();
            document.getElementById('mainN').style.display = 'block'
            setUser({ name: "", email: payload.user.identifier, password: "", image: "" })
        })
    }, [])


    const handleSubmit = async (e) => {

        e.preventDefault()
        if (!ref.current.checkValidity()) {
            e.preventDefault()
            e.stopPropagation()
        }
        else {

            const form_Data=new FormData(ref.current)
            form_Data.append('email',`${payload.user.identifier}`)
            document.getElementById('loaderN').style.display = 'flex'
            document.getElementById('mainN').style.opacity = 0.5
            // const host = "http://localhost:5000"
            const host = process.env.REACT_APP_BASE_URL 
            const response = await fetch(`${host}/api/auth/createuser`, {
                method: 'POST',
                body: form_Data,
            })
            if (response.status >= 200 && response.status <= 299) {
                document.getElementById('loaderN').style.display = 'none'
                setResult("success")
                document.getElementById('alertN').style.display = 'block'
                setTimeout(() => {
                    document.getElementById('alertN').style.display = 'none'
                    navigate("/login")
                }, 3000);
            } else {
                const json = await response.json()
                console.log(json)
                setErrMsg(json)
                document.getElementById('loaderN').style.display = 'none'
                document.getElementById('mainN').style.opacity = 1;
                setResult("error")
                document.getElementById('alertN').style.display = 'block'
                setTimeout(() => {
                    document.getElementById('alertN').style.display = 'none'
                }, 3000);
            }
        }
        ref.current.classList.add('was-validated')
    }



    return (
        <>
            <Container>
                <AlertContainer id='alertN'>
                    <Alert variant="filled" severity={`${result}`}>
                        {result === 'success' ? "User added successfully." : errMsg.error && errMsg.error.search("email") ? errMsg.error : "Something Went Wrong..."}
                    </Alert>
                </AlertContainer>
                <Divloader id='loaderN'>
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
                <pre style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                    <Wrapper id='mainN'>
                        <Title>CREATE AN ACCOUNT</Title>
                        <Left>
                            <Image src={file ? URL.createObjectURL(file) : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrJgwdOAjqaZGS7kn35IVm_ZN6E4XFuJ7V_g&usqp=CAU'} alt='User Image'></Image>
                        </Left>
                        <Right>
                            <Form className='needs-validation' ref={ref} onSubmit={handleSubmit} noValidate onInput='confirmPassword.setCustomValidity(confirmPassword.value != newPassword.value ? true : false)' enctype="multipart/form-data">
                                <FormInput>
                                    <Label htmlFor='file'>Your Photo <DriveFolderUploadIcon style={{ cursor: "pointer" }} /></Label>
                                    <Input type="file" id='file' name='image' onChange={handleChange} ></Input>
                                </FormInput>
                                <FormInput>
                                    <Label>Name</Label>
                                    <Input type="text" placeholder="Shubham Smith" onChange={handleChange} id="name" name="name" required pattern='[A-Za-z\s]{3,}'></Input>
                                    <Div className="invalid-feedback">
                                        Name must be at least 3 characters long.(Only Alphabets)
                                    </Div>
                                </FormInput>
                                <FormInput>
                                    <Label>Email</Label>
                                    <Input type="email" placeholder="smithshubham12@yourmail.com" id="email" name="email" onChange={handleChange} required disabled value={payload && payload.user.identifier} ></Input>
                                </FormInput>
                                <FormInput>
                                    <Label>Password</Label>
                                    <Input type="password" id="password" name="password" onChange={handleChange} pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@$#!%*?&]{8,}$" required></Input>
                                    <Div className="invalid-feedback">
                                        Password must contain at least one Uppercase letter and one Smallcase letter and one Number and one Special character.
                                    </Div>
                                </FormInput>
                                <FormInput>
                                    <Label>Confirm Password</Label>
                                    <Input type="password" id="confirmPassword" name="confirmPassword" onChange={handleChange} pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@$#!%*?&]{8,}$" required ></Input>
                                    <Div className="invalid-feedback">
                                        Password do not match.
                                    </Div>
                                </FormInput>
                                <Agreement>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor <strong>PRIVACY POLICY</strong></Agreement>
                                <Button type="submit"> Sign up</Button>
                            </Form>
                        </Right>
                    </Wrapper>
                </pre>
            </Container >
        </>
    )
}

export default Register