import express, { Request, Response } from "express";
import knex from "../database/connection";

interface sold_product {
  product_id: number;
  quantity: number;
}

class SoldController {
  async index(request: Request, response: Response) {
    const solds = await knex("clients").orderBy("sold_date", "desc");
    return response.status(200).json(solds);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const sold = await knex("clients")
      .join("solds", "clients.id", "=", "solds.client_id")
      .join("products", "products.id", "=", "solds.product_id")
      .where("clients.id", id)
      .distinct()
      .select(
        { product_name: "products.name" },
        "solds.quantity",
        "products.price"
      )
      .orderBy("products.name", "asc");

    return response.status(200).json(sold);
  }

  async create(request: Request, response: Response) {
    const { name, phone, total, products } = request.body;
    const sold_date = new Date().toLocaleString();
    const client = { name, phone, sold_date, total };

    const trx = await knex.transaction();
    try {
      const insertedIds = await trx("clients").insert(client);

      const client_id = insertedIds[0];
      const sold = products.map((element: sold_product) => {
        const { product_id, quantity } = element;
        return { product_id, quantity, client_id };
      });

      await trx("solds").insert(sold);

      trx.commit();

      products.forEach(async (element: sold_product) => {
        await knex("products")
          .where("id", element.product_id)
          .decrement("quantity", element.quantity);
      });

      return response.status(200).json({ sucess: true });
    } catch (error) {
      trx.rollback();
      return response.status(500).json(error);
    }
  }
}

export default SoldController;
