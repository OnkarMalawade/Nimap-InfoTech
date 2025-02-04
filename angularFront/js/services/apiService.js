app.factory('ApiService', function ($http) {
    var baseUrl = 'http://localhost:3000';

    return {
        get: function (url) {
            return $http.get(baseUrl + url).then(function (response) {
                return response.data;
            });
        },
        post: function (url, data) {
            return $http.post(baseUrl + url, data).then(function (response) {
                return response.data;
            });
        },
        put: function (url, data) {
            return $http.put(baseUrl + url, data).then(function (response) {
                return response.data;
            });
        },
        delete: function (url) {
            return $http.delete(baseUrl + url).then(function (response) {
                return response.data;
            });
        }
    };
});