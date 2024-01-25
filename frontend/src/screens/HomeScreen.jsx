import { Row, Col } from 'react-bootstrap'
import { useParams } from 'react-router-dom' //allows access to url items
import Product from '../components/Product'
import { useGetProductsQuery } from '../slices/productsApiSlice.js';
import Loader from '../components/Loader.jsx';
import Message from '../components/Message.jsx'
import Paginate from '../components/Paginate.jsx';
import { Link } from 'react-router-dom';
import ProductCarousel from '../components/ProductCarousel.jsx';
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

  const { pageNumber, keyword } = useParams()

  const { data, isLoading, error } = useGetProductsQuery({ keyword, pageNumber });

  return (
    <>
        { !keyword ? <ProductCarousel className='mt-4'/> : 
          <Link to='/' className='btn btn-light mb-4'>Go back</Link>}
        { isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{ error?.data?.message || error.error }</Message>
        ) : (
        <>
        <h1>Latest Products</h1>
        <Row>
            {data.products.map((product) => (
                <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                    <Product key={product.id} product={product} />
                </Col>
            ))}
        </Row>
        <div className='text-center'>
          <div className='d-inline-block'>
              <Paginate 
              pages={data.pages}
              page={data.page}
              keyword={keyword ? keyword : ''}/>
          </div>
        </div>
        </>
      )}
    </>
  )
}

export default HomeScreen
