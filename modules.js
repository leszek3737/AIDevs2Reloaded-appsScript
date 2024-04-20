function getTokenAndTask(taskName) {
    let token = JSON.parse(UrlFetchApp.fetch('https://tasks.aidevs.pl/token/' + taskName, {
        'method': 'post',
        'contentType': 'application/json',
        'payload': JSON.stringify({
            'apikey': config.TASKS_API_KEY,
        })
    }).getContentText()).token
    let task = JSON.parse(UrlFetchApp.fetch("https://tasks.aidevs.pl/task/" + token).getContentText())
    return {
        token: token,
        task: task
    }
}