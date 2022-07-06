import React, { useState } from 'react';

const LoginPage = (props) => {
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });

    const handleChange = event => {
        const value = event.currentTarget.value;
        const name = event.currentTarget.name;

        setCredentials({...credentials, [name]: value});
    };

    const handleSubmit = event => {
        event.preventDefault();
        console.log(credentials);
    };

    return ( 
        <>
            <h1>Connexion à l'application</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label htmlFor="username">Adresse email</label>
                    <input type="email" value={credentials.username} onChange={handleChange} className="form-control" placeholder='Adresse email de connexion' name='username' id='username'/>
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