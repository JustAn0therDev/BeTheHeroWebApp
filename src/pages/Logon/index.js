import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import "./styles.css";

import heroesImage from "../../assets/heroes.png";
import logoImage from "../../assets/logo.svg";

import api from "../../services/api";

export default function Logon() {
  const [ongId, setOngId] = useState("");
  const history = useHistory();

  async function handleLogin(event) {
    event.preventDefault();

    try {
      const sessionApiResponse = await api.post("sessions", { id: ongId });

      if (!sessionApiResponse.data.success) {
        alert('Não foi possível realizar seu login. Verifique o ID inserido!');
      }

      sessionStorage.setItem('ongId', ongId);
      sessionStorage.setItem('ongName', sessionApiResponse.data.name);

      history.push('/profile');
    } catch (error) {
      alert(`Ocorreu um erro durante a tentativa de login. Erro: ${error}`);
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImage} alt="Logo Heroes" />

        <form>
          <h1>Faça seu logon</h1>

          <input
            placeholder="Sua ID"
            value={ongId}
            onChange={event => setOngId(event.target.value)}
          />

          <button
            className="button"
            type="submit"
            onClick={event => {
              handleLogin(event);
            }}
          >
            Entrar
          </button>
          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#E02041" />
            Ainda não possuo cadastro
          </Link>
        </form>
      </section>
      <img src={heroesImage} alt="Heroes" />
    </div>
  );
}
