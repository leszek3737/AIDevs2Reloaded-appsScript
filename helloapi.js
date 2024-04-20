function helloapi() {
    const taskName = "helloapi";
    const data = getTokenAndTask(taskName)
    const answer = sendAnswer(data.task.cookie, data.token)
    console.log(answer.getContentText())
  }
  