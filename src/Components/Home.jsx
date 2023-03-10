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
// eslint-disable-next-line import/named,import/no-cycle
import { UserContext } from '../App';
import ModalLink from './ModalLink';
import ModalMasteries from './ModalMasteries';

function Home() {
  const context = React.useContext(UserContext);

  const [champs, setChamps] = useState({});
  const [currentChampMasteries, setCurrentChampMasteries] = useState('');

  const champMasteries = (champName) => {
    console.log('lolololo', champName);
    setCurrentChampMasteries(champName);
    console.log('lalala', currentChampMasteries);
  };

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
      localStorage.removeItem('uid');
      console.log('Signed out successfully');
    }).catch((error) => {
      console.error(error);
    });
  };

  return (
    <section style={{ background: '#010A13' }}>
      <div
        className="d-flex justify-content-between align-items-center mb-5"
        style={{ height: 100, background: '#0A1428', borderBottom: 'solid 1px #C89B3C' }}
      >
        <img src={logo} alt="" />
        <div>
          {/* eslint-disable-next-line react/button-has-type */}
          {
          !context
            ? (
          // eslint-disable-next-line react/button-has-type
              <button
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#modal-link"
                style={{
                  background: '#0397AB', borderColor: '#0397AB', height: '50%', marginRight: '20px',
                }}
              >
                Associer
                {' '}
                <i className="fa-solid fa-link" />
              </button>
            ) : (
              <span style={{ color: 'white', marginRight: '30px' }}>
                <span style={{ fontWeight: 'bold' }}>Compte: </span>
                <span>{context}</span>
              </span>
            )
        }
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            className="btn btn-primary"
            onClick={handleLogout}
            style={{
              background: '#0397AB', borderColor: '#0397AB', height: '50%', marginRight: '20px',
            }}
          >
            D??connexion
          </button>
        </div>
      </div>
      <div className="d-flex flex-wrap">
        {
              // eslint-disable-next-line jsx-a11y/alt-text
              Object.keys(champs).map((champName) => (
                // eslint-disable-next-line max-len
                <Card champNameProp={champName} champProp={champs[champName]} champMasteries={champMasteries} key={champName} />
              ))
          }
      </div>
      <ModalLink />

      <ModalMasteries currentChamp={currentChampMasteries} />
    </section>
  );
}

export default Home;
