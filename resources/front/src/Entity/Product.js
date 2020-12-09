import Axios from "axios";

class Product {

    static getEmpty() {
        return {
            id: 0,
            name: '',
            price: 0
        }
    }

    /**
     * Список продуктов
     */
    static list(page = 1, name = '') {
        return new Promise((resolve, reject) => {

            let config = {
                params: {
                    page
                }
            };

            if(name) {
                config.params.name = name;
            }

            Axios.get('/api/products', config)
                .then((res) => {
                    resolve(res.data);
                })
                .catch(() => reject());
        });
    }

    /**
     * Сохранить продукт
     *
     * @param product
     * @returns {Promise<unknown>}
     */
    static save(product) {
        return new Promise((resolve, reject) => {
            Axios.post('/api/product/save', product)
                .then((res) => {
                    resolve(res.data);
                })
                .catch((error) => reject(error.response.data))
        });
    }

    /**
     * Удалить продукт
     *
     * @param product
     */
    static remove(product) {
        return new Promise((resolve, reject) => {
            Axios.delete(`/api/product/${product.id}/remove`)
                .then((res) => {
                    resolve(res.data);
                })
                .catch((error) => reject(error.response.data))
        });
    }
}

export default Product;
