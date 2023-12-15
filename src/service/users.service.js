import userDao from "../dao/user.dao.js";

export default class {
    static async create(data) {
        return await userDao.create(data)
    }
    static async findOneDataEmail(data) {
        return await userDao.findOneDataEmail(data)
    }
    static async findOneGithubId(data) {
        return await userDao.findOneGithubId(data)
    }
    static async findById(uid) {
        return await userDao.findById(uid)
    }
    static async findOneByEmail(email) {
        return await userDao.findOneByEmail(email)
    }
    
    static async findOneByGithubId(gitId) {
        return await userDao.findOneByGithubId(gitId)
    }
    
}
