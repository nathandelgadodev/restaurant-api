import { TablesSessionsController } from "@/controllers/tables-sessions-controller.js";
import { Router } from "express";

export const tablesSessionsRoutes = Router();
const tableSessionsController = new TablesSessionsController();

tablesSessionsRoutes.post("/", tableSessionsController.create);