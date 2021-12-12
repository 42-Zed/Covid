import React, { useRef, useEffect } from "react";
import axios from 'axios';
import { Helmet } from "react-helmet";
import L from "leaflet";
import { Marker, useMap } from "react-leaflet";

//import { promiseToFlyTo, getCurrentLocation } from "lib/map";

import Layout from "components/Layout";
//import Container from "components/Container";
import Map from "components/Map";
//import Snippet from "components/Snippet";

//import gatsby_astronaut from "assets/images/gatsby-astronaut.jpg";
const LOCATION = {
  lat: 0,
  lng: 0,
};
const CENTER = [LOCATION.lat, LOCATION.lng];
const DEFAULT_ZOOM = 2;
//const ZOOM = 10;

//const timeToZoom = 2000;
//const timeToOpenPopupAfterZoom = 4000;
//const timeToUpdatePopupAfterZoom = timeToOpenPopupAfterZoom + 3000;

/*const popupContentHello = `<p>Hello 👋</p>`;
const popupContentGatsby = `
  <div class="popup-gatsby">
    <div class="popup-gatsby-image">
      <img class="gatsby-astronaut" src=${gatsby_astronaut} />
    </div>
    <div class="popup-gatsby-content">
      <h1>Gatsby Leaflet Starter</h1>
      <p>Welcome to your new Gatsby site. Now go build something great!</p>
    </div>
  </div>
`;*/

/**
 * MapEffect
 * @description This is an example of creating an effect used to zoom in and set a popup on load
 */

 const MapEffect = ({  }) => {
  const map = useMap();

  let response;

    try {
      response = axios.get('https://corona.lmao.ninja/v2/countries');
    } catch(e) {
      console.log(`Failed to fetch countries: ${e.message}`, e);
      return;
    }

    const {data = []} = response;

    console.log(data);

    const geoJson = {
      type: 'FeatureCollection',
      features: data.map((country = {}) => {
        const { countryInfo = {} } = country;
        const { lat, long: lng } = countryInfo;
        return {
          type: 'Feature',
          properties: {
           ...country,
          },
          geometry: {
            type: 'Point',
            coordinates: [ lng, lat ]
          }
        }
      })
    }

  return null;
};

const IndexPage = () => {
  const markerRef = useRef();

  const mapSettings = {
    center: CENTER,
    defaultBaseMap: "OpenStreetMap",
    zoom: DEFAULT_ZOOM,
  }; 

  return (
    <Layout pageName="home">
      <Helmet>
        <title>Home Page</title>
      </Helmet>

      <Map {...mapSettings}>
        <MapEffect>

        </MapEffect>
      </Map>
    </Layout>
  );
};

export default IndexPage;