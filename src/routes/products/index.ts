import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.send("the list of products");
});

router.get("/:id", (req, res) => {
    console.log(req.params);
    res.send(`product with id`);
})

router.post("/", (req, res) => {
    res.send("create a new product");
})

export default router;
