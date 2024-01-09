import { Card } from "react-bootstrap"
import { Link } from 'react-router-dom'

//takes in product as a PROP, since it does it for every one
const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded">
        <Link to={`/product/${product._id}`}>
            <Card.Img src={product.image} variant="top" />
        </Link>

        <Card.Body>
            <Link to={`/product/${product._id}`}>
                <Card.Title as="div">
                    <strong>{product.name}</strong>
                </Card.Title>
            </Link>

            <Card.Text as="h3">
                ${product.price} lol
            </Card.Text>   
        </Card.Body>
    </Card>
  )
}

export default Product
