import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";

import api from "../../services/api";

import "./styles.css";
import logoImage from "../../assets/logo.svg";

export default function Profile() {
  const history = useHistory();

  const [incidents, setIncidents] = useState([]);

  const ongName = sessionStorage.getItem("ongName");
  const ongId = sessionStorage.getItem("ongId");

  useEffect(() => {
    api
      .get("profile", {
        headers: {
          Authorization: ongId
        }
      })
      .then(response => {
        setIncidents(response.data.listOfIncidents);
      });
  }, [ongId]);

  async function handleDeletionOfIncident(event, incidentId) {
    event.preventDefault();
    await api
      .delete(`/incidents/${incidentId}`, {
        headers: {
          Authorization: ongId
        }
      })
      .then(response => {
        if (!response.data.success)
          alert(
            `Ocorreu um erro durante a deleção do registro. Erro:${response.data.message}`
          );
        else
          setIncidents(
            incidents.filter(incident => incident.id !== incidentId)
          );
      })
      .catch(error => alert(`Um erro ocorreu. Erro: ${error}`));
  }

  function handleLogout(event) {
    event.preventDefault();
    sessionStorage.clear();

    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImage} alt="Be the Hero" />
        <span>Bem vinda, {ongName}</span>

        <Link className="button" to="/incidents/new">
          Cadastrar novo caso
        </Link>
        <button
          type="button"
          onClick={event => {
            handleLogout(event);
          }}
        >
          <FiPower size={18} color="#E02041" />
        </button>
      </header>
      <h1>Casos cadastrados</h1>
      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>

            <strong>Descrição</strong>
            <p>{incident.description}</p>

            <strong>Valor</strong>
            <p>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL"
              }).format(incident.value)}
            </p>

            <button
              onClick={event => handleDeletionOfIncident(event, incident.id)}
            >
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
