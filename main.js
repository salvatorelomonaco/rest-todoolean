$(document).ready(function() {

    var templateToDo = $('#todo-template').html();
    var templateFunction = Handlebars.compile(templateToDo);
    stampaList();

    $('button').click(function() {
        var nuovoTodo = $('input').val();
        aggiuntaList(nuovoTodo);
    });

    function aggiuntaList(text) {
        $('#list').empty();
        $.ajax({
            'url': 'http://157.230.17.132:3011/todos',
            'method': 'POST',
            'success': function(data) {
                stampaList();
            },
            'error': function(data) {
                alert('Error');
            }
        });
    };

    function stampaList() {
        $.ajax({
            'url': 'http://157.230.17.132:3011/todos',
            'method': 'GET',
            'success': function(data) {
                var toDos = data
                for (var i = 0; i < toDos.length; i++) {
                    var toDoText = toDos[i].text;
                    var toDoId = toDos[i].id;
                    var elements = {
                        'id': toDoId,
                        'text': toDoText
                    };
                    var html = templateFunction(elements);
                    $('#list').append(html);
                };
            },
            'error': function(data) {
                alert('Error');
            }
        });
    };
});
