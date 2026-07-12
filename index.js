/**
 * Plugin factory.
 *
 * **Never** call this function directly!!! It's only-meant to be called by the {@link https://ardhi.github.io/bajo|Bajo framework} during plugin initialization.
 *
 * @param {string} pkgName - NPM package name
 * @returns {DoboMysql}
 */
async function factory (pkgName) {
  const me = this

  /**
   * DoboMysql class definition
   *
   * @class
   */
  class DoboMysql extends this.app.baseClass.Base {
    /**
     * Constructor.
     */
    constructor () {
      super(pkgName, me.app)
      this.config = {
        options: {
        }
      }
    }

    /**
     * Sanitizes MySQL errors and adds a `details` property to the error object if possible.
     *
     * @param {Error} err - The error object to sanitize
     * @returns {void}
     */
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
      } else if (err.code === 'ER_NO_DEFAULT_FOR_FIELD') {
        err.title = 'sqlError'
        let [, field] = err.sqlMessage.split(' ')
        field = field.replace(/'/g, '')
        err.details = [{ field, error: 'noDefault' }]
        err.message = err.sqlMessage
      }
    }
  }
  return DoboMysql
}

export default factory
