angular.module('tableModule', ['notesModule'])
.controller('TableController', ['$scope', '$rootScope', 'notesService', function($scope, $rootScope, notesService) {

    $scope.notes = [];

    $scope.removeNote = function(id) {
        notesService.removeNote(id);
        $rootScope.$emit('refresh');
    };

    $rootScope.$on('refresh', function() {
        $scope.notes = notesService.getNotes();
    });

}]);