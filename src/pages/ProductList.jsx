import styled from "styled-components"
import Navbar from "../components/Navbar"
import Announcement from "../components/Announcement"
import Products from "../components/Products"
import Newsletter from "../components/Newsletter"
import Footer from "../components/Footer"
import { mobile, smallMobile, tablet } from "../responsive"
import { useState } from "react";
import { useLocation } from "react-router-dom"
import { RotatingLines } from 'react-loader-spinner'
import { useSelector } from "react-redux"
import { Alert } from "@mui/material"
const Container = styled.div``

const Title = styled.h1`
margin: 20px;`

const FilterContainer = styled.div`
display:flex;
justify-content:space-between;`

const Filter = styled.div`
margin: 20px;
${mobile({ width: "0px 20px", display: 'flex', flexDirection: 'column' })}
${smallMobile({ width: "0px 20px", display: 'flex', flexDirection: 'column' })}
${tablet({ width: "0px 20px", display: 'flex', flexDirection: 'column' })}`

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
  ${smallMobile({ marginRight: "0px" })}
  ${tablet({ marginRight: "0px" })}
`
const Select = styled.select`
padding: 10px;
margin-right: 20px;
cursor: pointer;
${mobile({ margin: "11px 3px" })}
${smallMobile({ margin: "11px 1px" })}
${tablet({ margin: "11px 1px" })}`

const Option = styled.option`
cursor: pointer;`

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

const ProductList = () => {
  const location = useLocation();
  const cat = location.pathname.split('/')[2]
  const [filters, setFilters] = useState({})
  const [sort, setSort] = useState('newest')
  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({ ...filters, [e.target.name]: value })
  }

  const handlePrice = (e) => {

    setSort(e.target.value)
  }

  const { loaderDisplay,alertDisplay,alertResult,errMsg } = useSelector(state => state.loader)
  return (
    <Container>
      <Announcement />
      <Navbar />
      <AlertContainer style={{display:alertDisplay}}>
        <Alert variant="filled" severity={`${alertResult}`}>
          {alertResult === 'success' ? "Products fetched successfully." : `${errMsg?errMsg:"Something went wrong..."}`}
        </Alert>
      </AlertContainer>
      <Title>{cat === "null" ? "General" : cat[0].toUpperCase() + cat.slice(1,)}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select name="color" onChange={handleFilters}>
            <Option value=''>Color</Option>
            <Option value='white'>White</Option>
            <Option value='black'>Black</Option>
            <Option value='red'>Red</Option>
            <Option value='blue'>Blue</Option>
            <Option value='yellow'>Yellow</Option>
            <Option value='green'>Green</Option>
          </Select>
          <Select name="size" onChange={handleFilters}>
            <Option value=''>Size</Option>
            <Option value='S'>S</Option>
            <Option value='M'>M</Option>
            <Option value='L'>L</Option>
            <Option value='XL'>XL</Option>
            <Option value='XXL'>XXL</Option>
            <Option value="16">16</Option>
            <Option value="18">18</Option>
            <Option value="20">20</Option>
            <Option value="22">22</Option>
            <Option value="24">24</Option>
            <Option value="26">26</Option>
            <Option value="28">28</Option>
            <Option value="30">30</Option>
            <Option value="32">32</Option>
            <Option value="34">34</Option>
            <Option value="36">36</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select name="price" onChange={handlePrice}>
            <Option value="">Sort</Option>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price(asc)</Option>
            <Option value="desc">Price(desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Divloader style={{ display: loaderDisplay }}>
        <RotatingLines
          strokeColor="green"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
        />
      </Divloader>
      <Products cat={cat === "null" ? null : cat} filters={filters} sort={sort} />
      <Newsletter />
      <Footer />
    </Container>
  )
}

export default ProductList