import { Exception } from '../utils.js';
import userModel from "./models/user.model.js";
import bcrypt from 'bcrypt';

export default class {
    static async addUser(data) {
        const isAdded = await userModel.findOne({ email: data.email });
        if (isAdded) {
            throw new Exception("There is an user already created with that email", 400);
        }
        const saltRounds = 10;
        data.password = await bcrypt.hash(data.password, saltRounds);
        await userModel.create(data);
        return true;
    }

    static async getUserData(email, password) {
        const user = await userModel.findOne({ email });
        if (!user) {
            throw new Exception("Invalid email or password", 401);
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
            return user;
        } else {
            throw new Exception("Invalid email or password", 401);
        }
    }
}
