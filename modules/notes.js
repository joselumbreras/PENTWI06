angular.module('notesModule', [])
.factory('notesService', [function() {

    const TAGS_REGEX = /".*?"|[^,]*/g;

    var notes = {};
    var counter = 0;

    function Note(properties) {
        if (!properties.title || (properties.title = properties.title.trim()).length == 0) {
            throw 'Debe ingresar un título para la nota';
        }

        if (!properties.author || (properties.author = properties.author.trim()).length == 0) {
            throw 'Debe ingresar un autor para la nota';
        }

        if (!properties.tags || !TAGS_REGEX.test(properties.tags)) {
            throw 'Debe ingresar al menos una etiqueta (separadas por coma)';
        }

        if (!properties.text || (properties.text = properties.text.trim()).length == 0) {
            throw 'Debe ingresar contenido a la nota';
        }

        this.title = properties.title;
        this.author = properties.author;
        this.tags = properties.tags;
        this.text = properties.text;
    }

    Note.prototype.getTagList = function() {
        return this.tags.match(TAGS_REGEX).join(', ');
    };

    return {

        createNote: function(properties) {
            var note = new Note(properties);
            note.id = ++counter;
            return note;
        },

        saveNote: function(note) {
            notes[note.id] = note;
        },

        removeNote: function(id) {
            delete notes[id];
        },

        getNotes: function() {
            return Object.keys(notes).map(function(key) { return notes[key]; });
        }

    };

}]);