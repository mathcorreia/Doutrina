var app = angular.module('freelaApp', []);


// Função para cadastro de empresa
async function cadastrarUsuarioEmpresa(event) {
    event.preventDefault(); 
    const nomeEmpresa = document.getElementById('nomeEmpresa').value;
    const emailEmpresa = document.getElementById('emailEmpresa').value;
    const senhaEmpresa = document.getElementById('senhaEmpresa').value;
    const confirmarSenhaEmpresa = document.getElementById('confirmarSenhaEmpresa').value;

    if (senhaEmpresa !== confirmarSenhaEmpresa) {
        alert('As senhas não coincidem!');
        return;
    }

    if (!nomeEmpresa || !emailEmpresa || !senhaEmpresa) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    const dadosCadastro = {
        name: nomeEmpresa, 
        email: emailEmpresa,
        password: senhaEmpresa,
        password_confirmation: confirmarSenhaEmpresa 
    };

    try {
        const response = await fetch('http://localhost:8000/api/cadastro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json' 
            },
            body: JSON.stringify(dadosCadastro)
        });

        const resultado = await response.json();

        if (response.ok) { 
            alert(resultado.message || 'Cadastro realizado com sucesso!');
            
            document.getElementById('formCadastroEmpresa').reset();
        } else {
            if (resultado.errors) {
                let errosMsg = 'Erro de validação:\n';
                for (const campo in resultado.errors) {
                    errosMsg += `${resultado.errors[campo].join(', ')}\n`;
                }
                alert(errosMsg);
            } else {
                alert(resultado.message || 'Erro ao realizar o cadastro. Tente novamente.');
            }
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro ao conectar com o servidor. Verifique sua conexão ou tente mais tarde.');
    }
}

// Função para cadastro de freelancer
async function cadastrarUsuarioFreelancer(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const nomeFreelancer = document.getElementById('nomeFreelancer').value;
    const emailFreelancer = document.getElementById('emailFreelancer').value;
    const senhaFreelancer = document.getElementById('senhaFreelancer').value;
    const confirmarSenhaFreelancer = document.getElementById('confirmarSenhaFreelancer').value;

    if (senhaFreelancer !== confirmarSenhaFreelancer) {
        alert('As senhas não coincidem!');
        return;
    }

    if (!nomeFreelancer || !emailFreelancer || !senhaFreelancer) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    const dadosCadastro = {
        name: nomeFreelancer, 
        email: emailFreelancer,
        password: senhaFreelancer,
        password_confirmation: confirmarSenhaFreelancer
    };

    try {
        const response = await fetch('http://localhost:8000/api/cadastro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(dadosCadastro)
        });

        const resultado = await response.json();

        if (response.ok) {
            alert(resultado.message || 'Cadastro realizado com sucesso!');
            document.getElementById('formCadastroFreelancer').reset();
        } else {
            if (resultado.errors) {
                let errosMsg = 'Erro de validação:\n';
                for (const campo in resultado.errors) {
                    errosMsg += `${resultado.errors[campo].join(', ')}\n`;
                }
                alert(errosMsg);
            } else {
                alert(resultado.message || 'Erro ao realizar o cadastro. Tente novamente.');
            }
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro ao conectar com o servidor. Verifique sua conexão ou tente mais tarde.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const formEmpresa = document.getElementById('formCadastroEmpresa');
    if (formEmpresa) {
        formEmpresa.addEventListener('submit', cadastrarUsuarioEmpresa);
    }

    const formFreelancer = document.getElementById('formCadastroFreelancer');
    if (formFreelancer) {
        formFreelancer.addEventListener('submit', cadastrarUsuarioFreelancer);
    }
});

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