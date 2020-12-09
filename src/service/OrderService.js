import http from "../http-common";

class OrderService {
    getAll() {
        return http.get("/orders");
    }

    getAllComplex(pPerPage, pageNr, searchTerm, sortDirection) {
        let extra = `?name=${searchTerm}&sort=price,${sortDirection}`;
        return http.get("/orders" + extra, {
            headers: {
                "Page-Number" : pageNr,
                "Page-Size" : 4,
            }
        });
    }

    getById(id) {
        return http.get(`/orders/${id}`);
    }

    create(data) {
        return http
            .post("/orders", data)
            .then((response) => {
                console.log(response.data);
                console.log("still" + data.productId);
            })
            .catch((e)=> {
                console.log(e);
            })
    }

    update(id, data) {
        return http.put(`/orders/${id}`, data);
    }

    delete(id) {
        return http
            .delete('/orders/' + id)
            .then((response) => {
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }
}

export default new OrderService();