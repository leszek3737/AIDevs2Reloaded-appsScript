function embedding () {
    const taskName = "embedding";
    const data = getTokenAndTask(taskName)
    const embedding = JSON.parse(UrlFetchApp.fetch('https://api.openai.com/v1/embeddings', {
      'method': 'post',
      'contentType': 'application/json',
      'headers': {
        'authorization': "Bearer " + config.OPENAI_API_KEY,
      },
      'payload': JSON.stringify({
        "model": "text-embedding-ada-002",
        "input": "Hawaiian pizza"
      })
    }).getContentText())
    
    const answer = sendAnswer(embedding.data[0].embedding, data.token)
    console.log(answer.getContentText())
  }