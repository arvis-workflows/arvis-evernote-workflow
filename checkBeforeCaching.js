const fs = require('fs')
const arvish = require('arvish')

try {
  const valid =
  fs.existsSync('./search_content') &&
  fs.existsSync('./search_content/thumbNailPath.json') &&
  fs.existsSync('./search_content/htmlCacheLog.json')

  if (!valid) {
    arvish.output([
      {
        title: 'search_contents directory not exists',
        arg: 'false',
        subtitle: 'possible solution: npm run init'
      }
    ])
  } else {
    arvish.output([
      {
        title: 'Create quicklook cache of alfred-evernote-workflow',
        arg: 'true',
        subtitle: 'Press enter to proceed'
      }
    ])
  }
} catch (e) {
  console.log(e)
}
