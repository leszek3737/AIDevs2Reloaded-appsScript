function blogger() {
    var taskName = "blogger";
    const data = getTokenAndTask(taskName)
    const blog = JSON.parse(UrlFetchApp.fetch('https://api.openai.com/v1/chat/completions', {
      'method': 'post',
      'contentType': 'application/json',
      'headers': {
        'authorization': "Bearer " + config.OPENAI_API_KEY,
      },
      'payload': JSON.stringify({
        "model": "gpt-3.5-turbo",
        "messages": [
          {
            "role": "system",
            "content": `JSON object generator according to the example:
            {
              "chapter name": "text",
              "chapter name": "text",
              "chapter name": "text",
              "chapter name": "text"
            }`
          },
          {
            "role": "user",
            "content": "Write a blog post about preparing Margherita pizza divided into chapters:" + data.task.blog + "and send them as elements in JSON format. Send the answer in Polish."
          }
        ]
      })
    }).getContentText())
    const json = JSON.parse(blog.choices[0].message.content)
    let arrayBlog = []
    for (let key in json) {
      arrayBlog.push(json[key].toString())
    }
  
    const answer = sendAnswer(arrayBlog, data.token)
    console.log(answer.getContentText())
  
  }