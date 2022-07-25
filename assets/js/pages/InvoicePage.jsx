import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { async } from 'regenerator-runtime';
import Field from '../components/forms/Field';
import Select from '../components/forms/Select';
import customersAPI from '../services/customersAPI';

const InvoicePage = (props) => {
    const [invoice, setInvoice] = useState({
        amount: "",
        customer: "",
        status: ""
    });

    const [customers, setCustomers] = useState([]);

    const [errors, setErrors] = useState({
        amount: "",
        customer: "",
        status: ""
    });

    const fetchCustomers = async () => {
        try {
            setCustomers(await customersAPI.findAll());
        } catch (error) {
            console.log(error.response);
        };
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setInvoice({...invoice, [name]: value});
    };

    return ( 
        <>
            <h1>Création d'une facture</h1>
            <form>
                <Field 
                    name="amount"
                    type='number'
                    placeholder='Montant de la facture'
                    label="Montant"
                    onChange={handleChange}
                    value={invoice.amount}
                    error={errors.amount}
                />

                <Select
                    name="customer"
                    label="Client"
                    value={invoice.customer}
                    error={errors.customer}
                    onChange={handleChange}
                >
                    {customers.map(customer => (
                        <option value={customer.id} key={customer.id}>
                            {customer.firstName} {customer.lastName}
                        </option>
                    ))}
                </Select>
                <Select
                    name="status"
                    label="Status"
                    value={invoice.status}
                    error={errors.status}
                    onChange={handleChange}
                >
                    <option value="SENT">Envoyée</option>
                    <option value="PAID">Payée</option>
                    <option value="CANCELLED">Annulée</option>
                </Select>

                <div className="form-group">
                    <button type="submit" className="btn btn-success">Enregistrer</button>
                    <Link to="/invoices" className='btn btn-link'>Retour aux factures</Link>
                </div>
            </form>
        </>
     );
}
 
export default InvoicePage;