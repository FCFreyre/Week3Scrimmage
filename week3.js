var subreddits = ['funny', 'pics', 'AdviceAnimals','aww','memes','earthporn','spaceporn']
for (let i = 0; i < subreddits.length; i++) {
  var reddit = $.get('https://galvanize-cors.herokuapp.com/https://www.reddit.com/r/'+ subreddits[i] +'.json')
  reddit.done((data) => {
      if(reddit.status !== 200){
        console.log("failed: " + i)
        console.log(data)
        //return;
      }

      //run while loop until a post have a "jpg" or "png" picture url
      var isImage = false;
      var childPos = 1;
      while(isImage == false){
        childPos += 1;
        var redditContent = data.data.children[childPos]
        var redditURL = redditContent.data.url
        var type = redditURL.substring(redditURL.length - 3,redditURL.length)
        if(type === "jpg" || type === "png"){
          isImage = true;
        } else {console.log("failed: " + type)}
      }
      //get the rest of information - subreddit, title, top comment
      var subName = redditContent.data.subreddit_name_prefixed;
      //console.log(subName);
      var postTitle = redditContent.data.title;
      //console.log(postTitle)
      //console.log(redditURL);
      var redditComment = redditContent.data.permalink;
      var comments = $.get('https://galvanize-cors.herokuapp.com/https://www.reddit.com' + redditComment + '.json')
      comments.done((foo) => {
          if(comments.status !== 200){
            console.log("comments failed: " + subreddits[i])
            return;
          }
          var topComment = foo[1].data.children[0].data.body
          //console.log(topComment)
          displayContent(subName,postTitle,redditURL,topComment);

      })
    })
}

//function to append information into display div
function displayContent(subred, title, post, comment){
  $('.main-body').append("<div class='responsive-img card-panel light blue col lighten-2 s12 l4'><h2>"+subred+"</h2><h5>"+title+"</h5><img class='responsive-img' src='"+post+"'><p>"+comment+"</p></div>")
}
