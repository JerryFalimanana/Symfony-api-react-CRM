import axios from "axios";
import cache from "./cache";

async function findAll() {
    const cachedCustomers = await cache.get("customers");

    if (cachedCustomers) {
        return cachedCustomers;
    }

    return axios.get("http://localhost:8000/api/customers")
                .then(response => {
                    const customers = response.data["hydra:member"];
                    cache.set("customers", customers);
                    return customers;
                });
}

async function find(id) {
    const cachedCustomer = await cache.get("customers." + id);
    if (cachedCustomer) {
        return cachedCustomer;
    }
    return axios.get("http://localhost:8000/api/customers/" + id)
         .then(response => {
            const customer = response.data;
            cache.set("customers." + id, customer);

            return customer;
        });
}

function create(customer) {
    return axios.post("http://localhost:8000/api/customers", customer)
                .then(async response => {
                    const cachedCustomers = await cache.get("customers");
                    if (cachedCustomers) {
                        cache.set("customers", [...cachedCustomers, response.data]);
                    }
                    return response;
                });
}

function update(id, customer) {
    return axios.put("http://localhost:8000/api/customers/" + id, customer)
                .then(async response => {
                    const cachedCustomers = await cache.get("customers");
                    const cachedCustomer = await cache.get("customers." + id);

                    if (cachedCustomer) {
                        cache.set("customers." + id, response.data);
                    }

                    if (cachedCustomers) {
                        const index = cachedCustomers.findIndex(c => c.id == id);
    
                        cachedCustomers[index] = response.data;
                    }

                    return response;
                });
}

function deleteCustomer(id) {
    return axios.delete("http://localhost:8000/api/customers/" + id)
                .then(async response => {
                    const cachedCustomers = await cache.get("customers");
                    if (cachedCustomers) {
                        cache.set("customers", cachedCustomers.filter(c => c.id != id));
                    }
                    return response;
                });
}

export default {
    findAll,
    find,
    create,
    update,
    delete: deleteCustomer
};