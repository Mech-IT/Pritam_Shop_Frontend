import styled from "styled-components"
import { mobile, smallMobile, tablet } from "../responsive"
import { useRef, useState, } from "react"
import { login } from "../redux/apiCalls"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import Progress from "../components/Progress"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"


const Container = styled.div`
width: 100vw;
height: 100vh;
display: flex;
align-items:center;
justify-content: center;
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
}`


const Wrapper = styled.div`
padding: 20px;
width:25%;
background-color: white;
${mobile({ width: "75%" })};
${smallMobile({ width: "75%" })};
${tablet({ width: "75%" })};
`

const Title = styled.h1`
text-align:center;
font-size: 24px;
font-weight: 300;`

const Form = styled.form`
display:flex;
flex-direction:column;
`

const Input = styled.input`
flex:1;
min-width:40%;
margin: 10px 0px;
padding: 10px;
${mobile({ margin: "12px 0px" })}
`
const Div = styled.div`
  min-width:40%;
  margin: 10px;
`
const InputCheck=styled.input`
  margin-right: 10px;
`
const Label = styled.label`
  
`
const Button = styled.button`
width:40%;
border:none;
padding: 15px 20px;
background-color:teal;
color: white;
cursor: pointer;
margin-bottom: 10px;
&:disabled{
  color:green;
  cursor: not-allowed;
}
${mobile({ width: "50%" })}
${smallMobile({ width: "60%" })}
`
const Error = styled.p`
  color: red;
`
const MenuItem = styled.div`
margin:5px 0px;
font-size:12px;
text-decoration:underline;
cursor: pointer;`

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { error } = useSelector(state => state.user)
  const ref=useRef()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    login(dispatch, { email, password }, navigate,ref.current.checked)
  }
  
  
  return (
    <>
      <Progress />
      <Container>
        <Wrapper>
          <Title>SIGN IN </Title>
          <Form onSubmit={handleSubmit}>
            <Input placeholder="Email" type='text' onChange={(e) => { setEmail(e.target.value) }}></Input>
            <Input placeholder="Password" type='password' onChange={(e) => { setPassword(e.target.value) }}></Input>
            <Div>
              <InputCheck type='checkbox' ref={ref}></InputCheck>
              <Label>Keep me Sign In</Label>
            </Div>
            <Button type="submit">SIGN IN</Button>
            {error && <Error>Something Went Wrong...</Error>}
            <Link to="/fPassword" style={{ textDecoration: "none", color: "inherit" }}><MenuItem>FORGOT PASSWORD</MenuItem></Link>
            <Link to="/register" style={{ textDecoration: "none", color: "inherit" }}><MenuItem>CREATE A NEW ACCOUNT</MenuItem></Link>
          </Form>
        </Wrapper>
      </Container>
    </>
  )
}

export default Login