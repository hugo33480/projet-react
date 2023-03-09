import React, { useState } from 'react';

// eslint-disable-next-line react/prop-types
function Card({ champProp, champNameProp }) {
  const [champ] = useState(champProp);
  const [champName] = useState(champNameProp);
  return (
    <div
      className="card mx-2 mb-3"
      style={{
        width: 300, height: 400, border: 'solid 2px #C8AA6E', background: '#005A82', color: 'white',
      }}
    >
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <div id={`carousel-${champName}`} className="carousel slide">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div>
              <img src={`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champName}_0.jpg`} className="card-img-top" alt="" />
            </div>
            <div
              className="d-flex justify-content-center"
              style={{
                fontWeight: 'bold', fontFamily: 'bff-medium', zIndex: 10, marginTop: -24,
              }}
            >
              <span>
                {champ.name}
              </span>
              <span>{`, ${champ.title}`}</span>
            </div>
          </div>
          {
                      champ.skins?.map((skin) => (skin.num !== 0 ? (
                        <div className="carousel-item" key={skin.id}>
                          <div>
                            <img src={`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champName}_${skin.num}.jpg`} className="card-img-top" alt="" />
                          </div>
                          <div
                            className="d-flex justify-content-center"
                            style={{
                              fontWeight: 'bold', fontFamily: 'bff-medium', zIndex: 10, marginTop: -24,
                            }}
                          >
                            <span>
                              {skin.name}
                            </span>
                          </div>
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
      <div className="card-body d-flex justify-content-center flex-column align-items-center">
        <p style={{ fontFamily: 'bff-italic', fontSize: '14px' }}>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          "
          {champ.blurb}
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          "
        </p>
      </div>
    </div>
  );
}

export default Card;
