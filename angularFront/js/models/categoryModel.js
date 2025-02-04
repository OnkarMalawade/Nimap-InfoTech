app.factory('CategoryModel', function (ApiService) {
    return {
        getAll: function () {
            return ApiService.get('/api/categories');
        },
        add: function (category) {
            return ApiService.post('/api/categories', category);
        },
        update: function (category) {
            return ApiService.put('/api/categories/' + category.id, category);
        },
        delete: function (id) {
            return ApiService.delete('/api/categories/' + id);
        }
    };
});