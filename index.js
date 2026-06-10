/**
 * Plugin factory
 *
 * @param {string} pkgName - NPM package name
 * @returns {class}
 */
async function factory (pkgName) {
  const me = this

  /**
   * DoboSqlite3 class
   *
   * @class
   */
  class DoboSqlite3 extends this.app.baseClass.Base {
    constructor () {
      super(pkgName, me.app)
      this.config = {
        options: {
        }
      }
    }

    sanitizeError = (err) => {
      const { getModel } = this.app.dobo
      const { last, intersection, without } = this.app.lib._
      if (err.code === 'ER_DUP_ENTRY') {
        err.title = 'sqlError'
        const item = last(err.sqlMessage.split(' '))
        if (item[0] === "'" && item[item.length - 1] === "'") {
          const [model, ...args] = item.split('_')
          const mdl = getModel(model)
          if (mdl) {
            const props = mdl.getNonVirtualProperties(true)
            const fields = without(intersection(props, args), 'siteId')
            err.details = fields.map(field => {
              return { field, error: 'duplicate' }
            })
          }
        }
        err.message = err.sqlMessage
      }
    }
  }
  return DoboSqlite3
}

export default factory
