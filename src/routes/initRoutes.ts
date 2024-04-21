import express from 'express';
import UserRoutes from './UserRoutes';
import RoleRoutes from './RoleRoutes';
import PermissionRoutes from './PermissionRoutes';
import LoginRoutes from './LoginRoutes';

class InitRoutes {
    public express: express.Router;
    public userRoutes = UserRoutes;
    public roleRoutes = RoleRoutes;
    public permissionRoutes = PermissionRoutes;
    public loginRoutes = LoginRoutes;

    constructor() {
        this.express = express();
        this.routes();
    }

    private routes() {
        this.express.use(this.userRoutes);
        this.express.use(this.roleRoutes);
        this.express.use(this.permissionRoutes);
        this.express.use(this.loginRoutes);
    }
}

export default new InitRoutes().express;