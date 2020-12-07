import http from "../http-common";

class ProductService {
    getAll() {
        return http.get("/products");
    }

    getAllComplex(pPerPage, pageNr, searchTerm, sortDirection) {
        let extra = `?name=${searchTerm}&sort=price,${sortDirection}`;
        return http.get("/products" + extra, {
            headers: {
                "Page-Number" : pageNr,
                "Page-Size" : 4,
            }
        });
    }

    getById(id) {
        return http.get(`/products/${id}`);
    }

    create(data) {
        return http
            .post("/products", data)
            .then((response) => {
                console.log(response.data);
            })
            .catch((e)=> {
                console.log(e);
            })
    }

    update(id, data) {
        return http.put(`/products/${id}`, data);
    }

    delete(id) {
        return http
            .delete('/products/' + id)
            .then((response) => {
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }
}

export default new ProductService();