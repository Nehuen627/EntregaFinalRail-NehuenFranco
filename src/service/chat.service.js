import chatDao from "../dao/chat.dao.js";
export default class{
    static async create(userEmail, message) {
        return await chatDao.create(userEmail, message);
    }
    static async find() {
        return await chatDao.find();
    }
}