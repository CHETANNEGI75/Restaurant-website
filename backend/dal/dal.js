export const create = async (model, data) => {
return await model.create(data);
}

export const find = async (model, query) => {
return await model.find(query);
}

export const findOne = async (model, query) => {
return await model.findOne(query);
}

export const update = async (model, query, updateData) => {
return await model.findOneAndUpdate(query, updateData, { new: true });
}

export const remove  = async (model, query) => {
return await model.findOneAndDelete(query);
}

