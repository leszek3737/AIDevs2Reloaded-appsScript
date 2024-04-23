function liar() {
    const taskName = "liar";
    const data = getTokenAndTask(taskName)
    const question = "Is Freddie Mercury alive ?"
    const postQuestion = JSON.parse(UrlFetchApp.fetch("https://tasks.aidevs.pl/task/"+ data.token, {
      'method': 'post',
      'payload': {
        'question': question
      }
    }).getContentText())
    
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
            "content": `"Is the sentence an answer to the question? 
            Send a response in the format YES/NO.`
          },
          {
            "role": "user",
            "content": ` question : ${question} 
            sentence: ${postQuestion.answer}
            
            `
          }
        ]
      })
    }).getContentText())
  
    const answer = sendAnswer(blog.choices[0].message.content, data.token)
    console.log(answer.getContentText())
  }
  