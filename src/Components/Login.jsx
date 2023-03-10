import React, { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { signInWithEmailAndPassword } from 'firebase/auth';
// eslint-disable-next-line import/no-extraneous-dependencies
import { NavLink, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const { user } = userCredential;
        navigate('/home');
        localStorage.setItem('uid', user.uid);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // eslint-disable-next-line no-console
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <main>
      <section>
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            position: 'absolute', left: 'auto', top: 'auto', right: 'auto', bottom: 'auto', width: '100%', height: '100%',
          }}
        >
          <div className="card">
            <div className="card-body px-5">
              <form>
                <div className="mb-2">
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label htmlFor="email-address">
                    Adresse mail
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    className="form-control"
                    required
                    placeholder="Email address"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label htmlFor="password">
                    Mots de passe
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className="form-control"
                    required
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div>
                  {/* eslint-disable-next-line react/button-has-type */}
                  <button
                    onClick={onLogin}
                    className="btn btn-primary mt-3"
                  >
                    Se connecter
                  </button>
                </div>
              </form>

              <p className="text-sm text-white text-center">
                No account yet?
                {' '}
                {' '}
                <NavLink to="/signup">
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  S'inscrire
                </NavLink>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Login;
