import { ObjectId } from 'mongodb';

/**
 * basicUtils
 */
const basicUtils = {
  /**
   * if Id is Valid for Mongo
   * @id {string|number} id
   * @return {boolean} true, false
   */
  isValidId(id) {
    try {
      ObjectId(id);
    } catch (err) {
      return false;
    }
    return true;
  },
};

export default basicUtils;
