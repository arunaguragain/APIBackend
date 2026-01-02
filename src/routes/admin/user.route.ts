import { Router } from "express";
import { AdminUserController } from "../../controllers/admin/admin.controller";

let adminUserController = new AdminUserController();
const router = Router();

router.get("/", adminUserController.getAllUsers);
router.get("/:id", adminUserController.getUserById);
router.put("/:id", adminUserController.updateOneUser);
router.delete("/:id", adminUserController.deleteOneUser);
router.post("/", adminUserController.createUser);

export default router;

// CRUD for users - admin only