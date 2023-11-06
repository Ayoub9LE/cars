import React, { Component } from 'react';
import axios from 'axios';
import { Button, Card, Form, FormGroup, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare, faSave, faUndo } from "@fortawesome/free-solid-svg-icons";
import MyToast from './myToast';

class EditVoiture extends Component {
    constructor(props) {
        super(props);
        this.state = {
            marque: '',
            modele: '',
            couleur: '',
            immatricule: '',
            annee: '',
            prix: '',
            showToast: false,
        };

        this.voitureChange = this.voitureChange.bind(this);
        this.submitVoiture = this.submitVoiture.bind(this);
        this.resetVoiture = this.resetVoiture.bind(this);
    }

    componentDidMount() {
        const voitureId = this.props.match.params.id;
        if (voitureId) {
            this.loadVoitureDetails(voitureId);
        }
    }

    loadVoitureDetails(voitureId) {
        axios.get(`http://localhost:8080/voitures/${voitureId}`)
            .then(response => {
                const voitureDetails = response.data;
                this.setState({
                    marque: voitureDetails.marque,
                    modele: voitureDetails.modele,
                    couleur: voitureDetails.couleur,
                    immatricule: voitureDetails.immatricule,
                    annee: voitureDetails.annee,
                    prix: voitureDetails.prix,
                });
            })
            .catch(error => {
                console.error("Erreur lors du chargement des détails de la voiture :", error);
            });
    }

    resetVoiture() {
        this.setState({
            marque: '',
            modele: '',
            couleur: '',
            immatricule: '',
            annee: '',
            prix: '',
        });
    }

    submitVoiture(event) {
        event.preventDefault();
        const voiture = {
            marque: this.state.marque,
            modele: this.state.modele,
            couleur: this.state.couleur,
            immatricule: this.state.immatricule,
            annee: this.state.annee,
            prix: this.state.prix,
        };

        const voitureId = this.props.match.params.id;
        const axiosMethod = voitureId ? axios.put : axios.post;
        const axiosUrl = voitureId ? `http://localhost:8080/voitures/${voitureId}` : "http://localhost:8080/voitures";

        axiosMethod(axiosUrl, voiture)
            .then(response => {
                if (response.data) {
                    this.setState({ showToast: true });
                }
            })
            .catch(error => {
                console.error("Erreur lors de la modification/ajout de la voiture :", error);
            });
    }

    voitureChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    render() {
        return (
            <div>
                <div style={{ display: this.state.showToast ? "block" : "none" }}>
                    <MyToast show={this.state.showToast} message="Voiture enregistrée avec succès" type="success" />
                </div>
                <Card className="border border-dark bg-dark text-white">
                    <Card.Header>
                        <FontAwesomeIcon icon={faSave} /> {this.props.match.params.id ? "Modifier Voiture" : "Ajouter Voiture"}
                    </Card.Header>
                    <Card.Body>
                        <Form onReset={this.resetVoiture} onSubmit={this.submitVoiture} id="VoitureFormId">
                            <Row>
                                <Col>
                                    <FormGroup controlId="formGridMarque">
                                        <Form.Label>Marque</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            className="bg-dark text-white"
                                            placeholder="Entrez Marque Voiture"
                                            name="marque"
                                            value={this.state.marque}
                                            onChange={this.voitureChange}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup controlId="formGridModele">
                                        <Form.Label>Modèle</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            className="bg-dark text-white"
                                            placeholder="Entrez Modèle Voiture"
                                            name="modele"
                                            value={this.state.modele}
                                            onChange={this.voitureChange}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup controlId="formGridCouleur">
                                        <Form.Label>Couleur</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            className="bg-dark text-white"
                                            placeholder="Entrez Couleur Voiture"
                                            name="couleur"
                                            value={this.state.couleur}
                                            onChange={this.voitureChange}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup controlId="formGridImmatricule">
                                        <Form.Label>Immatricule</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            className="bg-dark text-white"
                                            placeholder="Entrez Immatricule Voiture"
                                            name="immatricule"
                                            value={this.state.immatricule}
                                            onChange={this.voitureChange}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup controlId="formGridAnnee">
                                        <Form.Label>Année</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            className="bg-dark text-white"
                                            placeholder="Entrez Année Voiture"
                                            name="annee"
                                            value={this.state.annee}
                                            onChange={this.voitureChange}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup controlId="formGridPrix">
                                        <Form.Label>Prix</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            className="bg-dark text-white"
                                            placeholder="Entrez Prix Voiture"
                                            name="prix"
                                            value={this.state.prix}
                                            onChange={this.voitureChange}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Button size="sm" variant="success" type="submit">
                                <FontAwesomeIcon icon={faSave} /> {this.props.match.params.id ? "Modifier" : "Ajouter"}
                            </Button>{' '}
                            <Button size="sm" variant="info" type="reset">
                                <FontAwesomeIcon icon={faUndo} /> Réinitialiser
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default EditVoiture;
