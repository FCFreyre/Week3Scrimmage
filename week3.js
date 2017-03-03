var subreddits = ['funny', 'pics', 'AdviceAnimals','aww']
for (var i = 0; i < subreddits.length; i++) {
  var reddit = $.get('https://galvanize-cors.herokuapp.com/https://www.reddit.com/r/'+ subreddits[i] +'.json')
  reddit.done((data) => {
      if(reddit.status !== 200){
        console.log("failed: " + subreddits[i])
        return;
      }
      var isimage = false;
      while(isimage == false){

        var redditContent = data.data.children[2]
        console.log(redditContent)
        var redditURL = redditContent.data.url
        var type = redditURL.substring(redditURL.length - 3,redditURL.length)
        
        var subName = redditContent.data.subreddit_name_prefixed;
        console.log(subName);
        var postTitle = redditContent.data.title;
        console.log(postTitle)
        console.log(redditURL);
        var redditComment = redditContent.data.permalink;
        var comments = $.get('https://galvanize-cors.herokuapp.com/https://www.reddit.com' + redditComment + '.json')
        comments.done((foo) => {
            if(comments.status !== 200){
              console.log("comments failed: " + subreddits[i])
              return;
            }
            var topComment = foo[1].data.children[0].data.body
            console.log(topComment)
            displayContent(subName,postTitle,redditURL,topComment);

        })
      }
    })
}

function displayContent(subred, title, post, comment){
  $('#display').append("<div class='weed'><p>"+subred+"</p><p>"+title+"</p><img src='"+post+"'><p>"+comment+"</p></div>")
}
