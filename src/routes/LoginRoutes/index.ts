import express from "express"
import { LoginController } from "../../controller/LoginController"

class PermissionRoutes {
  public routes: express.Router

  constructor() {
    this.routes = express()
    this.initPermissionRoutes()
  }

  private initPermissionRoutes() {
    const loginController = new LoginController()
    this.routes.post("/login", loginController.login)
  }
}

export default new PermissionRoutes().routes
