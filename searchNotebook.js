const arvish = require('arvish')
const _ = require('lodash')
const {
  handleInput,
  replaceAll
} = require('./utils')
const LogManager = require('./logManager')
const isTravis = require('is-travis')
require('./checkApiKey')
!isTravis && require('dotenv').config()
const api = require('./api')(process.env.oauthToken)
require('./checkIsCaching')

const arvishInput = replaceAll(handleInput(arvish.input), '\\', '')

async function searchNotebook (listNotebooks) {
  let items = listNotebooks

  if (arvishInput) {
    items = _.filter(listNotebooks, notebook => {
      // Need to normalize arvish.input and match the encoding so that users can search normally in Korean
      const notebookName = notebook.name.toLowerCase()
      const input = arvishInput.normalize().toLowerCase()

      if (!notebookName.includes(input)) {
        return false
      }
      return true
    })
  }

  items = _.orderBy(items, ['name'], ['asc'])

  return _.map(items, (notebook) => {
    return {
      title: notebook.name,
      arg: `notebook:"${notebook.name}" `,
      valid: true,
      autocomplete: notebook.name,
      subtitle: `Created time: ${new Date(notebook.serviceCreated).toUTCString()}`,
      icon: {
        path: './icon/searchIcon.png'
      },
      text: {
        copy: notebook.name,
        largetype: notebook.name
      },
      variables: {
        notebookGuid: notebook.guid
      }
    }
  })
}

(async function () {
  arvish.output(await api.listNotebooks(
    {
      callback: searchNotebook
    }
  ))

  LogManager.write(`enb ${handleInput(arvish.input)}`)
})()
