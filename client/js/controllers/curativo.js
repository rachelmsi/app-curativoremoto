angular
  .module('app')
  //Controler para visualizar todas as lesoes
  .controller('AllLesoesController', ['$scope', 'Lesao', function($scope,
    Lesao) {
    $scope.lesoes = Lesao.find({
      filter: {
        _id: false, tipo: true
      }
    });
  }])
  //Controler para visualizar todos os materiais
  .controller('AllMateriaisController', ['$scope', 'Materiais', function($scope,
    Materiais) {
    $scope.materiais = Materiais.find({
        filter:{limpeza:true}
    });

  }])
  //Controler para visualizar todos os curativos
  .controller('AllCurativosController', ['$scope', 'Curativo', function($scope,
    Curativo) {
    $scope.curativos = Curativo.find({
  
    });
  }])
  //Controler para adicionar os curativos
  .controller('AddCurativoController', ['$scope', 'Lesao', 'Curativo', 'Materiais',
    '$state',
    function($scope, Lesao, Curativo,Materiais, $state) {
      $scope.action = 'Adicionar';
      $scope.lesoes = [];
      $scope.limpezas = [];
      $scope.aplicacaos = [];
      $scope.oclusaos = [];
      $scope.fixacaos = [];
      $scope.selectedLesao;
      $scope.selectedLimpeza;
      $scope.selectedAplicacao;
      $scope.selectedOclusao;
      $scope.selectedFixacao;
      $scope.curativo = {};
      $scope.isDisabled = false;

      Lesao
        .find()
        .$promise
        .then(function(lesoes) {
          $scope.lesoes = lesoes;
          $scope.selectedLesao = $scope.selectedLesao || Lesao[0];
        });
      Materiais
      .find()
      .$promise
      .then(function(results){
          angular.forEach(results, function(value,key){
            if(value.limpeza !== undefined){
              $scope.limpezas.push(value);
            }
 
            if(value.aplicacao !== undefined){
              $scope.aplicacaos.push(value);
            }

            if(value.oclusao !== undefined){
              $scope.oclusaos.push(value);
            }

            if(value.fixacao !== undefined){
              $scope.fixacaos.push(value);
            }
          
          });  

          $scope.selectedLimpeza = $scope.selectedLimpeza || Materiais[0];
          $scope.selectedAplicacao = $scope.selectedAplicacao || Materiais[0];
          $scope.selectedOclusao = $scope.selectedOclusao || Materiais[0];
          $scope.selectedFixacao = $scope.selectedFixacao || Materiais[0];
      });
      $scope.submitForm = function() {
        Curativo
          .create({
            nomePaciente: $scope.curativo.nomePaciente,
            frequencia: $scope.curativo.frequencia,
            tipoDeLesao: $scope.selectedLesao.tipo,
            limpeza: $scope.selectedLimpeza.limpeza,
            aplicacao: $scope.selectedAplicacao.aplicacao,
            oclusao: $scope.selectedOclusao.oclusao,
            fixacao: $scope.selectedFixacao.fixacao,
            data: $scope.curativo.data
          })
          .$promise
          .then(function() {
            $state.go('all-curativos');
          });
      };
    }
  ]);


