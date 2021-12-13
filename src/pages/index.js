import React from 'react';
import { Helmet } from 'react-helmet';
import L from 'leaflet';
import { Bar } from 'react-chartjs-2'
import Chart from 'chart.js/auto'

import { useTracker } from 'hooks';
import { commafy, friendlyDate } from 'lib/util';

import Layout from 'components/Layout';
import Container from 'components/Container';
import Map from 'components/Map';
import BarChart from 'components/BarChart';
import DoughnutChart from 'components/DoughnutChart';
import LineChart from 'components/LineChart';

const LOCATION = {
  lat: 0,
  lng: 0,
};
const CENTER = [LOCATION.lat, LOCATION.lng];
const DEFAULT_ZOOM = 2;

const IndexPage = () => {
  const { data: stats = {} } = useTracker({
    api: 'all',
  });

  const { data: countries = [] } = useTracker({
    api: 'countries',
  });

  const hasCountries = Array.isArray( countries ) && countries.length > 0;

  const dashboardStats = [
    {
      primary: {
        label: 'Total Cases',
        value: stats ? commafy( stats?.cases ) : '-',
      },
      secondary: {
        label: 'Cases Today',
        value: stats ? commafy( stats?.todayCases ) : '-',
      },
    },
    {
      primary: {
        label: 'Total Recovered',
        value: stats ? commafy( stats?.recovered ) : '-',
      },
      secondary: {
        label: 'Recovered Today',
        value: stats ? commafy( stats?.todayRecovered ) : '-',
      },
    },
    {
      primary: {
        label: 'Total Deaths',
        value: stats ? commafy( stats?.deaths ) : '-',
      },
      secondary: {
        label: 'Deaths Today',
        value: stats ? commafy( stats?.todayDeaths ) : '-',
      },
    },
    {
      primary: {
        label: 'Active Cases',
        value: stats ? commafy( stats?.active ) : '-',
      },
    },
    {
      primary: {
        label: 'Critical Cases',
        value: stats ? commafy( stats?.critical ) : '-',
      },
    },
    {
      primary: {
        label: 'Total Tests',
        value: stats ? commafy( stats?.tests ) : '-',
      },
    },
  ];

  /**
   * mapEffect
   * @description Fires a callback once the page renders
   * @example Here this is and example of being used to zoom in and set a popup on load
   */

  async function mapEffect({ leafletElement: map } = {}) {
    if ( !hasCountries || !map ) return;

    map.eachLayer(( layer ) => {
      if ( layer?.options?.name === 'OpenStreetMap' ) return;
      map.removeLayer( layer );
    });

    const geoJson = {
      type: 'FeatureCollection',
      features: countries.map(( country = {}) => {
        const { countryInfo = {} } = country;
        const { lat, long: lng } = countryInfo;
        return {
          type: 'Feature',
          properties: {
            ...country,
          },
          geometry: {
            type: 'Point',
            coordinates: [lng, lat],
          },
        };
      }),
    };

    const geoJsonLayers = new L.GeoJSON( geoJson, {
      pointToLayer: ( feature = {}, latlng ) => {
        const { properties = {} } = feature;
        let updatedFormatted;
        let casesString;

        const { country, updated, cases, deaths, recovered } = properties;

        casesString = `${cases}`;

        if ( cases > 1000000 ) {
          casesString = `${casesString.slice( 0, -6 )}M+`;
        } else if ( cases > 1000 ) {
          casesString = `${casesString.slice( 0, -3 )}K+`;
        }
        if ( updated ) {
          updatedFormatted = new Date( updated ).toLocaleString();
        }

        const html = `
          <span class="icon-marker">
            <span class="icon-marker-tooltip">
              <h2>${country}</h2>
              <ul>
                <li><strong>Confirmed:</strong> ${cases}</li>
                <li><strong>Deaths:</strong> ${deaths}</li>
                <li><strong>Recovered:</strong> ${recovered}</li>
                <li><strong>Last Update:</strong> ${updatedFormatted}</li>
              </ul>
            </span>
            ${casesString}
          </span>
        `;

        return L.marker( latlng, {
          icon: L.divIcon({
            className: 'icon',
            html,
          }),
          riseOnHover: true,
        });
      },
    });

    geoJsonLayers.addTo( map );
    map.invalidateSize()
  }

  const mapSettings = {
    center: CENTER,
    defaultBaseMap: 'OpenStreetMap',
    zoom: DEFAULT_ZOOM,
    mapEffect,
  };

  return (
    <Layout pageName="home">
      <Helmet>
        <title>Home Page</title>
      </Helmet>

      <div className="tracker">
        <Map {...mapSettings} />
        <div className="tracker-stats">
          <ul>
            { dashboardStats.map(({ primary = {}, secondary = {} }, i ) => {
              return (
                <li key={`Stat-${i}`} className="tracker-stat">
                  { primary.value && (
                    <p className="tracker-stat-primary">
                      { primary.value }
                      <strong>{ primary.label }</strong>
                    </p>
                  ) }   
                  { secondary.value && (
                    <p className="tracker-stat-secondary">
                      { secondary.value }
                      <strong>{ secondary.label }</strong>
                      
                    </p>
                  ) } 
                </li> 
              );
            }) }
          </ul>
          <ul>
            <BarChart></BarChart>
          <DoughnutChart></DoughnutChart>
          <LineChart></LineChart>
          </ul>
        </div>
        <div className="tracker-last-updated">
          <p>Last Updated: { stats ? friendlyDate( stats?.updated ) : '-' }</p>
        </div>
      </div>
    </Layout>
  );
  
};

export default IndexPage;
