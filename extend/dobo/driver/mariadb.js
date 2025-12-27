import mysqlFactory from './mysql.js'

async function mariadbDriverFactory () {
  const MysqlDriver = await mysqlFactory.call(this)

  class MariadbDriver extends MysqlDriver {
    constructor (plugin, options) {
      super(plugin)
    }
  }

  return MariadbDriver
}

export default mariadbDriverFactory
