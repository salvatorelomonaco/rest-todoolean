$(document).ready(function() {

    var templateToDo = $('#todo-template').html();
    var templateFunction = Handlebars.compile(templateToDo);
    stampaList();

    $('button').click(function() {
        var nuovoTodo = $('input').val();
        if (nuovoTodo.length > 0) {
            aggiuntaList(nuovoTodo);
            nuovoTodo = $('input').val('');
        } else {
            alert('Insert a valid task.')
        }
    });

    $('input').keypress(function(event) {
        if (event.which == 13) {
            var nuovoTodo = $('input').val().trim();
            if (nuovoTodo.length > 0) {
                 $('input').val('');
                aggiuntaList(nuovoTodo);
            } else {
                alert('Insert a valid task.')
            }
        }
    });

    $('#list').on('click', '.delete', function(){
        var idToDoCurrent = $(this).parent().attr('data-id');
        $.ajax({
            'url': 'http://157.230.17.132:3011/todos/' + idToDoCurrent,
            'method': 'DELETE',
            'success': function(data) {
                stampaList();
            },
            'error': function(data) {
                alert('Error');
            }
        });
    });

    function aggiuntaList(text) {
        $.ajax({
            'url': 'http://157.230.17.132:3011/todos',
            'method': 'POST',
            'data': {
                'text': text
            },
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
            'url': 'http://157.230.17.132:3011/todos/',
            'method': 'GET',
            'success': function(data) {
                $('#list').empty();
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
