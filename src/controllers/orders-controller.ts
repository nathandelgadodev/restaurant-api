import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/AppError.js";
import { knex } from "@/database/knex.js";
import { z } from "zod";
import { ProductRepository } from "@/database/types/product-repository.js";
import { OrderRepository } from "@/database/types/order-repository.js";

export class OrdersController {
  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        table_session_id: z.number(),
        product_id: z.number(),
        quantity: z.number(),
      });

      const { table_session_id, product_id, quantity } = bodySchema.parse(
        request.body,
      );

      const session = await knex<TablesSessionsRepository>("tables_sessions")
        .where({ id: table_session_id })
        .first();

      if (!session) {
        throw new AppError("session table not found");
      }

      if (session.closed_at) {
        throw new AppError("this table is closed");
      }

      const product = await knex<ProductRepository>("products")
        .where({
          id: product_id,
        })
        .first();

      if (!product) {
        throw new AppError("product not found");
      }

      await knex<OrderRepository>("orders").insert({
        table_session_id,
        product_id,
        quantity,
        price: product.price,
      });

      return response.status(201).json();
    } catch (error) {
      next(error);
    }
  }
}
