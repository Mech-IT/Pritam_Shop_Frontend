import styled from "styled-components"
import Productitem from "./Productitem"
import { mobile, smallMobile } from "../responsive"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { addAlert, addLoaderDisplay } from "../redux/loaderRedux"

const Container = styled.div`
display:flex;
padding: 20px;
flex-wrap:wrap;
justify-content:space-between;
${mobile({ padding: '0px' })}
${smallMobile({ padding: '0px' })}
`

const Products = ({ cat, filters, sort }) => {

  const [popularProducts, setPopularProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const dispatch = useDispatch();

  const products = async () => {
    dispatch(addLoaderDisplay('flex'))
    // const host = "http://localhost:5000"
    const host = process.env.REACT_APP_BASE_URL 
    const response = await fetch(cat ? `${host}/api/products/getallproduct?category=${cat}` : `${host}/api/products/getallproduct`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status >= 200 && response.status <= 299) {
      const popularProducts = await response.json()
      setPopularProducts(popularProducts)
      dispatch(addLoaderDisplay('none'))
      dispatch(addAlert({ alertDisplay: "block", alertResult: "success", errMsg: "" }))
      console.log("hh")
      setTimeout(() => {
        dispatch(addAlert({ alertDisplay: "none", alertResult: "", errMsg: "" }))
      }, 3000);
    } else {
      const json = await response.json()
      console.log(json)
      dispatch(addLoaderDisplay('none'))
      dispatch(addAlert({ alertDisplay: "block", alertResult: "error", errMsg: json.error }))
      setTimeout(() => {
        dispatch(addAlert({ alertDisplay: "none", alertResult: "", errMsg: "" }))
      }, 3000);
    }

  }

  useEffect(() => {
    products()
  }, [])


  useEffect(() => {
    cat ? setFilteredProducts(popularProducts.filter((item) => Object.entries(filters).every(([key, value]) => item[key].includes(value)))) : cat === null ? setFilteredProducts(popularProducts.filter((item) => Object.entries(filters).every(([key, value]) => item[key].includes(value)))) : setFilteredProducts([])
  }, [popularProducts, cat, filters])

  useEffect(() => {

    if (sort === "newest") {
      setFilteredProducts(prev =>
        [...prev].sort((a, b) => { return b.createdAt - a.createdAt })
      )
    }
    else if (sort === "asc") {
      setFilteredProducts(prev =>
        [...prev].sort((a, b) => { return a.price - b.price })

      )
    }
    else {
      setFilteredProducts(prev =>
        [...prev].sort((a, b) => { return b.price - a.price })
      )
    }
  }, [sort])


  return (
    <Container>
      {cat ? filteredProducts.map(item => {
        return <Productitem item={item} key={item._id} />
      }) : cat === "" ? popularProducts.slice(0, 8).map(item => {
        return <Productitem item={item} key={item._id} />
      }) : filteredProducts.map(item => {
        return <Productitem item={item} key={item._id} />
      })}
      {/* {console.log(filteredProducts)} */}
    </Container>
  )
}

export default Products