import React from 'react';

const CustomersPage = (props) => {
    return (
        <>
            <h1>Liste des clients</h1>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Id.</th>
                        <th>Client</th>
                        <th>Email</th>
                        <th>Entreprise</th>
                        <th className='text-center'>Factures</th>
                        <th className='text-center'>Montant total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>12</td>
                        <td>
                            <a href="#">Jerry Falimanana</a>
                        </td>
                        <td>
                            jerry@1234@yopmail.com
                        </td>
                        <td>Jerry Inc</td>
                        <td className='text-center'>
                            <span className="badge bg-success">4</span>
                        </td>
                        <td className='text-center'>2 300,00 €</td>
                        <td>
                            <button className="btn btn-sm btn-danger">Supprimer</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
     );
}
 
export default CustomersPage;