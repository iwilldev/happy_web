import React from 'react';

import { Link } from 'react-router-dom';

import '../styles/pages/landing.css';

import logoImg from '../images/logo.svg';

function Landing() {
    return (
        <div id="page-landing">
            <div className="content-wrapper">
                
                <img src={logoImg} alt="Happy" className="logo-img"/>
                
                <main>
                <h1>Leve felicidade para o mundo</h1>
                <p>Visite orfanatos e mude o dia de muitas crianças</p>
                </main>

                <div className="location">
                <strong>Nova Iguaçu</strong>
                <span>Rio de Janeiro</span>
                </div>

                <Link to="/app" className="enter-app">
                    <i className="enter-app-icon"></i>
                </Link>

            </div>
        </div>
    );
}
export default Landing;