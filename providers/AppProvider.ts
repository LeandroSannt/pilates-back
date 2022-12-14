import { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class AppProvider {
  constructor (protected app: ApplicationContract) {
  }

  public register () {
    // Register your own bindings
  }

  public async boot () {
    // IoC container is ready
    const Response = this.app.container.use('Adonis/Core/Response')
    Response.macro('flash', function (messages) {
      (this.ctx as any).session.flash(messages)
      return this
    })

  }

  public async ready () {
    // App is ready
  }

  public async shutdown () {
    // Cleanup, since app is going down
  }
}
