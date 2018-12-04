function toggleLike(element) {
    var id = $(element).closest('.list').find('.idtweet').text();
    id = id.replace('@','');
    id = id.replace(':','');
//    console.log("this is ", id);
    $(element).toggleClass('far fa-heart');
    $(element).toggleClass('fas fa-heart');
    post_url ='/updatepost/'+':'+id;
    console.log(post_url);
    $.ajax({
        url: post_url,
        method: "POST",
        }).done(function(res){
            console.log(res);
    });
}


$(document).ready(function(){
    $.ajax({
        type: "GET",
        data: {
            request: "tweet"
        },
        contentType: 'json',
        url: '/getTweet',						
        success: function(data){
            if(data){
                console.log('success');
                var txt = "";
                for(var i=0; i<data.length; i++){
                    txt += "<div class='container'><div class='list'><img src='wonderwoman.png' class='avatar'><div class='idtweet'>@"+data[i].idtweet+":</div>\
                    <div style=\"height:60px\">"+data[i].text+"\
                    </div>\
                    <div>\
                        <td><i id='like' class='far fa-heart' onclick='toggleLike(this)'></i></td>\
                    </div>\
                    </div>\
                    </div>";
                }
                $(".tweetBody").append(txt);
            }
        },
        error: function(){
            console.log('ajax error');
        }
    });
});
