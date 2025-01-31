var app = angular.module('myApp', []);

app.controller('MainController', function ($scope, $http) {
    $scope.categories = [];
    $scope.products = [];
    $scope.newCategory = {};
    $scope.newProduct = {};
    $scope.currentPage = 1;
    $scope.itemsPerPage = 10;
    $scope.totalItems = 0;
    $scope.selectedTab = 'categories'; // Default tab
    $scope.editedCategory = null; // For editing categories
    $scope.editedProduct = null; // For editing products

    // Fetch Categories
    $scope.getCategories = function () {
        $http.get('http://localhost:3000/api/categories')
            .then(function (response) {
                $scope.categories = response.data;
            })
            .catch(function (error) {
                console.error('Error fetching categories:', error);
            });
    };

    // Fetch Products with Pagination
    $scope.getProducts = function () {
        const offset = ($scope.currentPage - 1) * $scope.itemsPerPage;
        $http.get(`http://localhost:3000/api/products?page=${$scope.currentPage}&limit=${$scope.itemsPerPage}`)
            .then(function (response) {
                $scope.products = response.data.products;
                $scope.totalItems = response.data.totalCount;
            })
            .catch(function (error) {
                console.error('Error fetching products:', error);
            });
    };

    // Add Category
    $scope.addCategory = function () {
        $http.post('http://localhost:3000/api/categories', $scope.newCategory)
            .then(function (response) {
                $scope.categories.push(response.data);
                $scope.newCategory = {};
            })
            .catch(function (error) {
                console.error('Error adding category:', error);
            });
    };

    // Add Product
    $scope.addProduct = function () {
        $http.post('http://localhost:3000/api/products', $scope.newProduct)
            .then(function (response) {
                $scope.products.push(response.data);
                $scope.newProduct = {};
                $scope.getProducts(); // Refresh product list
            })
            .catch(function (error) {
                console.error('Error adding product:', error);
            });
    };

    // Delete Category
    $scope.deleteCategory = function (id) {
        $http.delete(`http://localhost:3000/api/categories/${id}`)
            .then(function () {
                $scope.categories = $scope.categories.filter(cat => cat.id !== id);
            })
            .catch(function (error) {
                console.error('Error deleting category:', error);
            });
    };

    // Delete Product
    $scope.deleteProduct = function (id) {
        $http.delete(`http://localhost:3000/api/products/${id}`)
            .then(function () {
                $scope.products = $scope.products.filter(prod => prod.ProductId !== id);
            })
            .catch(function (error) {
                console.error('Error deleting product:', error);
            });
    };

    // Edit Category
    $scope.editCategory = function (category) {
        $scope.editedCategory = angular.copy(category);
    };

    // Save Edited Category
    $scope.saveEditedCategory = function () {
        $http.put(`http://localhost:3000/api/categories/${$scope.editedCategory.id}`, $scope.editedCategory)
            .then(function () {
                const index = $scope.categories.findIndex(cat => cat.id === $scope.editedCategory.id);
                $scope.categories[index] = $scope.editedCategory;
                $scope.editedCategory = null;
            })
            .catch(function (error) {
                console.error('Error updating category:', error);
            });
    };

    // Edit Product
    $scope.editProduct = function (product) {
        $scope.editedProduct = angular.copy(product);
    };

    // Save Edited Product
    $scope.saveEditedProduct = function () {
        $http.put(`http://localhost:3000/api/products/${$scope.editedProduct.ProductId}`, {
            name: $scope.editedProduct.ProductName,
            category_id: $scope.editedProduct.CategoryId
        })
            .then(function () {
                const index = $scope.products.findIndex(prod => prod.ProductId === $scope.editedProduct.ProductId);
                $scope.products[index] = $scope.editedProduct;
                $scope.editedProduct = null;
            })
            .catch(function (error) {
                console.error('Error updating product:', error);
            });
    };

    // Pagination
    $scope.changePage = function (page) {
        $scope.currentPage = page;
        $scope.getProducts();
    };

    // Switch Tab
    $scope.switchTab = function (tab) {
        $scope.selectedTab = tab;
    };

    // Load initial data
    $scope.getCategories();
    $scope.getProducts();
});