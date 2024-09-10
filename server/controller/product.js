import ProductModel from "../models/productSchema.js";

const addProduct = async (req, res) => {
    try {
        const { title, price, description } = req.body;
        const image = req.file.filename;
        const authorId = req.user._id.toString();

        if (!title || !price || !description || !image) {
            return res.status(400).json({ status: false, message: 'All fields are required.' });
        }

        if (isNaN(price) || Number(price) <= 0) {
            return res.status(400).json({ status: false, message: 'Price must be a valid number greater than 0.' });
        }

        const newProduct = await ProductModel({
            title,
            price,
            description,
            image,
            authorId,
            createdAt: new Date()
        })

        const savedProduct = await newProduct.save();
        if (savedProduct) {
            return res.status(201).json({ status: true, message: "Product created successfully" });
        } else {
            return res.status(500).json({ status: false, message: "Something Went Wrong" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
}

const removeProduct = async (req, res) => {

}

const editProduct = async (req, res) => {

}

const getAllProduct = async (req, res) => {

}

export { addProduct, removeProduct, editProduct, getAllProduct };