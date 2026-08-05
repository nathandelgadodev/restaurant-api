import { Router } from "express";

import { TablesController } from "@/controllers/tables-controller.js";

export const tablesRoutes = Router();
const tablesController = new TablesController();

tablesRoutes.get("/", tablesController.index);
