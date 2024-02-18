import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import Loader from './Loader';
import Message from './Message';
import { useGetTopProductsQuery } from '../slices/productsApiSlice';
import { useGetProductDetailsQuery } from '../slices/productsApiSlice'; 
import Rating from "../components/Rating";
import { useParams, useNavigate } from "react-router-dom";
import '../Assets/styles/index.css';
import '../extraCss/Card.css';

const ProductCarousel = () => {

  const { id: productId } = useParams()
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const { data: productDetails } = useGetProductDetailsQuery(productId);

  const getTopRatedReview = (reviews) => {
    if (!reviews || reviews.length === 0) return null;
    return reviews.reduce((prev, current) => (prev.rating > current.rating ? prev : current));
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div className="carousel-container">
      <Carousel pause="hover" 
                style={{
                  backgroundColor: '#333',
                  // marginTop: '85px'
                }} className="mb-4 carousel">

        {products.map((product, index) => (
          <Carousel.Item key={product._id}>
            <Link to={`/product/${product._id}`} className="image-link">
              <div className="image-container">
                <Image src={product.image} alt={product.name} className="carousel-image" />
                <div className="hello-text">
                    <div className='carousel-header'>Featured</div>
                       
                        <>
                            <div style={{color: 'white', fontSize: '18px'}}><strong>Author: </strong>{getTopRatedReview(product.reviews).name}</div>
                            <div className='rating-size'><Rating value={getTopRatedReview(product.reviews).rating}/></div>
                            <p>{ getTopRatedReview(product.reviews).createdAt.substring(0, 10) }</p>
                            <p>{ getTopRatedReview(product.reviews).comment }</p>
                        </>

                </div>
              </div>
              <Carousel.Caption className="carousel-caption">
                <h2>{product.name} (${product.price})</h2>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default ProductCarousel;
