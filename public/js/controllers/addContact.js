angular.module('NewContact').controller('ContactController', function addContact($http, $scope) {

    $scope.search = function () {
        $http.get('http://api.postmon.com.br/cep/' + $scope.cep).success(function (local) {
            $scope.local_encontrado = local;
            console.log(local);
        });
    };

    $scope.enter = function (e) {
        if (e.keyCode == 13) {
            $scope.busca();
        };
    };
});
