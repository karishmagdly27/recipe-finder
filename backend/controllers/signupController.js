const { usersCollection } = require("../db");
const { generateHash, generateToken } = require("../helper/password");
const { getDocs, getDoc, addDoc, query, where } = require('firebase/firestore/lite');


exports.userSignup = async (req, res) => {
    
    try{

        const {email, password} = req.body
        const q = query(usersCollection, where('email', '==', email));
        const querySnapshot = await getDocs(q);

        if(!querySnapshot.empty){
            throw new Error("User already exist")
        }else{
        
            const hash = await generateHash(password)
            const token = await generateToken(email)
            const data = {
                email,
                password: hash,
                token
            }

            var user = await addDoc(usersCollection, data);
            user = await getDoc(user);

            if (user.exists()) {
                res.status(201).send({user: user.data()})
            } else {
                throw new Error("No User Exists...!!!")
            }
        }

    }catch(error){
        res.send({error: error.message})
    }
    
}