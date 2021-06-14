const arvish = require('arvish')
const clipboardy = require('clipboardy')

clipboardy.read().then((data) => {
  let title

  switch (arvish.input) {
    case '{clip}':
      title = 'encl'
      break
    case '{oclip}':
      title = 'enclo'
      break
    case '{fclip}':
      title = 'enclf'
      break
  }

  const strs = data.split('\n')

  const subtitle = strs.length > 1 ? `${strs.join('\\n')} ...` : data

  arvish.output([
    {
      title,
      arg: title,
      valid: true,
      autocomplete: title,
      subtitle: `Clipboard: "${subtitle}"`
    }
  ])
})
