import React, { Component } from 'react';
import { Card, Table, Button, ButtonGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import MyToast from "./myToast";
import { Link } from "react-router-dom";

class VoitureListe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            voitures: [],
            show: false,
            message: "",
            voitureIdToDelete: null,
        };
    }

    componentDidMount() {
        this.fetchVoitures();
    }

    fetchVoitures() {
        axios.get("http://localhost:8080/voitures")
            .then(response => response.data)
            .then(data => {
                this.setState({ voitures: data });
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des données :", error);
            });
    }

    handleEditClick(voitureId) {
        console.log("Édition de la voiture avec l'ID : " + voitureId);
    }

    handleDeleteClick(voitureId) {
        this.setState({ show: true, message: "Voiture supprimée avec succès.", voitureIdToDelete: voitureId });

        setTimeout(() => {
            this.setState({ show: false, message: "", voitureIdToDelete: null });
        }, 3000);

        axios.delete(`http://localhost:8080/voitures/${voitureId}`)
            .then(response => {
                if (response.data != null) {
                    this.fetchVoitures();
                }
            })
            .catch(error => {
                console.error("Erreur lors de la suppression de la voiture :", error);
            });
    }

    render() {
        // Style pour centrer le tableau et ajouter un espace en haut
        const cardStyle = {
            margin: '20px auto',
            width: '90%',
        };

        return (
            <div style={{ padding: '20px' }}>
                <div style={{ display: this.state.show ? "block" : "none" }}>
                    <MyToast show={this.state.show} message={this.state.message} type="danger" />
                </div>

                <Card className="border border-dark bg-dark text-white" style={cardStyle}>
                    <Card.Header><FontAwesomeIcon icon={faList} /> Liste Voitures</Card.Header>
                    <Card.Body>
                        <Table bordered hover striped variant="dark">
                            <thead>
                            <tr>
                                <th>Marque</th>
                                <th>Modèle</th>
                                <th>Couleur</th>
                                <th>Immatricule</th>
                                <th>Année</th>
                                <th>Prix</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.voitures.length ? (
                                this.state.voitures.map(voiture => (
                                    <tr key={voiture.id}>
                                        <td>{voiture.marque}</td>
                                        <td>{voiture.modele}</td>
                                        <td>{voiture.couleur}</td>
                                        <td>{voiture.immatricule}</td>
                                        <td>{voiture.annee}</td>
                                        <td>{voiture.prix}</td>
                                        <td>
                                            <ButtonGroup>
                                                <Link to={"/edit/"+voiture.id} className="btn btn-sm btn-outline-primary" style={{ marginRight: '8px' }}>
                                                    Modifier<FontAwesomeIcon icon={faEdit} />
                                                </Link>
                                                <Button
                                                    variant="outline-danger"
                                                    onClick={() => this.handleDeleteClick(voiture.id)}
                                                    style={{ marginLeft: '8px' }}
                                                > Supprimer
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </Button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" align="center">Aucune Voiture n'est disponible.</td>
                                </tr>
                            )}
                            </tbody>
                        </Table>
                    </Card.Body>
                    <Card.Footer>
                        <div className="text-center">
                            {this.state.voitures.length} Voitures disponibles
                        </div>
                    </Card.Footer>
                </Card>
            </div>
        );
    }
}

export default VoitureListe;
