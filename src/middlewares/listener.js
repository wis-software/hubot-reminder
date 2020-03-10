const { restoreState } = require('../utils')

module.exports = async (context, next, _done) => {
  context.response.message.user.reminder = context.response.message.user.reminder || {}

  await restoreState(context.response.robot)

  next()
}
