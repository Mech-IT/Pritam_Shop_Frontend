import Announcement from "../components/Announcement"
import Categories from "../components/Categories"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import Newsletter from "../components/Newsletter"
import Products from "../components/Products"
import Slider from "../components/Slider"
import styled from "styled-components"
import { RotatingLines } from 'react-loader-spinner'
import { mobile, smallMobile, tablet } from "../responsive"
import { useSelector } from "react-redux"

const Divloader = styled.div`
    display: none;
    justify-content: center;
    align-items:center;
    position: absolute;
    top:190%;
    left:46%;
    display: none;
    ${mobile({ top: "220%", left: "40%" })};
     ${smallMobile({ top: "160%", left: "35%" })}
`


const Home = () => {
    const { loaderDisplay} = useSelector(state => state.loader)
    return (
        <div>
            <Announcement />
            <Navbar />
            <Slider />
            <Categories />
            <Divloader style={{ display: loaderDisplay }}>
                <RotatingLines
                    strokeColor="green"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="96"
                    visible={true}
                />
            </Divloader>
            <Products cat="" />
            <Newsletter />
            <Footer />
        </div>
    )
}

export default Home