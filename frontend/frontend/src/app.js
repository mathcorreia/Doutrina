var app = angular.module('freelaApp', []);

// frontend/frontend/src/app.js

// Função para cadastro de empresa
async function cadastrarUsuarioEmpresa(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const nomeEmpresa = document.getElementById('nomeEmpresa').value;
    const emailEmpresa = document.getElementById('emailEmpresa').value;
    const senhaEmpresa = document.getElementById('senhaEmpresa').value;
    const confirmarSenhaEmpresa = document.getElementById('confirmarSenhaEmpresa').value;

    // Validação básica no frontend (opcional, mas recomendada)
    if (senhaEmpresa !== confirmarSenhaEmpresa) {
        alert('As senhas não coincidem!');
        return;
    }

    if (!nomeEmpresa || !emailEmpresa || !senhaEmpresa) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    const dadosCadastro = {
        name: nomeEmpresa, // 'name' conforme esperado pelo backend
        email: emailEmpresa,
        password: senhaEmpresa,
        password_confirmation: confirmarSenhaEmpresa // 'password_confirmation' conforme esperado pelo backend
    };

    try {
        // ATENÇÃO: Ajuste a URL se o seu backend estiver rodando em uma porta diferente
        const response = await fetch('http://localhost:8000/api/cadastro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json' // Importante para o Laravel saber que esperamos JSON
            },
            body: JSON.stringify(dadosCadastro)
        });

        const resultado = await response.json();

        if (response.ok) { // Status HTTP 200-299
            alert(resultado.message || 'Cadastro realizado com sucesso!');
            // Opcional: Redirecionar para a página de login ou dashboard
            // window.location.href = 'paginaLogin.html';
            // Limpar formulário
            document.getElementById('formCadastroEmpresa').reset();
        } else {
            // Tratar erros de validação ou outros erros do servidor
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
    // const tipoServico = document.getElementById('tipoServico').value; // Se precisar enviar mais campos

    if (senhaFreelancer !== confirmarSenhaFreelancer) {
        alert('As senhas não coincidem!');
        return;
    }

    if (!nomeFreelancer || !emailFreelancer || !senhaFreelancer) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    const dadosCadastro = {
        name: nomeFreelancer, // 'name' conforme esperado pelo backend
        email: emailFreelancer,
        password: senhaFreelancer,
        password_confirmation: confirmarSenhaFreelancer
        // tipo_servico: tipoServico, // Exemplo se você adicionar este campo no backend
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
            // window.location.href = 'paginaLogin.html';
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

// Adicionar event listeners aos formulários (SE NÃO ESTIVEREM inline no HTML)
// Verifique se os formulários já têm `onsubmit="cadastrarUsuarioEmpresa(event)"` no HTML.
// Se não tiverem, você pode adicioná-los aqui:
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