var myDevApp = angular.module('myDevApp', ['ngRoute', 'ngAnimate']);

myDevApp.config(['$routeProvider', function($routeProvider) {
    
    //$locationProvider.html5Mode(true);

    $routeProvider
    .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'DeveloperController'
    })
    .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactController'
    })
    .when('/contact-success', {
        templateUrl: 'views/contact-success.html',
        controller: 'ContactController'
    })
    .when('/directory',{
        templateUrl: 'views/directory.html',
        controller: 'DeveloperController'
    }).otherwise({
        redirectTo: '/home'
    });
}]);

myDevApp.directive('randomDev', [function(){
    
    return {
        //E -element A-Attribute
        restrict: 'E',
        scope: {
            developers: '=',
            title: '='
        },
        templateUrl: 'views/random.html',
        //Allow html tags to be valid within directive
        transclude: true,
        //replaces html tags names with the outermost tag name
        replace: true,
        controller: function($scope){
            //floor- rounds down | random - returns value between 0 and 1
            $scope.random = Math.floor(Math.random() * 4);
        }
    };
    
}]);

myDevApp.controller('DeveloperController', ['$scope', '$http', function($scope, $http){

    $scope.removeDeveloper = function(developer){
        var removedDeveloper = $scope.developers.indexOf(developer);
        $scope.developers.splice(removedDeveloper, 1);
    };

    $scope.addDev = function(){
        $scope.developers.push({
            name: $scope.newdev.name,
            belt: $scope.newdev.belt,
            rate: parseInt($scope.newdev.rate),
            available: true
        });

        $scope.newdev.name="";
        $scope.newdev.belt="";
        $scope.newdev.rate="";

    };
    
    $scope.removeAll = function(){
        $scope.developers = [];
    };
                                            
    $http.get('data/developer.json').success(function(data){
        $scope.developers = data;
    });
    
}]);

myDevApp.controller('ContactController', ['$scope', '$location', function($scope, $location) {
    
    $scope.sendMessage = function(){
        
        $location.path('/contact-success');
        
    };
    
}]);