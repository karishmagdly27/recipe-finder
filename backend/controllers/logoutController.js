const { usersCollection } = require("../db");
const { getDocs, updateDoc, doc, query, where } = require('firebase/firestore/lite');


exports.userLogout = async(req,res) =>{
    try{

        const {email} = req.user
        const q = query(usersCollection, where('email', '==', email));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {

            const docRef = doc(database, 'users', querySnapshot.docs[0].id);
            await updateDoc(docRef, {token: null});

        } else {
            throw new Error("No User Exists...!!!")
        }
        
        res.status(200).send()

    }catch(error){
        res.send({error: error.message})
    } 
}