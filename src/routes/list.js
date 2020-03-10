const routines = require('hubot-routines')

const storage = require('../storage')
const { BOT_ANSWER_LIST, BOT_ANSWER_LIST_EMPTY } = require('../config')

module.exports = (msg) => {
  if (!Object.keys(msg.message.user.reminder).length) {
    msg.send(BOT_ANSWER_LIST_EMPTY)

    return
  }

  const eventList = []
  for (const key in msg.message.user.reminder) {
    const { task, time } = msg.message.user.reminder[key]
    const job = storage[key]

    if (!job || !job.nextInvocation()) {
      delete msg.message.user.reminder[key]
      delete storage[key]

      continue
    }

    eventList.push(
      [
        `${task} - ${(new Date(time)).toUTCString()}`,
        `reminder remove ${key}`
      ]
    )
  }

  const buttonsMessage = routines.buildMessageWithButtons(
    BOT_ANSWER_LIST,
    eventList
  )

  msg.send(buttonsMessage)
}
