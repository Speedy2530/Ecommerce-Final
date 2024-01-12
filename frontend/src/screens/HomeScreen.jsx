import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import { useGetProductsQuery } from '../slices/productsApiSlice.js';
import Loader from '../components/Loader.jsx';
import Message from '../components/Message.jsx'
//import products from '../products'// //when we were manually importing//
// import { useEffect, useState } from 'react'; //
// import axios from 'axios';


const HomeScreen = () => {
  //Since we're Using redux now, don't need bottom part//

  // const [products, setProducts] = useState([]);

  // //fetches data from backend
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const { data } = await axios.get('/api/products');
  //     setProducts(data);
  //   };

  //   fetchProducts();
  // }, [])

  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <>
        { isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{ error?.data?.message || error.error }</Message>
        ) : (
        <>
        <h1>Latest Products</h1>
        <Row>
            {products.map((product) => (
                <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                </Col>
            ))}
        </Row>
        </>) }
    </>
  )
}

export default HomeScreen
