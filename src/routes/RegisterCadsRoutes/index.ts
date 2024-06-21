import express from "express"
import { RegisterCadsController } from "../../controller/RegisterCadsController"

class CadsRoutes {
  public routes: express.Router

  constructor() {
    this.routes = express()
    this.initUserRoutes()
  }

  private initUserRoutes() {
    const cadsController = new RegisterCadsController()
    this.routes.post("/cadsList/:skip/:limit", cadsController.getCadsList)
    this.routes.post("/cadsInsert", cadsController.insertCads)
    this.routes.delete("/cadsDelete/:id", cadsController.deleteCads)
    this.routes.put("/cadsUpdate/:id", cadsController.updateUser)
    this.routes.get("/cads/:id", cadsController.getUser)
    this.routes.post("/cadsInfos/", cadsController.getInfosCads)
    this.routes.post("/cityInfos/", cadsController.getInfosCitys)
    this.routes.post("/registerDateInfos/", cadsController.getInfosRegisterDate)
  }
}

export default new CadsRoutes().routes
