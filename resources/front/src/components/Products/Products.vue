<template>
    <div class="products">
        <h1>Продукты</h1>

        <el-row>
            <el-col :span="20">
                <el-input v-model="searchName" />
            </el-col>
            <el-col :span="2">
                <el-button :disabled="!searchName.length" type="primary" @click="searchByName" icon="el-icon-search" />
            </el-col>
            <el-col :span="2">
                <el-button @click="openNewProductForm" type="primary">Добавить</el-button>
            </el-col>
        </el-row>

        <el-table :data="data.data" style="width: 100%">
            <el-table-column prop="id" label="id" width="50" />
            <el-table-column prop="name" label="Имя" />
            <el-table-column prop="price" label="Цена" width="200" />
            <el-table-column width="150">
                <template slot-scope="scope">
                    <el-button @click="openEdit(scope.row)" type="primary" icon="el-icon-edit" />
                    <el-button @click="removeProduct(scope.row)" type="danger" icon="el-icon-delete" />
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
            background
            :hide-on-single-page="true"
            @current-change="currentPageChange"
            :current-page="data.current_page"
            layout="prev, pager, next"
            :page-count="data.last_page">
        </el-pagination>

        <el-dialog title="Редактирование товара" width="30%"
            :visible.sync="editFormVisible">

            <div class="product__form">
                <div class="product__form_row">
                    <div class="product__form_title">Наименование</div>
                    <el-input v-model="activeItem.name" />
                </div>

                <div class="product__form_row">
                    <div class="product__form_title">Цена</div>
                    <el-input v-model="activeItem.price" />
                </div>
            </div>

            <span slot="footer" class="dialog-footer">
                <el-button @click="editFormVisible = false">Отмена</el-button>
                <el-button type="primary" @click="save">
                    {{ activeItem.id ? 'Сохранить' : 'Добавить' }}
                </el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script src="./Products.js"></script>

<style scoped>
    .product__form_row {
        margin-bottom: 5px;
    }
    .product__form_row_title {
        margin-bottom: 3px;
    }
</style>
