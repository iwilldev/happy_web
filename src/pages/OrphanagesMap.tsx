import React, { useEffect, useState, } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiHome } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import '../styles/pages/orphanages-map.css'

import mapMarkerImg from '../images/map-marker.svg';
import mapIcon from '../utils/mapIcon';
import api from '../services/api';

interface Orphanage {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}

function OrphanagesMap() {

    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

    const defaultPosition = {latitude: -22.7598, longitude: -43.4516};
    const [mapZoom, setMapZoom] = useState(12);
    const [mapPosition, setMapPosition] = useState({latitude: defaultPosition.latitude, longitude: defaultPosition.longitude});

    useEffect(() => {
        api.get('orphanages').then(response => {
            setOrphanages(response.data);
        });
    }, []);

    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy"/>
                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :D</p>
                </header>
                <footer>
                    <strong>Nova Iguaçu</strong>
                    <span>Rio de Janeiro</span>
                </footer>
            </aside>
            <Map 
                center={[mapPosition.latitude,mapPosition.longitude]}
                zoom={mapZoom}
                style={{ width: '100%', height: '100%' }}
                onClick={() => {
                    setMapZoom(12);
                    setMapPosition({latitude: defaultPosition.latitude, longitude: defaultPosition.longitude})
                }}
            >
                <TileLayer 
                    url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} 
                    
                />
                {
                    orphanages.map(orphanage => {
                        return (
                            <Marker 
                                key={orphanage.id}
                                icon={mapIcon}
                                position={[orphanage.latitude,orphanage.longitude]}
                                onClick={() => {
                                    setMapZoom(20);
                                    setMapPosition({latitude: orphanage.latitude, longitude: orphanage.longitude})
                                }}
                            >
                                <Popup closeButton={false} minWidth={200} maxWidth={200} className="map-popup">
                                    {orphanage.name}
                                    <Link to={`/orphanages/${orphanage.id}`}>
                                        <FiPlus size={24} color="#FFF" />
                                    </Link>
                                </Popup>
                            </Marker>
                        )
                    })
                }
            </Map>

            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size={24} color="#FFF" />
            </Link>
            <Link to="/" className="back-to-home">
                <FiHome size={24} color="#FFF" />
            </Link>
        </div>
    );
}

export default OrphanagesMap;