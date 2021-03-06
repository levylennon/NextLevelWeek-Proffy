import express from "express";
const routes = express.Router();

import ClassController from "./controllers/ClassesController";
import UserController from "./controllers/UserController";
import SubjectController from "./controllers/SubjectController";
import ConnectionController from "./controllers/ConnectionsController";
import RegisterController from "./controllers/RegisterController";

const classControllers = new ClassController();
const userControllers = new UserController();
const subjectControllers = new SubjectController();
const connectionControllers = new ConnectionController();
const RegisterControllers = new RegisterController();

// middleware
import authenticator from './helpers/auth'


// router Register 
routes.post("/register", RegisterControllers.create);

routes.post("/user", userControllers.create);
routes.post("/login", userControllers.login);

routes.use(authenticator)

// router classes
routes.get("/user", classControllers.index);
// router classes
routes.get("/classes", classControllers.index);
routes.post("/classes", classControllers.create);

// router subject
routes.get("/subject", subjectControllers.index);
routes.post("/subject", subjectControllers.create);


// router connection 
routes.get("/connections", connectionControllers.index);
routes.post("/connections", connectionControllers.create);

export default routes;
