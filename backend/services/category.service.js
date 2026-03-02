import {create,find,findOne,update,remove} from "../dal/dal.js";
import categoryModel from "../models/category.model.js";
import foodModel from "../models/foodmodel.js";
export const createCategory = async (name, image) => {
    try {
        const category = await create(categoryModel, { name, image });
        if(!category) {
            return { success: false, message: "Failed to create category", data: null };
        }
        return { success: true, message: "Category created successfully", data:category };
    } catch (error) {
      console.log("Error in createCategory service:", error);
        return { success: false, message: "Error creating category", data: null };

    }
}

export const getCategories = async () => {
    try {
       const categories = await find(categoryModel,{});
       if(!categories) {
        return { success: false, message: "No categories found", data: null };
       }
         return { success: true, message: "Categories retrieved successfully", data: categories };
    } catch (error) {
        console.log("Error in getCategories service:", error);
        return { success: false, message: "Error retrieving categories", data: null };
    }
}
  
export const getCategory = async (id) => {
try {
   const category = await findOne(categoryModel,{ _id: id });
   if(!category) {
    return { success: false, message: "Category not found", data: null };
   } 
        return { success: true, message: "Category retrieved successfully", data: category };
} catch (error) {
    console.log("Error in getCategory service:", error);
    return { success: false, message: "Error retrieving category", data: null };

}

}

export const updateCategory = async (id, updateData) => {
    try {
    const category = await update(categoryModel, { _id: id }, updateData);
    if(!category) {
        return { success: false, message: "Failed to update category", data: null };
    }
    return { success: true, message: "Category updated successfully", data: category };
    } catch (error) {
        console.log("Error in updateCategory service:", error);
        return { success: false, message: "Error updating category", data: null };
    }
}

export const deleteCategory = async (id) => {
    try {
        const category = await remove(categoryModel, { _id: id });
        if(!category) {
            return { success: false, message: "Failed to delete category", data: null };
        }
        return { success: true, message: "Category deleted successfully", data: category };
    } catch (error) {
        console.log("Error in deleteCategory service:", error);
        return { success: false, message: "Error deleting category", data: null };
    }
}

export const getAllProductsOfCategory = async (categoryId) => {
    try {
        const categoryProducts = await find(foodModel, { categoryId: categoryId });
        if (!categoryProducts) {
            return { success: false, message: "No products found for this category", data: null };
        }
        return { success: true, message: "Products retrieved successfully", data: categoryProducts };
    } catch (error) {
        console.log("Error in getAllProductsOfCategory service:", error);
        return { success: false, message: "Error retrieving products for category", data: null };
    }
}