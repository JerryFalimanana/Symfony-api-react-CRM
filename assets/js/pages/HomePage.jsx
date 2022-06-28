import React from 'react';

const HomePage = (props) => {
    return ( 
        <div className="jumbotron mt-3">
            <h1 className="display-3">Bienvenue sur SymfonyApp</h1>
                <p className="lead">Nous mettons en relation les voyageurs et les propriétaire qui veulent profiter d'opportunités et gagner de l'argent en proposant leurs bien à la location.</p>
            <hr className="my-4"/>
                <p>Vous êtes voyageurs ? Et vous voulez voir où vous pourrez loger lors de votre prochain déplacement ?</p>
            <p className="lead">
                <a className="btn btn-primary btn-lg" href="#" role="button">Voir nos annonces</a>
            </p>
        </div> 
    );
}
 
export default HomePage;