import Product from "../../Entity/Product";

export default {
    name: "Products",

    mounted() {
        Product.list().then((res) => this.data = res);
    },

    data() {
        return {
            data: {
                current_page: 1,
                data: [],
                total: 50,
                to: 25,
                lastPage: 1,
            },
            editFormVisible: false,
            activeItem: Product.getEmpty(),
            searchName: '',
        }
    },

    watch: {
        searchName(val) {
            if(!val)
                Product.list(1).then((res) => this.data = res);
        }
    },

    methods: {

        /**
         * Поиск товара
         */
        searchByName() {
            Product.list(1, this.searchName).then((res) => this.data = res);
        },

        /**
         * Переключение номера страницы
         * @param page
         */
        currentPageChange(page) {
            Product.list(page).then((res) => this.data = res);
        },

        /**
         * Открыть редактирование
         *
         * @param item
         */
        openEdit(item) {
            this.activeItem = item;
            this.editFormVisible = true;
        },

        /**
         * Открыть окна для создания нового товара
         */
        openNewProductForm() {
            this.activeItem = Product.getEmpty();
            this.editFormVisible = true;
        },

        /**
         * Удалить продукт
         *
         * @param item
         */
        removeProduct(item) {

            this.$confirm('Удалить')
                .then(() => {
                    Product.remove(item)
                        .then(() => {
                            this.data.data.forEach((product, index) => {
                                if(product.id === item.id) {
                                    this.data.data.splice(index, 1);
                                }
                            });
                        })
                        .catch(() => {
                            this.$notify.error({
                                title: 'Ошибка',
                                message: 'Не удалось удалить запись'
                            })
                        })
                });
        },

        /**
         * Сохранить активный продукт
         */
        save() {
            Product.save(this.activeItem)
                .then((res) => {
                    if(!this.activeItem.id) {
                        this.activeItem.id = res.id;
                        this.data.data.push(this.activeItem);
                    }
                    this.$notify.success('Сохранено');
                })
                .catch((error) => {

                    let inputError = '';

                    Object.keys(error.errors).forEach(key => {
                        inputError = error.errors[key][0];
                    });

                    this.$notify.error({
                        title: error.message,
                        message: inputError
                    });
                })
        }
    }
}
