const fs = require('fs')
const arvish = require('arvish')

if (fs.existsSync('./Caching')) {
  arvish.output([
    {
      valid: true,
      title: 'Please wait until the caching process is finished...',
      arg: 'error',
      autocomplete: '',
      subtitle: 'This work could take several minutes.'
    }
  ])

  process.exit()
}
