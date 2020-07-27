import models from '../models';


const { CategoryModel } = models;

interface ICat {
  name: string
}

/**
 * @description finds a category by name
 * @param {string} email
 * @return {Promise} user
 */
export const findByName = (name: string) => {
  return CategoryModel.findOne({ name });
}
