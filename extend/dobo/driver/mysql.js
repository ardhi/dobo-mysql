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
    }
  }

  return MysqlDriver
}

export default mysqlDriverFactory
