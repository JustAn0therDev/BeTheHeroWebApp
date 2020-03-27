import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import "./styles.css";
import logoImage from "../../assets/logo.svg";
import api from "../../services/api";

export default function NewIncident() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState(0);

  const history = useHistory();

  const ongId = sessionStorage.getItem("ongId");

  async function handleCreationOfNewIncident(event) {
    event.preventDefault();

    await api
      .post(
        "incidents",
        {
          title,
          description,
          value
        },
        {
          headers: {
            Authorization: ongId
          }
        }
      )
      .then(response => {
        if (!response.data.success)
          alert(
            `Ocorreu um erro durante o cadastro do caso. Erro: ${response.data.message}`
          );
        else history.push("/profile");
      })
      .catch(error => {
        alert(`Ocorreu um erro durante o cadastro do caso. Erro: ${error}`);
      });
  }

  return (
    <>
      <div className="new-incident-container">
        <div className="content">
          <section>
            <img src={logoImage} alt="Logo Heroes" />

            <h1>Cadastrar novo caso</h1>
            <p>
              Descreva o texto detalhadamente para encontrar um herói que para
              resolver isso.
            </p>

            <Link className="back-link" to="/">
              <FiArrowLeft size={16} color="#E02041" />
              Voltar para home
            </Link>
          </section>

          <form>
            <input placeholder="Título do caso" onChange={event => setTitle(event.target.value)} />
            <textarea placeholder="Descrição" onChange={event => setDescription(event.target.value)} />
            <input placeholder="Valor em reais" onChange={event => setValue(event.target.value)} />

            <button
              type="submit"
              className="button"
              onClick={event => handleCreationOfNewIncident(event)}
            >
              Cadastrar
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
