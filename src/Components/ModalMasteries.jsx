import React, { useEffect, useState } from 'react';
import axios from 'axios';
// eslint-disable-next-line import/no-cycle
import { UserContext } from '../App';

// eslint-disable-next-line react/prop-types
function ModalMasteries({ currentChamp }) {
  const apiKey = 'RGAPI-a6e09577-ad44-4fe9-b9ac-ff4f442ffd1c';
  const context = React.useContext(UserContext);

  const [champLvl, setChampLvl] = useState(null);
  const [champPoints, setChampPoints] = useState(null);

  useEffect(() => {
    if (context && currentChamp) {
      axios.get(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${context}?api_key=${apiKey}`).then((resp) => {
        axios.get(`https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${resp.data.id}/by-champion/${currentChamp}?api_key=${apiKey}`).then((r) => {
          console.log('lalalaalaololo0', r);
          setChampLvl(r.data.championLevel);
          setChampPoints(r.data.championPoints);
        });
      });
    }
  }, [context, currentChamp]);

  return (
    <div
      className="modal fade"
      id="modal-masteries"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="modalLabel">
              Maîtrise
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
          </div>
          <div className="modal-body">
            {
              champLvl
                ? (
                  <div className="d-flex">
                    <div className="d-flex flex-column">
                      {/* eslint-disable-next-line global-require,import/no-dynamic-require */}
                      <img alt="" src={require(`../assets/images/mastery-${champLvl}.png`)} width="105" height="103" />
                      <span className="d-flex justify-content-center">
                        niveau:
                        {` ${champLvl}`}
                      </span>
                    </div>
                    <div className="d-flex justify-content-center align-items-center" style={{ width: '100%' }}>
                      <span>
                        Points de champion:
                        <span style={{ fontWeight: 'bold' }}>
                          {` ${champPoints}`}
                        </span>
                      </span>
                    </div>
                  </div>
                )
                : null
            }
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalMasteries;
