async function mysqlDriverFactory () {
  const { DoboKnexDriver } = this.app.baseClass

  class DoboMysqlDriver extends DoboKnexDriver {
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

  this.app.baseClass.DoboMysqlDriver = DoboMysqlDriver
  return DoboMysqlDriver
}

export default mysqlDriverFactory
