import React from 'react';
import { FiArrowLeft, FiHome } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import mapMarkerImg from '../images/map-marker.svg';

import '../styles/components/sidebar.css';

export default function Sidebar() {

  const { goBack } = useHistory();
  
  return (
    <aside className="app-sidebar">
      <img src={mapMarkerImg} alt="Happy" />

      <footer>
        <Link to="/">
          <FiHome size={24} color="#FFF" />
        </Link>
        <button type="button" onClick={goBack}>
          <FiArrowLeft size={24} color="#FFF" />
        </button>
      </footer>
    </aside>
  );
}