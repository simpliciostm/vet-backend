import express from "express"
import { UserController } from "../../controller/UserController"

class UserRoutes {
  public routes: express.Router

  constructor() {
    this.routes = express()
    this.initUserRoutes()
  }

  private initUserRoutes() {
    const userController = new UserController()
    this.routes.post("/userList/:skip/:limit", userController.getUserList)
    this.routes.post("/userInsert", userController.insertUser)
    this.routes.delete("/userDelete/:id", userController.deleteUser)
    this.routes.put("/userUpdate/:id", userController.updateUser)
    this.routes.get("/user/:id", userController.getUser)
  }
}

export default new UserRoutes().routes
