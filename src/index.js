// Description:
//   Hubot script to create reminders.
//
// Commands:
//   begin group Reminder
//    hubot remind "REMINDER TEXT" today at 17:50 - creates new reminder where "REMINDER TEXT" is reminder text and "today at 17:50" is time of reminder
//    hubot reminder list - shows list of all user reminders
//   end group
//

const { restoreState } = require('./utils')

module.exports = async (robot) => {
  await restoreState(robot)

  robot.receiveMiddleware(
    require('./middlewares/listener')
  )

  robot.respond(
    /remind "(.+)" (.+)\s*$/i,
    require('./routes/add')
  )

  robot.respond(
    /reminder list\s*$/i,
    require('./routes/list')
  )

  robot.respond(
    /reminder remove ([\w\d-]+)\s*/i,
    require('./routes/remove')
  )
}
