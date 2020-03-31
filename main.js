$(document).ready(function() {

    var templateToDo = $('#todo-template').html();
    var templateFunction = Handlebars.compile(templateToDo);

    window.setInterval(timeLive, 100);


    stampaToDo();

    $('button').click(function() {
        var textCurrent = $('#add').val().trim();
        if (textCurrent.length > 0) {
            aggiuntaList(textCurrent);
            $('#add').val('');
        } else {
            alert('Inserisci un testo valido')
        }
    })

    $('#add').keypress(function(event) {
        if (event.which == 13) {
            var textCurrent = $('#add').val().trim();
            if (textCurrent.length > 0) {
                $('input').val('');
                aggiuntaList(textCurrent);
            } else {
                alert('Insert a valid task.')
            }
        }
    });

    $('#list').on('click', '.delete', function() {
        var idToDoCurrent = $(this).closest('.todo-container').attr('data-id');
        cancellaToDo(idToDoCurrent);
    })

    $('#list').on('click', '.edit', function() {
        $('.edit').parent().prev().removeClass('active');
        $('.edit').parent().siblings('.todo-text').removeClass('hidden');
        $('.edit').siblings('.save').removeClass('active');
        $('.edit').show();
        $(this).parent().prev().addClass('active');
        $(this).parent().siblings('.todo-text').addClass('hidden');
        $(this).siblings('.save').addClass('active');
        $(this).hide();
    })

    $('#list').on('click', '.save', function() {
        var idToDoCurrent = $(this).closest('.todo-container').attr('data-id');
        var textCurrent = $(this).parent().prev().val().trim();
        if (textCurrent.length > 0) {
            modificaToDo(idToDoCurrent, textCurrent);
        } else {
            alert('Insert a valid task.');
        }
    })

    $('#list').on('keypress', '.edit-input', function(event) {
        if (event.which == 13) {
            var idToDoCurrent = $(this).parent().attr('data-id');
            var textCurrent = $(this).val().trim();
            if (textCurrent.length > 0) {
                modificaToDo(idToDoCurrent, textCurrent);
            } else {
                alert('Insert a valid task.');
            }
        }
    });

    function modificaToDo(id, text) {
        $.ajax({
            'url': 'https://157.230.17.132:3011/todos/' + id,
            'method': 'PUT',
            'data': {
                'text': text
            },
            'success': function(data) {
                stampaToDo();
            },
            'error': function() {
                alert('error')
            }
        })
    }

    function cancellaToDo(id) {
        $.ajax({
            'url': 'https://157.230.17.132:3011/todos/' + id,
            'method': 'DELETE',
            'success': function(data) {
                stampaToDo();
            },
            'error': function() {
                alert('error')
            }
        })
    }

    function aggiuntaList(text) {
        $.ajax({
            'url': 'https://157.230.17.132:3011/todos/',
            'method': 'POST',
            'data': {
                'text': text
            },
            'success': function(data) {
                stampaToDo();
            },
            'error': function() {
                alert('error')
            }
        })
    }

    function stampaToDo() {
        $.ajax({
            'url': 'https://157.230.17.132:3011/todos/',
            'method': 'GET',
            'success': function(data) {
                $('#list').empty();
                for (var i = 0; i < data.length; i++) {
                    var text = data[i].text;
                    var id = data[i].id;
                    var elements = {
                        'id': id,
                        'text': text
                    };
                    var html = templateFunction(elements);
                    $('#list').append(html);
                }
            },
            'error': function() {
                alert('error')
            }
        })
    }
    
    function timeLive() {
        var time = moment().format('MMMM Do YYYY, h:mm a');
        document.getElementById('time').innerHTML = time;
    }
});

$(document).on('click', '.checkbox', function(){
    $(this).parent().toggleClass('done');
})
