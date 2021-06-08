const arvish = require('@jopemachine/arvish')
const fs = require('fs')
const osLocale = require('os-locale')
const { getEnv } = require('./utils')

const oauthConfig = {
  oauthToken: arvish.input
}

fs.writeFile(
  '.env',
  '\ufeff' + getEnv(oauthConfig),
  { encoding: 'utf8' },
  () => {
    (async function () {
      const api = require('./api')(arvish.input)

      try {
        const userId = (await api.getUser()).id.toString()
        const userShardId = (await api.getUser()).shardId.toString()
        const systemLocale = await osLocale()

        oauthConfig.userId = userId
        oauthConfig.userShardId = userShardId
        oauthConfig.systemLocale = systemLocale
        oauthConfig.initialCaching = 'false'

        fs.writeFileSync(
          '.env',
          '\ufeff' + getEnv(oauthConfig),
          { encoding: 'utf8' }
        )
      } catch (err) {
        console.log('error')
      }
    })()
  }
)
