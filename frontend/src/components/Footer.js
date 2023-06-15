import { Container, Row, Col } from "react-bootstrap"

// Basic Footer Function with company name, copywrite and the current year
const Footer = () => {
  
// Getting the current year
  const date = new Date().getFullYear();
  return (
    <footer>
        <Container>
            <Row>
                <Col className="text-center py-3">
                    <p>todo. &copy; {date}</p>
                </Col>
            </Row>
        </Container>
    </footer>
  )
}

export default Footer