
import { Badge } from "@mui/material"
import styled from "styled-components"
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { mobile } from "../responsive"
import { smallMobile } from "../responsive"
import { tablet } from "../responsive"
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/apiCalls"
import { reset, setImage, setName } from "../redux/userRedux";
import { useEffect } from "react";
import Avatar from '@mui/material/Avatar';
import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';

const Container = styled.div`
    height: 60px;  
    ${mobile({ height: "50px" })}
   
`
const Wrapper = styled.div`
    padding: 10px 20px;
    display:flex;
    justify-content:space-between;
    align-items: center;
    ${mobile({ padding: "5px 0px" })}
    ${smallMobile({ padding: "5px 0px" })}
    ${tablet({ padding: "8px 0px" })}
`
const Left = styled.div`
flex:1;
display:flex;
align-items:center;
`

const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const Image=styled.img`
    width: 40px;
    height: 40px;
    object-fit: cover;
    ${mobile({width:"25px",height:"25px" })}
    ${smallMobile({width:"25px",height:"25px" })}
`

const Welcome=styled.h3`
    ${mobile({ fontSize:"15px" })}
    ${smallMobile({fontSize:"15px"})}
`

const Center = styled.div`
  flex:1;
  text-align:center;
`
const Logo = styled.h1`
    font-weight:bold;
    ${mobile({ fontSize: "24px" })}
    ${smallMobile({ fontSize: "12px",marginLeft:"5px" })}
    ${tablet({ fontSize: "34px", marginLeft: '13px' })}
`
const Right = styled.div`
flex:1;
display:flex;
align-items: center;
justify-content: flex-end;
${smallMobile({ flex: 2, justifyContent: 'space-evenly' })}
${tablet({ marginRight: '15px' })}
`
const MenuItemd = styled.div`
    font-size:14px;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    gap:10px;
    margin-left:25px;
    text-decoration: none;
    ${mobile({ fontSize: '12px', marginLeft: '8px',gap:"1px"})}
    ${smallMobile({ fontSize: '8px', marginLeft: '5px',gap:"1px" })}
    ${tablet({ fontSize: '15px', marginLeft: '8px' })}
`
const Navbar = () => {
    const quantity = useSelector(state => state.cart.cartQuantity)
    const { currentUser, stayUser, userImage, name } = useSelector(state => state.user)
    const navigate = useNavigate();
    const dispatch = useDispatch()
    stayUser === false && sessionStorage.getItem("token") === null && dispatch(reset());
    const handleLogout = () => {
        logout(dispatch, null, navigate)
    }
    const getUser = async () => {
        // const host = "http://localhost:5000"
        const host = process.env.REACT_APP_BASE_URL 
        const response = await fetch(`${host}/api/users/getuser/${currentUser.email}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': stayUser === true ? localStorage.getItem("token") : sessionStorage.getItem("token")
            },

        })
        if (response.status >= 200 && response.status <= 299) {
            const user = await response.json()
            dispatch(setName(user.name))
            dispatch(setImage(user.image.data))

        } else {
            const json = await response.json()
            console.log(json)

        }

    }
    useEffect(() => {
        !name && getUser()
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

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Container>
            <Wrapper>
                <Left>
                    <SearchContainer>
                        <Image src="https://i.ibb.co/xHqzLjd/download-1.jpg"></Image>
                        <Welcome>{`Welcome ${name.split(" ")[0]}`}</Welcome>
                    </SearchContainer>
                </Left>
                <Center>
                    <Link to="/" style={{ textDecoration: "none" }}><Logo>PritamShop</Logo></Link>
                </Center>
                <Right>
                    {!currentUser && <Link to="/register" style={{ textDecoration: "none", color: "inherit" }}><MenuItemd>SIGN UP</MenuItemd></Link>}
                    {!currentUser && <Link to="/login" style={{ textDecoration: "none", color: "inherit" }}><MenuItemd>SIGN IN</MenuItemd></Link>}
                    {currentUser && <MenuItemd onClick={handleLogout}>SIGN OUT</MenuItemd>}
                    <MenuItemd>
                        <Badge badgeContent={quantity} color="secondary" anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}>
                            <ShoppingCartOutlinedIcon sx={{ width: 30, height: 30 }} onClick={() => { navigate("/cart") }}></ShoppingCartOutlinedIcon>
                        </Badge>
                        <Tooltip title="Account settings">
                            <IconButton
                                onClick={handleClick}
                                size="small"
                                sx={{ ml: 2}}
                                aria-controls={open ? 'account-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                            >
                                <Avatar alt={`${name}`} src={`data:image/png;base64,${userImage && arrayBufferToBase64(userImage)}`} sx={{ width: 30, height: 30 ,display:currentUser?"block":"none"}} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={open}
                            onClose={handleClose}
                            onClick={handleClose}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&:before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                           
                            <MenuItem>
                                <ListItemIcon>
                                    <PersonIcon fontSize="small" />
                                </ListItemIcon>
                                {name && name}  
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon>
                                    <EmailIcon fontSize="small" />
                                </ListItemIcon>
                                {currentUser && currentUser.email}  
                            </MenuItem>
                            <MenuItem onClick={()=>{navigate("/orders")}}>
                                <ListItemIcon>
                                    <ShoppingBagIcon fontSize="small" />
                                </ListItemIcon>
                                Your Orders
                            </MenuItem>
                            <MenuItem onClick={()=>{navigate("/chPassword")}}>
                                <ListItemIcon>
                                    <PasswordIcon fontSize="small" />
                                </ListItemIcon>
                                Change Password 
                            </MenuItem>
                            <MenuItem onClick={handleLogout}>
                                <ListItemIcon>
                                    <Logout fontSize="small" />
                                </ListItemIcon>
                                Sign Out 
                            </MenuItem>
                        </Menu>
                    </MenuItemd>

                </Right>
            </Wrapper>

        </Container >
    )
}

export default Navbar