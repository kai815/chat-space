$(document).on('turbolinks:load', function() {
  // メッセージ自動更新
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
                    // '<div class="message_delete_buturn">'+
                    // '<a data-method="delete" href="/groups/'+message.group_id+'/messages/'+message.id+'">'
                    // +'Delete'+
                    // '</a>' +
                    // '</div>'+
                  '</div>'
      return html;
    }

    function flashNewMessageHtml() {
      var html = '<div class="flash flash__notice">'
                    +'新着メッセージがあります'+
                '</div>';
          return html
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
          var newMessageAlert = flashNewMessageHtml()
          json.messages.forEach(function(message) {
            if (message.id > id ) {
              insertHTML += buildHTML(message);
              $('.contents__chat__content__messages').append(insertHTML);
              $('.flash__notice').remove()
              $('header').prepend(newMessageAlert)
              $('.flash__notice').on('click', function(e){
                $(this).remove()
                $('.contents__chat__content').animate({
                  scrollTop: $('.contents__chat__content')[0].scrollHeight}, 1000);
                });
              $('.flash__notice').delay(10000).queue(function(){
                $('.flash__notice').remove();
              })
              }
          });
        })
        .fail(function(json) {
          alert('自動更新に失敗しました');
        });
    } else {
          clearInterval(interval);
      }} , 5 * 1000 );
  });

  //メッセージ送信の非同期通信
  $(function() {

    function buildNewMessageHTML(message){
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
                    '<div class="message_delete_buturn">'+
                    '<a data-method="delete" href="/groups/'+message.group_id+'/messages/'+message.id+'">'
                    +'Delete'+
                    '</a>' +
                    '</div>'+
                  '</div>'
      return html;
    }

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
        var html = buildNewMessageHTML(data);
        $('.contents__chat__content__messages').append(html);
        $('#message_body').val('');
        $('.contents__chat__content').animate({
            scrollTop: $('.contents__chat__content')[0].scrollHeight
        },'normal');
        $('#message_submit_btn').prop('disabled', false)
      })
      .fail(function(){
      alert('error');
      })
    })

  });
});

