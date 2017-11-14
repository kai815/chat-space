$(document).on('turbolinks:load', function() {
  $(function() {
    function buildHTML(message){
      console.log(message.image)
      var html = `<div class = "contents__chat__content__messages">
                    <div class = "messaeges_user">
                      ${ message.user_name }
                    </div>
                    <div class = "messages_date">
                      ${ message.created_at }
                    </div>
                    <div class = "messages_content">
                      ${ message.body }
                    </div>
                    <div class = "messages_image">
                      <img src =${ message.image.url }>
                    </div>
                  </div>`
      return html;
    }
    $('#new_message').on('submit', function(e){
      e.preventDefault();
      var formData = new FormData(this);
      var url = window.location.href
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
        $('.contents__chat__content').append(html)
        $('#message_body').val('')
        $('.contents__chat__content').stop().animate({
            scrollTop: $(document).height()
        })
      })
      .fail(function(){
      alert('error');
      })
    })
  });
});
