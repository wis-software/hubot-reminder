const scheduler = require('node-schedule')
const uuid = require('uuidv4')
const chrono = require('chrono-node')

const storage = require('../storage')
const {
  BOT_ANSWER_CREATED,
  BOT_REMINDER_TEXT,
  BOT_ANSWER_PARSE_ERROR,
  BOT_ANSWER_PAST_EVENT
} = require('../config')
const { formatString } = require('../utils')

module.exports = (msg) => {
  const task = msg.match[1]
  const time = msg.match[2]

  const cron = chrono.parseDate(time)

  if (!cron) {
    msg.send(formatString(BOT_ANSWER_PARSE_ERROR, { time }))

    return
  }

  if (cron < new Date()) {
    msg.send(BOT_ANSWER_PAST_EVENT)

    return
  }

  const job = scheduler.scheduleJob(
    cron,
    () => {
      msg.send(formatString(BOT_REMINDER_TEXT, { task }))
      delete msg.message.user.reminder[jobID]
      delete storage[jobID]
    }
  )
  const jobID = uuid.uuid()

  msg.message.user.reminder[jobID] = { task, time }
  storage[jobID] = job

  msg.send(BOT_ANSWER_CREATED)
}
