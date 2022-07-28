import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Field from '../components/forms/Field';
import usersAPI from '../services/usersAPI';

const RegisterPage = ({ history }) => {
    const [user, setUser] = useState({
       firstName: "",
       lastName: "",
       email: "",
       password: "",
       passwordConfirm: ""
    });

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: ""
     });
     
    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setUser({...user, [name]: value});
    };

    const handleSubmit = async event => {
        event.preventDefault();
        const apiErrors = {};
        if (user.password !== user.passwordConfirm) {
            apiErrors.passwordConfirm = "Le mot de passe ne corréspond pas à l'original";
            setErrors(apiErrors);
            toast.error("Des erreurs dans le formulaire.", {
                position: toast.POSITION.TOP_CENTER
            });
            return;
        }

        try {
            await usersAPI.register(user);
            setErrors({});
            toast.success("Inscription effectuée avec succès.", {
                position: toast.POSITION.TOP_CENTER
            });
            history.replace("/login");
        } catch (error) {
            const {violations} = error.response.data;

            if (violations) {
                violations.forEach(violation => {
                    apiErrors[violation.propertyPath] = violation.message
                });
                setErrors(apiErrors);
            }
            toast.error("Des erreurs dans le formulaire.", {
                position: toast.POSITION.TOP_CENTER
            });
        }
    }

    return ( 
        <>
            <h1>Inscription</h1>
            <form onSubmit={handleSubmit}>
                <Field
                    name="firstName"
                    label="Prénom"
                    placeholder='Votre prénom'
                    error={errors.firstName}
                    value={user.firstName}
                    onChange={handleChange}
                />
                <Field
                    name="lastName"
                    label="Nom"
                    placeholder='Votre nom de famille'
                    error={errors.lastName}
                    value={user.lastName}
                    onChange={handleChange}
                />
                <Field
                    name="email"
                    label="Adresse email"
                    placeholder='Votre adresse email ...@.com'
                    type='email'
                    error={errors.email}
                    value={user.email}
                    onChange={handleChange}
                />
                <Field
                    name="password"
                    label="Mot de passe"
                    placeholder='Votre mot de passe sécurisé'
                    type='password'
                    error={errors.password}
                    value={user.password}
                    onChange={handleChange}
                />
                <Field
                    name="passwordConfirm"
                    label="Confirmation de mot de passe"
                    placeholder='Confirmez votre mot de passe'
                    type='password'
                    error={errors.passwordConfirm}
                    value={user.passwordConfirm}
                    onChange={handleChange}
                />

                <div className="form-group">
                    <button type="submit" className="btn btn-success">S'inscrire</button>
                    <Link to="/login" className='btn btn-link'>J'ai déjà un compte</Link>
                </div>
            </form>
        </>
     );
}
 
export default RegisterPage;