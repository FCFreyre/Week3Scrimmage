var reddit = $.get('https://galvanize-cors.herokuapp.com/https://www.reddit.com/r/gifs.json')
reddit.done((data) => {
    if(reddit.status !== 200){
      return;
    }
    console.log(data);

    var redditContent = data.data.children[2]
    var redditURL = ""
    redditURL = redditContent.data.url
    redditComment = redditContent.data.permalink
    var commentTop = $.get('https://galvanize-cors.herokuapp.com/https://www.reddit.com' + redditComment + '.json')
    commentTop.done((com) => {
        if(commentTop.status !== 200){
          return;
        }
        console.log(com);
        var foo = com[1].data.children[0].data.body
        console.log(foo)

    })

  })
