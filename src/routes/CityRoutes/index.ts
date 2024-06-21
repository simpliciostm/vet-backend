import express from "express"
import { CityController } from "../../controller/CityController"

class CityRoutes {
  public routes: express.Router

  constructor() {
    this.routes = express()
    this.initCityRoutes()
  }

  private initCityRoutes() {
    const cityController = new CityController()
    this.routes.post("/cityList/:skip/:limit", cityController.getCityList)
    this.routes.post("/cityInsert", cityController.insertCity)
    this.routes.delete("/cityDelete/:id", cityController.deleteCity)
    this.routes.put("/cityUpdate/:id", cityController.updateCity)
    this.routes.get("/city/:id", cityController.getCity)
  }
}

export default new CityRoutes().routes
