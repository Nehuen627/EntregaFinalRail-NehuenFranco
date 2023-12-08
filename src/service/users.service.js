import userDao from "../dao/user.dao.js";

export default class {
    static async addUser(data) {
        return await userDao.addUser(data)
    }
    static async addGithubUser(data) {
        return await userDao.addGithubUser(data)
    }

    static async getUserData(email, password) {
        return await userDao.getUserData(email, password)
    }
    static async findEmail(email){
        return await userDao.findEmail(email)
    }
    static async updateData(dataToUpdate, data, uid) {
        return await userDao.updateData(dataToUpdate, data, uid)
    }
    
    static async findUserByGithubId (gitId) {
        return await userDao.findUserByGithubId(gitId)
    }
}
