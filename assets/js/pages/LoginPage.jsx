import React, { useState } from 'react';
import axios from 'axios';
import { async } from 'regenerator-runtime';

const LoginPage = (props) => {
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });
    const [error, setError] = useState("");

    const handleChange = event => {
        const value = event.currentTarget.value;
        const name = event.currentTarget.name;

        setCredentials({...credentials, [name]: value});
    };

    const handleSubmit = async event => {
        event.preventDefault();
        
        try {
            const token = await axios.post("http://localhost:8000/api/login_check", credentials).then(response => response.data.token);
            setError("");
            window.localStorage.setItem("authToken", token);

            axios.defaults.headers["Authorization"] = "Bearer " + token;
        } catch(error) {
            setError("Aucun compte ne possède cette adresse.");
        }

        console.log(credentials);
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