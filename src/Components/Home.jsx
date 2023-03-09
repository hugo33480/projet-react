import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { onAuthStateChanged, signOut } from 'firebase/auth';
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
import { auth } from '../firebase';
import logo from '../assets/LoL_Logo_Rendered_LARGE.png';
import '../App.css';
import Card from './Card';

function Home() {
  // const apiKey = 'RGAPI-a6e09577-ad44-4fe9-b9ac-ff4f442ffd1c';

  const [champs, setChamps] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid } = user;

        axios.get('http://ddragon.leagueoflegends.com/cdn/13.3.1/data/fr_FR/champion.json').then(async (res) => {
          if (!Object.keys(champs).length) {
            const champsInter = res.data.data;
            setChamps(champsInter);
            // eslint-disable-next-line no-restricted-syntax
            for (const champName of Object.keys(champsInter)) {
              // eslint-disable-next-line no-await-in-loop
              const res2 = await axios.get(`http://ddragon.leagueoflegends.com/cdn/13.4.1/data/fr_FR/champion/${champName}.json`);
              champsInter[champName].skins = res2.data.data[champName].skins;
            }
            // eslint-disable-next-line no-shadow
            setChamps(champsInter);
          }
        });

        console.log('uid', uid);
      } else {
        console.log('user is logged out');
      }
    });
  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth).then(() => {
      navigate('/login');
      console.log('Signed out successfully');
    }).catch((error) => {
      console.error(error);
    });
  };

  return (
    <section style={{ background: '#010A13' }}>
      <div className="d-flex justify-content-between align-items-center mb-5" style={{ height: 100, background: '#0A1428', borderBottom: 'solid 1px #C89B3C' }}>
        <img src={logo} alt="" />
        {/* eslint-disable-next-line react/button-has-type */}
        <button
          className="btn btn-primary"
          onClick={handleLogout}
          style={{
            background: '#0397AB', borderColor: '#0397AB', height: '50%', marginRight: '20px',
          }}
        >
          Déconnexion
        </button>
      </div>
      <div className="d-flex flex-wrap">
        {
            // eslint-disable-next-line jsx-a11y/alt-text
              Object.keys(champs).map((champName) => (
                <Card champNameProp={champName} champProp={champs[champName]} key={champName} />
              ))
                }
      </div>
    </section>
  );
}

export default Home;
