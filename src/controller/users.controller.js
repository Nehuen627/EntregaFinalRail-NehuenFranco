import usersService from "../service/users.service.js";

export default class {
    static async addUser(data) {
        const newUser = usersService.addUser(data)
        return newUser
    }
    static async addGithubUser(data) {
        const newUser = usersService.addGithubUser(data)
        return newUser
    }

    static async getUserData(email, password) {
        const user = usersService.getUserData(email, password)
        return user
    }
    static async findEmail(email){
        const user = usersService.findEmail(email)
        return user
    }
    static async updateData(dataToUpdate, data, uid) {
        const user = usersService.updateData(dataToUpdate, data, uid)
        return user
    }
    
    static async findUserByGithubId (gitId) {
        const user = usersService.findUserByGithubId(gitId)
        return user
    }
}
