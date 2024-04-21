import express from "express";
import { PermissionController } from "../../controller/PermissionController";

class PermissionRoutes {
    public routes: express.Router;

    constructor() {
        this.routes = express();
        this.initPermissionRoutes();
    }

    private initPermissionRoutes() {
        const permissionController = new PermissionController()
        this.routes.get('/permissionList', permissionController.getPermissionList);
        this.routes.post('/permissionInsert', permissionController.insertPermission);
        this.routes.delete('/permissionDelete/:id', permissionController.deletePermission);
        this.routes.put('/permissionUpdate/:id', permissionController.updatePermission);
    }
}

export default new PermissionRoutes().routes