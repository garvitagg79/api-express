import { Request, Response } from "express";

export function listProducts(req: Request, res: Response) {
    res.send("list of products");
}

export function getProductById(req: Request, res: Response) {
    res.send("get product by id");
}

export function createProduct(req: Request, res: Response) {
    console.log(req.body);
    res.send("create a new product");
}

export function updateProduct(req: Request, res: Response) {
    res.send("update a product");
}

export function deleteProduct(req: Request, res: Response) {
    res.send("delete a product");
}