$(document).on('turbolinks:load', function() {
  $(function() {

    function buildHTML(message){
      insertImage = (message.image.url)? '<div class = "message_image">'+
                                            '<img src=' + message.image.url +'>'+
                                          '</div>':'';
      var html = '<div class = "chat_message" data-message-id= '+ message.id +' >'+
                    '<div class = "messaege_user">'
                      + message.user_name +
                    '</div>'+
                    '<div class = "message_date">'
                      + message.created_at +
                    '</div>'+
                    '<div class = "message_body">'
                      + message.body +
                    '</div>'
                    + insertImage +
                  '</div>'
      return html;
    }

    var interval = setInterval(function() {
      if (window.location.href.match(/\/groups\/\d+\/messages/)) {
        $.ajax({
          url: location.href,
          dataType: 'json',
        })
        .done(function(json) {
          var array_of_messages = $('.chat_message')
          var id = array_of_messages[array_of_messages.length-1].getAttribute('data-message-id')
          var insertHTML = '';
          json.messages.forEach(function(message) {
            if (message.id > id ) {
              insertHTML += buildHTML(message);
              $('.contents__chat__content__messages').append(insertHTML);
          $('.contents__chat__content').animate({
            scrollTop: $('.contents__chat__content')[0].scrollHeight
        }, 1000);
            }
          });
        })
        .fail(function(json) {
          alert('自動更新に失敗しました');
        });
    } else {
          clearInterval(interval);
      }} , 5 * 1000 );

    $('#new_message').on('submit', function(e){
      e.preventDefault();
      var formData = new FormData(this);
      var url = window.location.href;
      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(data) {
        var html = buildHTML(data);
        $('.contents__chat__content__messages').append(html)
        $('#message_body').val('')
        $('.contents__chat__content').animate({
            scrollTop: $('.contents__chat__content')[0].scrollHeight
        },'normal');
      })
      .fail(function(){
      alert('error');
      })
    })

  });
});

