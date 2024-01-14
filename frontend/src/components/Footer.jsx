import { Container, Row, Col } from "react-bootstrap"

const Footer = () => {
    const currYear = new Date().getFullYear();

    return (
        <footer>
            <Container>
                <Row>
                    <Col className='text-center py-3'>
                        <p>SShop &copy; {currYear}</p>
                        <p style={{fontStyle: 'italic'}}>Saihej Singh</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer
