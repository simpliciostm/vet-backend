import express from "express"
import UserRoutes from "./UserRoutes"
import RoleRoutes from "./RoleRoutes"
import PermissionRoutes from "./PermissionRoutes"
import LoginRoutes from "./LoginRoutes"
import CadsRoutes from "./RegisterCadsRoutes"
import CityRoutes from "./CityRoutes"
import ReportRoutes from "./ReportRoutes"

class InitRoutes {
  public express: express.Router
  public userRoutes = UserRoutes
  public roleRoutes = RoleRoutes
  public permissionRoutes = PermissionRoutes
  public loginRoutes = LoginRoutes
  public cadsRoutes = CadsRoutes
  public cityRoutes = CityRoutes
  public reportRoutes = ReportRoutes

  constructor() {
    this.express = express()
    this.routes()
  }

  private routes() {
    this.express.use(this.userRoutes)
    this.express.use(this.roleRoutes)
    this.express.use(this.permissionRoutes)
    this.express.use(this.loginRoutes)
    this.express.use(this.cadsRoutes)
    this.express.use(this.cityRoutes)
    this.express.use(this.reportRoutes)
  }
}

export default new InitRoutes().express
