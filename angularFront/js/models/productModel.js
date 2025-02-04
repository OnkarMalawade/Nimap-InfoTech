app.factory('ProductModel', function (ApiService) {
    return {
        getAll: function (page, limit) {
            return ApiService.get('/api/products?page=' + page + '&limit=' + limit);
        },
        add: function (product) {
            return ApiService.post('/api/products', product);
        },
        update: function (product) {
            return ApiService.put('/api/products/' + product.ProductId, {
                name: product.ProductName,
                category_id: product.CategoryId
            });
        },
        delete: function (id) {
            return ApiService.delete('/api/products/' + id);
        }
    };
});