import React, { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { NavLink, useNavigate } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [summonerName, setSummonerName] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const { user } = userCredential;
        console.log(user);
        navigate('/login');
        // ...
        await addDoc(collection(db, 'userInfo'), {
          uid: user.uid,
          summonerName,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });
  };

  return (
    <main>
      <section>
        <div>
          <div
            className="d-flex justify-content-center align-items-center"
            style={{
              position: 'absolute', left: 'auto', top: 'auto', right: 'auto', bottom: 'auto', width: '100%', height: '100%',
            }}
          >
            <div className="card">
              <div className="card-body px-5">
                <form>
                  <div>
                    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                    <label htmlFor="email-address">
                      {/* eslint-disable-next-line react/no-unescaped-entities */}
                      Nom d'invocateur
                    </label>
                    <input
                      type="text"
                      label="Nom d'invocateur"
                      value={summonerName}
                      className="form-control"
                      onChange={(e) => setSummonerName(e.target.value)}
                      required
                      placeholder="Nom d'invocateur"
                    />
                  </div>
                  <div className="mt-3">
                    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                    <label htmlFor="email-address">
                      Adresse mail
                    </label>
                    <input
                      type="email"
                      label="Email address"
                      value={email}
                      className="form-control"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Email address"
                    />
                  </div>

                  <div className="mt-3">
                    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                    <label htmlFor="password">
                      Mots de passe
                    </label>
                    <input
                      type="password"
                      label="Create password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="form-control"
                      placeholder="Password"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary mt-3"
                    onClick={onSubmit}
                  >
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    S'inscrire
                  </button>

                </form>

                <p className="mt-3">
                  Vous êtes déjà inscrit?
                  {' '}
                  <NavLink to="/login">
                    Se connecter
                  </NavLink>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Signup;
