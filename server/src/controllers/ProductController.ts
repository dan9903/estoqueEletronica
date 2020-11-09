import express, { Request, Response } from "express";
import knex from "../database/connection";

interface Product {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

class ProductController {
  async index(request: Request, response: Response) {
    const products = await knex<Product[]>("products").orderBy("name", "asc");
    return response.json(products);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;
    const product = await knex("products").where("id", id).first();
    return response.status(200).json(product);
  }

  async create(request: Request, response: Response) {
    const { name, quantity, price } = request.body;
    const product = { name, quantity, price };
    try {
      await knex("products").insert(product);
      return response.status(201).json({ sucess: true });
    } catch (err) {
      return response.status(500).json({ error: err });
    }
  }

  async update(request: Request, response: Response) {
    const { id, name, price, quantity } = request.body;
    try {
      await knex("products").where("id", id).update({ name, price, quantity });
      return response.status(201).json({ sucess: true });
    } catch (err) {
      return response
        .status(500)
        .json({ error: "não foi possivel atualizar o produto." });
    }
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;
    try {
      await knex("products").delete().where("id", id);
      return response.status(200).json({ sucess: true });
    } catch (error) {
      return response
        .status(500)
        .json({ error: "não foi possível deletar o produto." });
    }
  }
}

export default ProductController;
