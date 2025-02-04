app.controller('MainController', function ($scope, CategoryModel, ProductModel) {
    $scope.categories = [];
    $scope.products = [];
    $scope.newCategory = {};
    $scope.newProduct = {};
    $scope.currentPage = 1;
    $scope.itemsPerPage = 10;
    $scope.totalItems = 0;
    $scope.selectedTab = 'categories';
    $scope.editedCategory = null;
    $scope.editedProduct = null;

    $scope.getCategories = function () {
        CategoryModel.getAll().then(function (categories) {
            $scope.categories = categories;
        });
    };

    $scope.getProducts = function () {
        ProductModel.getAll($scope.currentPage, $scope.itemsPerPage).then(function (data) {
            $scope.products = data.products;
            $scope.totalItems = data.totalCount;
        });
    };

    $scope.addCategory = function () {
        CategoryModel.add($scope.newCategory).then(function (category) {
            $scope.categories.push(category);
            $scope.newCategory = {};
        });
    };

    $scope.addProduct = function () {
        ProductModel.add($scope.newProduct).then(function (product) {
            $scope.products.push(product);
            $scope.newProduct = {};
            $scope.getProducts();
        });
    };

    $scope.deleteCategory = function (id) {
        CategoryModel.delete(id).then(function () {
            $scope.categories = $scope.categories.filter(cat => cat.id !== id);
        });
    };

    $scope.deleteProduct = function (id) {
        ProductModel.delete(id).then(function () {
            $scope.products = $scope.products.filter(prod => prod.ProductId !== id);
        });
    };

    $scope.editCategory = function (category) {
        $scope.editedCategory = angular.copy(category);
    };

    $scope.saveEditedCategory = function () {
        CategoryModel.update($scope.editedCategory).then(function () {
            const index = $scope.categories.findIndex(cat => cat.id === $scope.editedCategory.id);
            $scope.categories[index] = $scope.editedCategory;
            $scope.editedCategory = null;
        });
    };

    $scope.editProduct = function (product) {
        $scope.editedProduct = angular.copy(product);
    };

    $scope.saveEditedProduct = function () {
        ProductModel.update($scope.editedProduct).then(function () {
            const index = $scope.products.findIndex(prod => prod.ProductId === $scope.editedProduct.ProductId);
            $scope.products[index] = $scope.editedProduct;
            $scope.editedProduct = null;
        });
    };

    $scope.changePage = function (page) {
        $scope.currentPage = page;
        $scope.getProducts();
    };

    $scope.switchTab = function (tab) {
        $scope.selectedTab = tab;
    };

    // Load initial data
    $scope.getCategories();
    $scope.getProducts();
});