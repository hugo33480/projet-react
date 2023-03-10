import React, { useEffect } from 'react';
import axios from 'axios';
// eslint-disable-next-line import/no-cycle
import { UserContext } from '../App';

function ModalMasteries() {
  const apiKey = 'RGAPI-a6e09577-ad44-4fe9-b9ac-ff4f442ffd1c';

  const context = React.useContext(UserContext);

  useEffect(() => {
    axios.get(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${context.summonerName}?api_key=${apiKey}`).then((resp) => {
      console.log('ici', resp);
    });
  }, []);

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
          <div className="modal-body" />
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalMasteries;
