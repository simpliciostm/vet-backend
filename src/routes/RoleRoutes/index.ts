import express from "express"
import { RoleController } from "../../controller/RoleController"

class RoleRoutes {
  public routes: express.Router

  constructor() {
    this.routes = express()
    this.initRoleRoutes()
  }

  private initRoleRoutes() {
    const roleController = new RoleController()
    this.routes.get("/roleList", roleController.getRoleList)
    this.routes.post("/roleInsert", roleController.insertRole)
    this.routes.delete("/roleDelete/:id", roleController.deleteRole)
    this.routes.put("/roleUpdate/:id", roleController.updateRole)
  }
}

export default new RoleRoutes().routes
