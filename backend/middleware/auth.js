const { database, usersCollection } = require("../db");
const { decodeToken } = require("../helper/password");
const { getDocs, query, where, doc, getDoc } = require('firebase/firestore/lite');

exports.auth = async (req, res, next) => {
    try{

        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = await decodeToken(token)
        
        const q = query(usersCollection, where('email', '==', decoded.email));
        const querySnapshot = await getDocs(q);

        if(querySnapshot.empty){
            throw new Error("No User Exists...!!!")
        }

        const docRef = doc(database, 'users', querySnapshot.docs[0].id);
        const userSnapshot = await getDoc(docRef);

        if (!userSnapshot.exists()) {
            throw new Error("No User Exists...!!!")
        }

        req.token = token
        req.user = userSnapshot.data(); 
        next()
        
    }catch(e){
        console.log("e...",e)
        res.status(401).send({error: "Please authenticate...!!!"})
    }
}