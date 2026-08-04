import { NextFunction, Request, Response } from "express";
import { knex } from "@/database/knex.js";
import { z } from "zod";
import { ProductRepository } from "@/database/types/product-repository.js";

export class ProductController {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const { name } = request.query;

      const products = await knex<ProductRepository>("products")
        .select()
        .whereLike("name", `%${name ?? ""}%`)
        .orderBy("name");

      return response.json(products);
    } catch (error) {
      next(error);
    }
  }

  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        name: z.string().trim().min(4),
        price: z.number().gt(0, { message: "value must be greather than 0" }),
      });

      const { name, price } = bodySchema.parse(request.body);

      const [newProduct] = await knex<ProductRepository>("products")
        .insert({ name, price })
        .returning("*");

      return response.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const id = z
        .string()
        .transform((value) => Number(value))
        .refine((value) => !isNaN(value), { message: "id must be a number" })
        .parse(request.params.id);

      const bodySchema = z.object({
        name: z.string().trim().min(6),
        price: z.number().gt(0),
      });

      const { name, price } = bodySchema.parse(request.body);

      await knex<ProductRepository>("products")
        .update({ name, price, updated_at: knex.fn.now() })
        .where({ id });

      const updatedProduct = await knex<ProductRepository>("products")
        .select()
        .where({ id })
        .first();

      return response.json(updatedProduct);
    } catch (error) {}
  }
}
