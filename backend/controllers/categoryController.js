import * as categoryService from "../services/category.service.js";   
   export const createCategory = async (req, res) => {
    try {

        console.log(req.body);
    console.log(req.file);
    console.log("KEYS 👉", Object.keys(req.body));
       const name = req.body?.name;
const image = req.file?.path;
        if(!name || !image) {
            return res.status(400).json({ message: "Name and image are required" });
        }
        const createCategory = await categoryService.createCategory(name, image);
        if(!createCategory.success) {
            return res.status(400).json({ message: createCategory.message });
        }
        return res.status(201).json({ message: createCategory.message, category: createCategory.data });
    } catch (error) {
        console.log("Error creating category:", error);
        res.status(500).json({ message: "Server error" });
    }
    }


    export const getCategories = async (req, res) => {
        try {
            const categories = await categoryService.getCategories();
            if(!categories.success) {
                return res.status(404).json({ message: categories.message });
            }
            return res.status(200).json({ message: categories.message, categories: categories.data });
        } catch (error) {
            console.log("Error retrieving categories:", error);
            res.status(500).json({ message: "Server error" });
        }
    }

    export const getCategory = async (req, res) => {
        try {
            const { id } = req.params;
            const category = await categoryService.getCategory(id);
            if(!category.success) {
                return res.status(404).json({ message: category.message });
            }
            return res.status(200).json({ message: category.message, category: category.data });
        } catch (error) {
            console.log("Error retrieving category:", error);
            res.status(500).json({ message: "Server error" });
        }
    }

    export const updateCategory = async (req, res) => {
        try {
            const { id } = req.params;
            const updateData = req.body;
            const updatedCategory = await categoryService.updateCategory(id, updateData);
            if(!updatedCategory.success) {
                return res.status(400).json({ message: updatedCategory.message });
            }
            return res.status(200).json({ message: updatedCategory.message, category: updatedCategory.data });

        } catch (error) {
            console.log("Error updating category:", error);
            res.status(500).json({ message: "Server error" });
        }
    }

    export const deleteCategory = async (req, res) => {
        try {
        const { id } = req.params;
        const deletedCategory = await categoryService.deleteCategory(id);
            if(!deletedCategory.success) { 
                return res.status(400).json({ message: deletedCategory.message });
            } 
        } catch (error) {
            console.log("Error deleting category:", error);
            res.status(500).json({ message: "Server error" });
        }
    }