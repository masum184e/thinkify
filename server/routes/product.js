import express from 'express';
import { addProduct, editProduct, getAllProduct, removeProduct } from '../controller/product.js';
import userAuthentication from '../middleware/userAuthentication.js';
import uploadFile from '../middleware/uploadFile.js';

const product = express.Router();

product.post("/", userAuthentication, uploadFile.single("productimage"), addProduct)
product.get("/", getAllProduct);
product.delete("/:productId", removeProduct);
product.patch("/:productId", editProduct);

export default product;