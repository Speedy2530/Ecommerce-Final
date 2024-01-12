//get the ID from the url by useParams
import { useParams, useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { Form, Row, Col, Image, ListGroup, Card, Button} from 'react-bootstrap';
import Rating from "../components/Rating";
import { useDispatch } from 'react-redux';
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";
import Message from "../components/Message";
import { useState, useEffect } from 'react';
import { addToCart } from '../slices/cartSlice';
// import axios from 'axios';
//import products from "../products"// //from before//



const ProductScreen = () => {
    const { id: productId } = useParams()

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [qty, setQty] = useState(1)
    

    const { 
        data: product, 
        isLoading, 
        error 
    } = useGetProductDetailsQuery(productId);


    const addToCartHandler = () => {
        dispatch(addToCart({ ...product, qty }))
        navigate('/cart');

    }


    //Now using redux, don't need axios fetching

    // const [product, setProduct] = useState({})

    // //fetches data from backend
    // useEffect(() => {
    //     const fetchProducts = async () => {
    //         const { data } = await axios.get(`/api/products/${productId}`);
    //         setProduct(data); 
    //     }

    //     fetchProducts();
    // }, [productId]) //added productID as a dependency, which means that if this changes,
    //                 //useEffect runs again

  return (
    <>
        <Link className='btn btn-light my-3' to='/'>
            Go Back
        </Link>

        { isLoading? (
            <h2>Loading...</h2>
        ) : error ? (
            <Message variant='danger'>{ error?.data?.message || error.error }</Message>
        ) : (
            <Row>
            <Col md={5}>
                <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={4}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h3>{product.name}</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        {console.log(product)}
                        <Rating value={product.rating} text={`${product.numReview} reviews`} />
                    </ListGroup.Item>
                    <ListGroup.Item>
                            {product.description}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={3}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <Row>
                                <Col>Price:</Col>
                                <Col>
                                    <strong>${product.price}</strong>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Status:</Col>
                                <Col>
                                    <strong>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</strong>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        
                        {/* quantity section */}
                        {product.countInStock > 0 && (
                            <ListGroup.Item>
                                <Row>
                                    <Col>Qty:</Col>
                                    <Col>
                                        <Form.Control
                                            as='select'
                                            value={qty}
                                            onChange={(e) => setQty(Number(e.target.value))}
                                        >
                                            {[...Array(product.countInStock).keys()].map((x) => (
                                                <option key={ x + 1 } value = {x + 1}>
                                                    { x + 1 }
                                                </option>
                                            ))} 
                                            {/* creating an array with length of numInStock of item, and keys set as just the index */}

                                        </Form.Control>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        )}
                        
                        <ListGroup.Item className='text-center'>
                            <Button className='btn-block'
                            type='button'
                            disabled={product.countInStock === 0}
                            onClick={addToCartHandler}>
                            Add To Cart
                            </Button>                       
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
        ) }

        
    </>
  )
}

export default ProductScreen
