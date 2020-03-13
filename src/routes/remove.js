const storage = require('../storage')
const { BOT_ANSWER_REMOVE, BOT_ANSWER_REMOVE_EMPTY } = require('../config')

module.exports = (msg) => {
  const jobID = msg.match[1]
  const jobInRedis = msg.message.user.reminder[jobID]
  const jobTask = storage[jobID]

  if (!jobInRedis) {
    msg.send(BOT_ANSWER_REMOVE_EMPTY)

    return
  }

  try {
    jobTask.cancel()
  } finally {
    delete msg.message.user.reminder[jobID]
    delete storage[jobID]
  }

  msg.send(BOT_ANSWER_REMOVE)
}
