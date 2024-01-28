import { Link } from "react-router-dom"
import { Carousel, Image } from 'react-bootstrap'
import Loader from "./Loader"
import Message from "./Message"
import { useGetTopProductsQuery } from "../slices/productsApiSlice"
import '../Assets/styles/index.css'
import '../extraCss/Card.css'


const ProductCarousel = () => {
    const { data: products, isLoading, error} = useGetTopProductsQuery()

  return isLoading ? <> </> : error ? <Message variant='danger'>{error}</Message>
  : (
    <div className='carousel-container'>
    <Carousel pause='hover' className='bg-primary mb-4 mt-0 carousel'>
        {products.map(product => (
            <Carousel.Item key={product._id}>
                <Link to={`/product/${product._id}`}>
                    <Image src={product.image} alt={product.name} fluid className='carousel-image'/>
                    <Carousel.Caption className='carousel-caption'>
                        <h2>{product.name} (${product.price})</h2> 
                    </Carousel.Caption>
                </Link>
            </Carousel.Item>
        ))}
    </Carousel>
    </div>
  )
}

export default ProductCarousel
