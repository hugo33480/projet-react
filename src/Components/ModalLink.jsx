import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';

function ModalLink() {
  const [value, setValue] = useState('');
  const link = () => {
    const uid = localStorage.getItem('uid');
    addDoc(collection(db, 'userInfo'), {
      uid,
      summonerName: value,
    }).then();
  };

  return (
    <div
      className="modal fade"
      id="modal-link"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Association
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
          </div>
          <div className="modal-body">
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <span>Vous n'avez pas liée votre compte league of legends?</span>
            <input placeholder="Nom d'invocateur" value={value} onChange={(e) => setValue(e.target.value)} type="text" className="form-control mt-4" />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
            <button type="button" className="btn btn-primary" onClick={link} data-bs-dismiss="modal">Lier</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalLink;
