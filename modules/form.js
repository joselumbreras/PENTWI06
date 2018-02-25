angular.module('formModule', ['notesModule'])
.controller('FormController', ['$scope', '$rootScope', 'notesService', function($scope, $rootScope, notesService) {

    $scope.saveNote = function() {
        try {
            var properties = {
                title: $scope.title,
                author: $scope.author,
                tags: $scope.tags,
                text: $scope.text
            };
    
            var note = notesService.createNote(properties);
    
            notesService.saveNote(note);
            $rootScope.$emit('refresh');

            $scope.clearFields();
        } catch (error) {
            alert(error);
        }        
    };

    $scope.clearFields = function() {
        $scope.title = '';
        $scope.author = '';
        $scope.tags = '';
        $scope.text = '';
    };

}]);