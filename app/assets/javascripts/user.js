$(document).on('turbolinks:load', function() {
  $(function() {

    var user_search_result = $("#user-search-result")

    function appendUser(user) {
      var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ user.name }</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${ user.id } data-user-name=${ user.name }>追加</a>
                  </div>`
      user_search_result.append(html);
    }

    var group_members_list = $("#chat-group-users")

    function appendGroupMember(user_name, user_id) {
      var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                    <input name='group[user_ids][]' type='hidden' value=${ user_id }>
                    <p class='chat-group-user__name'>${ user_name }</p>
                    <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'data-user-id=${ user_id } data-user-name=${ user_name }>削除</a>
                </div>`
      group_members_list.append(html);
    }

    function appendNoUser(user){
      var html = `<div class="chat-group-user clearfix">
                  ${ user }
                  </div>`
      user_search_result.append(html);
    }


    $("#user-search-field").on("keyup", function() {
      var input = $("#user-search-field").val();
      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input },
        dataType: 'json'
      })
      .done(function(users) {
        $("#user-search-result").empty();
        if (users.length !== 0 ) {
          users.forEach(function(user){
            appendUser(user)
          });
        }
        else {
          appendNoUser("一致するユーザーはいません");
        }
      })

      .fail(function() {
        alert('ユーザー検索に失敗しました');
      })
    });

    $("#user-search-result").on("click", ".user-search-add", function() {
          console.log(this);
          var add_user_name = $(this).data("user-name");
          var add_user_id = $(this).data("user-id");
          appendGroupMember(add_user_name, add_user_id);
          $(this).parent().remove()
      });

    $("#chat-group-users").on("click", ".chat-group-user__btn--remove",function(){
      console.log(this)
      $(this).parent().remove()
    });
  });
});
