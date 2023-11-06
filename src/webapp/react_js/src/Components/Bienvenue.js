import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';

class Bienvenue extends React.Component {
    render() {
        const containerStyle = {
            paddingTop: '20px',
            paddingBottom: '20px',
        };

        const cardStyle = {
            backgroundColor: '#343a40',
            color: 'white',
            padding: '40px',
            border: 'none',
            borderRadius: '5px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
        };

        const titleStyle = {
            fontSize: '3rem', // Taille de police plus grande pour le titre
            fontWeight: 'bold',
            marginBottom: '30px',
        };

        const blockquoteStyle = {
            fontSize: '1.5rem', // Taille de police légèrement plus grande pour la citation
            fontStyle: 'italic',
            margin: '20px 0',
        };

        const footerStyle = {
            fontSize: '1rem',
            color: '#dee2e6'
        };

        return (
            <Container fluid style={containerStyle}>
                <Row className="justify-content-md-center">
                    <Col lg={8}>
                        <Card style={cardStyle}>
                            <Card.Body>
                                <h1 style={titleStyle}>Bienvenue au Magasin des Voitures</h1>
                                <blockquote style={blockquoteStyle}>
                                    <p>Le meilleur de nos voitures est exposé près de chez vous.</p>
                                    <footer style={footerStyle}>IDSIT</footer>
                                </blockquote>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Bienvenue;
