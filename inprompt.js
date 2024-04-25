function inprompt() {
    const taskName = "inprompt";
    const data = getTokenAndTask(taskName)
    const question = data.task.question
    const answerDate = JSON.parse(UrlFetchApp.fetch('https://api.openai.com/v1/chat/completions', {
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
            "content": `Wybierz wszyskie zdania ze źródła związane z osobą w pytaniu i zwróć je w formacie tablicy JSON
            Źródło: 
            ${data.task.input.map(s => s).join('\n')}
            `
          },
          {
            "role": "user",
            "content": ` Pytanie : ${question} 
            `
          }
        ]
      })
    }).getContentText())
    const list = JSON.parse(answerDate.choices[0].message.content)
    const answer = JSON.parse(UrlFetchApp.fetch('https://api.openai.com/v1/chat/completions', {
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
            "content": `odpowiedz na pytanie korzystająć ze źródeł 
              Źródło: 
              ${list.map(s => s).join('\n')}
              `
          },
          {
            "role": "user",
            "content": ` Pytanie : ${question} 
              `
          }
        ]
      })
    }).getContentText())
  
    const postAnswer = sendAnswer(answer.choices[0].message.content, data.token)
    console.log(postAnswer.getContentText())
  }
  