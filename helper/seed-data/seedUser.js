import {faker} from '@faker-js/faker';
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import UserModel from '../../models/UserModel.js';

const GENDER = ["MALE","FEMALE"]


export function generatePass(){
    bcrypt.genSalt(9, function(err, salt) {
        if(err){
            return;
        }else{
            bcrypt.hash('123',salt,async (err,hashedPass)=>{
                console.log("line 13: ",err)
                if(err){
                    return;
                }else{
                   console.log('hashedpass: ',hashedPass)
                }
            })
        }
    });
}

const generateRandomUser = () => {
    const objectId = new mongoose.Types.ObjectId()
    
    return {
        username: faker.internet.userName(),
        mail:faker.internet.email(),
        image:faker.image.avatar(),
        dateOfBirth:faker.date.birthdate(),
        gender: GENDER[(Math.random()).toFixed(0)],
        password: "$2b$09$ym6FYSE9jnZFZ/pZmTguoeXaYRy4YelBATKQHhm5TS0/IFzIZNnYu",
    }
}

const getRandomUser = number => {
    let list = []
    for (let i = 0; i < number; i++) {
        list.push(generateRandomUser());
    }
    return list;
}

const createRandomUser = async () => {
    // await UserModel.insertMany(getRandomUser(5000))
    // for (let j = 0; j < 100; j++) {
    //     let list = []
    // }
    try {
        let list = []
        for (let i = 0; i < 10000; i++) {
            const user = generateRandomUser();
            list.push(user);
            await UserModel.create(user)
        }
    } catch (error) {
        console.log(error)
    }
    process.exit(0)
}

export default createRandomUser;



