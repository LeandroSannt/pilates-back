"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppProvider {
    constructor(app) {
        this.app = app;
    }
    register() {
    }
    async boot() {
        const Response = this.app.container.use('Adonis/Core/Response');
        Response.macro('flash', function (messages) {
            this.ctx.session.flash(messages);
            return this;
        });
    }
    async ready() {
    }
    async shutdown() {
    }
}
exports.default = AppProvider;
//# sourceMappingURL=AppProvider.js.map