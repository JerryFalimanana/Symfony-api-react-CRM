import React, { useState } from 'react';
import { async } from 'regenerator-runtime';
import AuthAPI from '../services/authAPI';

const LoginPage = ({ onLogin }) => {
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });
    const [error, setError] = useState("");

    const handleChange = ({currentTarget}) => {
        const {value, name} = currentTarget;
        setCredentials({...credentials, [name]: value});
    };

    const handleSubmit = async event => {
        event.preventDefault();
        
        try {
            await AuthAPI.authenticate(credentials);
            setError("");
            onLogin(true);
        } catch(error) {
            setError("Aucun compte ne possède cette adresse.");
        }
    };

    return ( 
        <>
            <h1>Connexion à l'application</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label htmlFor="username">Adresse email</label>
                    <input type="email" value={credentials.username} onChange={handleChange} className={"form-control" + (error && " is-invalid")} placeholder='Adresse email de connexion' name='username' id='username'/>
                    {error && 
                        <p className="invalid-feedback">{error}</p>
                    }
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="password">Mot de passe</label>
                    <input type="password" value={credentials.password} onChange={handleChange} className="form-control" placeholder='Votre mot de passe' name='password' id='password'/>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-success">Se connecter</button>
                </div>
            </form>
        </>
     );
}
 
export default LoginPage;