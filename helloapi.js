function helloapi() {
    const taskName = "helloapi";
    const data = getTokenAndTask(taskName)
    const answer = UrlFetchApp.fetch('https://tasks.aidevs.pl/answer/' + data.token, {
      'method': 'post',
      'contentType': 'application/json',
      'payload': JSON.stringify({
        "answer": data.task.cookie
      })
    })
    console.log(answer.getContentText())
  }
  