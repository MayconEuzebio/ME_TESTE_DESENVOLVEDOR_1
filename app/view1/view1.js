'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', function($scope) {
  $scope.viewResults = [];
  $scope.disabledSize = false;
  $scope.descriptionTeste = false;

  $scope.teste = function() {
    $scope.descriptionTeste = true;
    $scope.size = "5 5";
    $scope.position = "1 2 N";
    $scope.commands = "LMLMLMLMM";
    $scope.submit();
    $scope.position = "3 3 E";
    $scope.commands = "MMRMMRMRRM";
    $scope.submit();
  };


  $scope.submit = function () {

    $scope.disabledSize = true;

    var size = $scope.size.split(" "),
        position = $scope.position.toUpperCase().split(' '),
        commands = $scope.commands.toUpperCase().split(''),
        more = 1, // increase when moving
        direction = ["N", "E", "S", "W"];

    if(position[0] > size[0] || position[1] > size[1]){
      return alert('position above the permitted zone');
    }

    for(var i = 0, leng = commands.length; i < leng; i++){

      if(commands[i] == "L"){
        position[2] = spinLeft(position[2]);
      }
      else if (commands[i] == "R"){
        position[2] = spinRight(position[2]);
      }
      else if (commands[i] == "M"){
        position = move(position);
      }
      else{
        alert('Command not found!');
      }
      console.log(position);
    }

    $scope.viewResults.push(position.join(" "));

    function move(result) {
      result = [Number(result[0]), Number(result[1]), result[2]];
      switch (result[2])
      {
        case "N":
          return [ result[0], result[1] + more, result[2]];
          break;
        case "W":
          return [ result[0] - more, result[1], result[2]];
          break;
        case "S":
          return [ result[0], result[1] - more, result[2]];
          break;
        case "E":
          return [ result[0] + more, result[1], result[2]];
          break;
      }
    }

    function spinLeft(location) {
      var j = direction.indexOf(location) - 1;
      if(j < 0){
        return direction[direction.length - 1];
      }
      return direction[j];
    }

    function spinRight(location) {
      var j = direction.indexOf(location) + 1;
      if(j >= direction.length){
        return direction[0];
      }
      return direction[j];
    }

  };
}]);