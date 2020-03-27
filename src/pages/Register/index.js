import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { FiArrowLeft } from "react-icons/fi";
import "./styles.css";
import logoImage from "../../assets/logo.svg";

import api from "../../services/api";

export default function Register() {
  const [ongName, setOngName] = useState("");
  const [ongEmail, setOngEmail] = useState("");
  const [ongWhatsApp, setOngWhatsApp] = useState("");
  const [ongCity, setOngCity] = useState("");
  const [ongUf, setOngUf] = useState("");

  let history = useHistory();

  async function handleRegister(event) {
    event.preventDefault();

    let allOngData = {
      name: ongName,
      email: ongEmail,
      whatsapp: ongWhatsApp,
      city: ongCity,
      uf: ongUf
    }

    try {
      const ongRegisterApiResponse = await api.post('ongs', allOngData);
  
      alert(`Seu ID de acesso: ${ongRegisterApiResponse.data.id}`);

      history.push('/');
    }
    catch (error) {
      alert(`Ocorreu um erro no cadastro. Erro: ${error}`);
    }
  }

  return (
    <>
      <div className="register-container">
        <div className="content">
          <section>
            <img src={logoImage} alt="Logo Heroes" />

            <h1>Cadastro</h1>
            <p>
              Faça seu cadastro, entre na plataforma e ajude pessoas a
              encontrarem os casos da sua ONG.
            </p>

            <Link className="back-link" to="/">
              <FiArrowLeft size={16} color="#E02041" />
              Ainda não possuo cadastro
            </Link>
          </section>

          <form onSubmit={handleRegister}>
            <input
              placeholder="Nome da ONG"
              value={ongName}
              onChange={event => setOngName(event.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={ongEmail}
              onChange={event => setOngEmail(event.target.value)}
            />
            <input
              placeholder="WhatsApp"
              value={ongWhatsApp}
              onChange={event => setOngWhatsApp(event.target.value)}
            />
            <div className="input-group">
              <input
                placeholder="Cidade"
                value={ongCity}
                onChange={event => setOngCity(event.target.value)}
              />
              <input
                placeholder="UF"
                value={ongUf}
                onChange={event => setOngUf(event.target.value)}
                style={{ width: 80 }}
              />
            </div>

            <button type="submit" className="button">Cadastrar</button>
          </form>
        </div>
      </div>
    </>
  );
}
