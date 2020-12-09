import http from "../http-common";

class CustomerService {
    getAll() {
        return http.get("/customers");
    }

    getAllComplex(pPerPage, pageNr, searchTerm, sortDirection) {
        let extra = `?name=${searchTerm}&sort=price,${sortDirection}`;
        return http.get("/customers" + extra, {
            headers: {
                "Page-Number" : pageNr,
                "Page-Size" : 4,
            }
        });
    }

    getById(id) {
        return http.get(`/customers/${id}`);
    }

    create(data) {
        return http
            .post("/customers", data)
    }

    update(id, data) {
        return http.put(`/customers/${id}`, data);
    }

    delete(id) {
        return http
            .delete('/customers/' + id)
            .then((response) => {
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }
}

export default new CustomerService();