async function mysqlAdapterFactory () {
  const { DoboKnexAdapter } = this.app.baseClass

  /**
   * DoboMysqlAdapter class definition.
   *
   * @class
   */
  class DoboMysqlAdapter extends DoboKnexAdapter {
    /**
     * Constructor.
     */
    constructor (plugin, name, options) {
      super(plugin, name, options)
      /**
       * Dialect used by this adapter
       * @type {string}
       */
      this.dialect = 'mysql'
      /**
       * Adapter name
       * @type {string}
       */
      this.adapter = 'mysql'
      /**
       * Override the default behavior of returning inserted rows on insert queries. MySQL does not support this feature.
       * @type {boolean}
       * @default false
       */
      this.support.returning = false
    }

    /**
     * Sanitize the connection configuration for MySQL.
     * @async
     * @param {Object} [item={}] - The connection configuration object
     * @param {string} [item.host='127.0.0.1'] - The database host
     * @param {number} [item.port=3306] - The database port
     * @param {string} [item.database='mysql'] - The database name
     * @returns {Promise<void>}
     */
    async sanitizeConnection (item = {}) {
      await super.sanitizeConnection(item)
      item.port = item.port ?? 3306
      item.host = item.host ?? '127.0.0.1'
      item.database = item.database ?? 'mysql'
    }
  }

  this.app.baseClass.DoboMysqlAdapter = DoboMysqlAdapter
  return DoboMysqlAdapter
}

export default mysqlAdapterFactory
