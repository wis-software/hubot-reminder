const scheduler = require('node-schedule')

const storage = require('./storage')

const { BOT_REMINDER_TEXT } = require('./config')

function formatString (str, args) {
  let resultMessage = str

  for (const key in args) {
    const value = args[key]
    resultMessage = resultMessage.replace(`%{${key}}`, value)
  }

  return resultMessage
}

function restoreState (robot) {
  return new Promise((resolve, reject) => {
    const event = setInterval(() => {
      const users = Object.values(robot.brain.data.users)

      if (users.length) {
        for (const user of users) {
          user.reminder = user.reminder || {}

          for (const key in user.reminder) {
            const { task, time } = user.reminder[key]

            const cron = new Date(time)

            if (cron < new Date()) continue

            const job = scheduler.scheduleJob(
              cron,
              () => {
                robot.adapter.sendDirect(
                  { user: { name: user.name } },
                  formatString(BOT_REMINDER_TEXT, { task })
                )

                delete user.reminder[key]
                delete storage[key]
              }
            )

            storage[key] = job
          }
        }

        clearInterval(event)
        resolve()
      }
    }, 0)
  })
}

module.exports = {
  formatString,
  restoreState
}
