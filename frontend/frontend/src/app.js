var app = angular.module('freelaApp', []);

app.controller('MainController', ['$scope', function($scope) {
  $scope.mensagem = "Encontre os melhores freelancers para seus projetos";

  $scope.form = {
    nome: '',
    email: '',
    mensagem: ''
  };

  $scope.enviarMensagem = function () {
    alert(`Mensagem enviada por ${$scope.form.nome} (${ $scope.form.email }):\n${$scope.form.mensagem}`);
    $scope.form = {};
  };
}]);
app.directive('menu', function() {
  return {
    restrict: 'E',
    templateUrl: 'menu.html',
    controller: ['$scope', function($scope) {
      $scope.menuItems = [
        { name: 'Home', link: '#/' },
        { name: 'Sobre', link: '#/sobre' },
        { name: 'Contato', link: '#/contato' }
      ];
    }]
  };
});
app.directive('footer', function() {
  return {
    restrict: 'E',
    templateUrl: 'footer.html',
    controller: ['$scope', function($scope) {
      $scope.footerText = '© 2023 Freelance App';
    }]
  };
});