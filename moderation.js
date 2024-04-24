function moderation() {
    var taskName = "moderation";
    const data = getTokenAndTask(taskName)
  
    let arrayMode = []
    data.task.input.forEach(element => {
      const moderation = JSON.parse(UrlFetchApp.fetch('https://api.openai.com/v1/moderations', {
        'method': 'post',
        'contentType': 'application/json',
        'headers': {
          'authorization': "Bearer " + config.OPENAI_API_KEY,
        },
        'payload': JSON.stringify({
          "input": element
        })
      }).getContentText())
      if (moderation.results[0].flagged) {
        arrayMode.push(1)
      } else {
        arrayMode.push(0)
      }
    });
  
    const answer = sendAnswer(arrayMode, data.token)
    console.log(answer.getContentText())
  }
  