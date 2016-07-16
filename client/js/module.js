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
    'anim-in-out',
  ])
  .config(config)
  .factory('socket', function(socketFactory){
    return socketFactory();
  });

  function config($stateProvider, $urlRouterProvider) {

    $stateProvider
    .state('main', {
      url: '/',
      templateUrl: '/html/main.html',
    })
    .state('home', {
      url: '/home',
      templateUrl: '/html/home.html',
    });

    $urlRouterProvider.otherwise('/');
  }
})();

