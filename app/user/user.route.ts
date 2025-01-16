
import { Router } from "express";
import { catchError } from "../common/middleware/cath-error.middleware";
import * as userController from "./user.controller";
import * as userValidator from "./user.validation";
import { roleAuth } from '../common/middleware/role-auth.middleware';

const router = Router();

router
  .get("/",roleAuth("ADMIN"), userController.getAllUser)
  .get("/:id", userController.getUserById)
  .delete("/:id", userController.deleteUser)
  .post("/", userValidator.createUser, catchError, userController.createUser)
  .put("/:id",roleAuth("ADMIN"), userValidator.updateUser, catchError, userController.updateUser)
  .patch("/:id", userValidator.editUser, catchError, userController.editUser)
  .post(
    "/login",
    userValidator.loginUser,
    catchError,
    userController.loginUser
  )
  .get("/staus/:id",userController.getUserSubscriptionStatus);

export default router;

