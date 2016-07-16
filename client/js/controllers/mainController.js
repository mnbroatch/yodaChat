// MainController
(() => {
  angular
  .module('myApp')
  .controller('mainController', mainController);

  function mainController($scope,$http,socket) {
    const vm = this; // viewmodel capture controllerAs with vm Y032

    vm.name = 'mainController';

    $scope.newMessage = {};
    $scope.messageArray = [];


    $http.get('/api/messages')
    .then(messages => {
      $scope.messageArray = messages.data;
      console.log('arr',$scope.messageArray);
      return;
    });

    $scope.sendMessage = message => {
      let text = document.getElementById('chat-input');
      text.classList = "star-wars-crawl";
      setTimeout(()=>{
        text.value = "";
        text.classList = "";
      },3001)
      $http.post('/api/messages', message)
      .then(returnedMessage => {
        socket.emit('sendMessage', returnedMessage);
      });
    };

    socket.on('newMessage',function(data){
      $scope.messageArray.push(data.data);
      console.log('$scope.messageArray',$scope.messageArray);
    })
  }
})();
