import { Request, Response } from "express"
import { CityService } from "../../services/CityService"

export class CityController {
  public async getCityList(req: Request, res: Response) {
    try {
      const { limit, skip } = req.params
      const filter = req.body

      const cityService = new CityService()

      const execute = await cityService.getCityListService(
        filter,
        parseInt(limit),
        parseInt(skip),
      )

      res.status(200).json(execute)
    } catch (ex) {
      res.status(500).json({ Error: ex })
    }
  }

  public async insertCity(req: Request, res: Response) {
    try {
      const data = req.body

      const cityService = new CityService()

      const execute = await cityService.insertCityService(data)

      res.status(200).json(execute)
    } catch (ex) {
      res.status(500).json({ Error: ex })
    }
  }

  public async deleteCity(req: Request, res: Response) {
    try {
      const { id } = req.params

      const cityService = new CityService()

      const execute = await cityService.deleteCityService(id)

      res.status(200).json(execute)
    } catch (ex) {
      res.status(500).json({ Error: ex })
    }
  }

  public async updateCity(req: Request, res: Response) {
    try {
      const { id } = req.params
      const data = req.body

      const cityService = new CityService()

      const execute = await cityService.updateCityService(id, data)

      res.status(200).json(execute)
    } catch (ex) {
      res.status(500).json({ Error: ex })
    }
  }

  public async getCity(req: Request, res: Response) {
    try {
      const { id } = req.params

      const cityService = new CityService()

      const execute = await cityService.getCityService(id)

      res.status(200).json(execute)
    } catch (ex) {
      res.status(500).json({ Error: ex })
    }
  }
}
