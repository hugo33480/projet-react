import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Link, useNavigate } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { onAuthStateChanged, signOut } from 'firebase/auth';
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
import { auth } from '../firebase';

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
    <section style={{ background: '#F1F1F1' }}>
      <div style={{ height: 100 }}>
        <Link to="/Detail">Detail</Link>
        {/* eslint-disable-next-line react/button-has-type */}
        <button className="btn btn-primary" onClick={handleLogout}>
          Déconnexion
        </button>
      </div>
      <div className="d-flex flex-wrap">
        {
            // eslint-disable-next-line jsx-a11y/alt-text
              Object.keys(champs).map((champName) => (
                <div key={champName} className="card mx-2 mb-3" style={{ width: 300, height: 400 }}>
                  {/* eslint-disable-next-line jsx-a11y/alt-text */}
                  <div id={`carousel-${champName}`} className="carousel slide">
                    <div className="carousel-inner">
                      <div className="carousel-item active">
                        <img src={`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champName}_0.jpg`} className="card-img-top" alt="" />
                      </div>
                      {
                        champs[champName].skins?.map((skin) => (skin.num !== 0 ? (
                          <div className="carousel-item" key={skin.id}>
                            <img src={`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champName}_${skin.num}.jpg`} className="card-img-top" alt="" />
                          </div>
                        ) : null))
                      }
                    </div>
                    <button
                      className="carousel-control-prev"
                      type="button"
                      data-bs-target={`#carousel-${champName}`}
                      data-bs-slide="prev"
                    >
                      <span className="carousel-control-prev-icon" aria-hidden="true" />
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                      className="carousel-control-next"
                      type="button"
                      data-bs-target={`#carousel-${champName}`}
                      data-bs-slide="next"
                    >
                      <span className="carousel-control-next-icon" aria-hidden="true" />
                      <span className="visually-hidden">Next</span>
                    </button>
                  </div>
                  <div className="card-body">
                    <span>{champName}</span>
                  </div>
                </div>

              ))
                }
      </div>
    </section>
  );
}

export default Home;
