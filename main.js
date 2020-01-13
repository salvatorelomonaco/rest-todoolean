$(document).ready(function() {
    stampaList();

    $('button').click(function() {
        var nuovoTodo = $('input').val();
        aggiuntaList(nuovoTodo);
    });

    function aggiuntaList() {
        $('ul').empty()
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
                var todos = data
                for (var i = 0; i < todos.length; i++) {
                    var todoText = todos[i].text;
                    $('ul').append('<li>' + todoText + '</li>');
                };
            },
            'error': function(data) {
                alert('Error');
            }
        });
    };
});
