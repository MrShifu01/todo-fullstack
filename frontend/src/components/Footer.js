import { Container, Row, Col } from "react-bootstrap"

const Footer = () => {
  return (
    <footer>
        <Container>
            <Row>
                <Col className="text-center py-3">
                    <p>todo. &copy; 2023</p>
                </Col>
            </Row>
        </Container>
    </footer>
  )
}

export default Footer