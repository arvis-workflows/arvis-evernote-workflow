const LogManager = require('./logManager')
const arvish = require('arvish')

if (arvish.input.startsWith('noteopen')) {
  const [command, noteguid, ...noteTitle] = arvish.input.split(' ')
  const title = noteTitle.join(' ')
  LogManager.write(`${command} ${noteguid}`, { title })
} else {
  LogManager.write(arvish.input)
}
