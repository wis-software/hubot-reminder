const scheduler = require('node-schedule')
const uuid = require('uuidv4')
const chrono = require('chrono-node')

const { BOT_ANSWER_CREATED, BOT_REMINDER_TEXT } = require('../config')
const { formatString } = require('../utils')

module.exports = (msg) => {
  const task = msg.match[1]
  const time = msg.match[2]

  const cron = chrono.parseDate(time)

  const job = scheduler.scheduleJob(
    cron,
    () => {
      msg.send(formatString(BOT_REMINDER_TEXT, { task }))
      delete msg.message.user.reminder[jobID]
    }
  )
  const jobID = uuid.uuid()

  msg.message.user.reminder[jobID] = {
    task, time, job
  }

  msg.send(BOT_ANSWER_CREATED)
}
