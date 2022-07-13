import React, { useContext, useState } from 'react';
import { async } from 'regenerator-runtime';
import Field from '../components/forms/Field';
import AuthContext from '../contexts/AuthContext';
import AuthAPI from '../services/authAPI';

const LoginPage = ({  history }) => {
    const {setIsAuthenticated} = useContext(AuthContext);

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
            setIsAuthenticated(true);
            history.replace("/customers");
        } catch(error) {
            setError("Aucun compte ne possède cette adresse.");
        }
    };

    return ( 
        <>
            <h1>Connexion à l'application</h1>
            <form onSubmit={handleSubmit}>
                <Field label="Adresse email"
                       type='email'
                       name='username'
                       value={credentials.username}
                       onChange={handleChange}
                       placeholder="Adresse email de connexion"
                       error={error}
                />
                <Field name="password"
                       label="Mot de passe"
                       placeholder='Tappez votre mot de passe'
                       value={credentials.password}
                       onChange={handleChange}
                       type="password"
                       error=''
                />
                <div className="form-group">
                    <button type="submit" className="btn btn-success">Se connecter</button>
                </div>
            </form>
        </>
     );
}
 
export default LoginPage;