// MODULE //////////
(() => {
  angular
  .module('myApp', [
    'ui.router',
    'oitozero.ngSweetAlert',
    'ngAnimate',
    'ngTouch',
    'ui.bootstrap',
    'btford.socket-io',
  ])
  .config(config)
  .factory('socket', function(socketFactory){
    return socketFactory();
  });

  function config($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/html/home.html',
    });
    $urlRouterProvider.otherwise('/');
  }
})();

