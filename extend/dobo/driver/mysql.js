async function mysqlDriverFactory () {
  const { KnexDriver } = this.app.doboKnex.baseClass

  class MysqlDriver extends KnexDriver {
    constructor (plugin, options) {
      super(plugin)
      this.dialect = 'mysql'
      this.adapter = 'mysql'
      this.support.returning = false
    }

    async sanitizeConnection (item) {
      await super.sanitizeConnection(item)
      item.port = item.port ?? 3306
      item.host = item.host ?? '127.0.0.1'
      item.database = item.database ?? 'mysql'
    }
  }

  return MysqlDriver
}

export default mysqlDriverFactory
