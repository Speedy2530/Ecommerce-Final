import { Card } from "react-bootstrap"
import { Link } from 'react-router-dom'
import Rating from './Rating'
import '../extraCss/Card.css'

//takes in product as a PROP, since it does it for every one
const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded cardWrapper">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" className="product-image" />
      </Link>

      <Card.Body className="d-flex flex-column">
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div" className='product-title'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <Rating value={ product.rating } text={`${product.numReview} reviews`} />
          <Card.Text as="h3" className="mt-1"> {/* mt-auto pushes the price to the bottom */}
          ${product.price}
        </Card.Text>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product
