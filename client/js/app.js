angular
  .module('app', [
    'ui.router',
    'lbServices'
  ])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider,
    $urlRouterProvider) {
    $stateProvider
      .state('add-curativo', {
        url: '/add-curativo',
        templateUrl: 'views/curativo-form.html',
        controller: 'AddCurativoController',
        authenticate: true
      })
      .state('all-lesoes', {
        url: '/all-lesoes',
        templateUrl: 'views/all-lesoes.html',
        controller: 'AllLesoesController'
      })
      .state('all-curativos', {
        url: '/all-curativos',
        templateUrl: 'views/all-curativos.html',
        controller: 'AllCurativosController'
      })
      .state('all-materiais', {
        url: '/all-materiais',
        templateUrl: 'views/all-materiais.html',
        controller: 'AllMateriaisController'
      })
      .state('forbidden', {
        url: '/forbidden',
        templateUrl: 'views/forbidden.html',
      })
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'AuthLoginController'
      })
      .state('logout', {
        url: '/logout',
        controller: 'AuthLogoutController'
      })
      .state('sign-up', {
        url: '/sign-up',
        templateUrl: 'views/sign-up-form.html',
        controller: 'SignUpController',
      })
      .state('sign-up-success', {
        url: '/sign-up/success',
        templateUrl: 'views/sign-up-success.html'
      });
    $urlRouterProvider.otherwise('/');
  }])
  .run(['$rootScope', '$state', function($rootScope, $state) {
    $rootScope.$on('$stateChangeStart', function(event, next) {
      // redirect to login page if not logged in
      if (next.authenticate && !$rootScope.currentUser) {
        event.preventDefault(); //prevent current page from loading
        $state.go('forbidden');
      }
    });
  }]);