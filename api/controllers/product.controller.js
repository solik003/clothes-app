const Product = require("../models/Product");

exports.createProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        const saved = await newProduct.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const updated = await Product.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product deleted");
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.getAllProducts = async (req, res) => {
    const { title, category, categories, search, sort, color, size, limit } = req.query;
    const query = {};

    if (search) query.title = { $regex: search, $options: "i" };
    else if (title) query.title = { $regex: title, $options: "i" };

    if (category) {
        query.category = { $in: [category.trim().toLowerCase()] };
    } else if (categories) {
        query.categories = { $in: categories.split(",").map(c => c.trim().toLowerCase()) };
    }

    if (color) {
        query.color = { $in: color.split(",").map(c => new RegExp(`^${c.trim()}$`, "i")) };
    }

    if (size) {
        query.size = { $in: size.split(",").map(s => new RegExp(`^${s.trim()}$`, "i")) };
    }

    const sortCriteria = {};
    if (sort) {
        const [field, order] = sort.split(":");
        sortCriteria[field] = order === "asc" ? 1 : -1;
    }

    try {
        const maxLimit = parseInt(limit) || 20;
        const products = await Product.find(query).sort(sortCriteria).limit(maxLimit);
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json(err);
    }
};
