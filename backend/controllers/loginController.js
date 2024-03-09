const { getDocs, getDoc, updateDoc, doc, query, where } = require('firebase/firestore/lite');
const { database, usersCollection } = require('../db');
const { comparePassword, decodeToken, generateToken } = require('../helper/password');

exports.userLogin = async (req, res) => {

    try {

        const { email, password } = req.body
        const q = query(usersCollection, where('email', '==', email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {

            const docRef = doc(database, 'users', querySnapshot.docs[0].id);
            const userSnapshot = await getDoc(docRef);

            if (userSnapshot.exists()) {

                const user = userSnapshot.data();
                let correctPassword = comparePassword(user.password, password);
                if (correctPassword) {

                    const currentTimestamp = Math.floor(Date.now() / 1000);

                    if (!user.token || decodeToken(user.token).exp < currentTimestamp) {
                        let newToken = generateToken(user.email);
                        await updateDoc(docRef, { token: newToken });
                    }

                    res.status(201).send({ user });
                    
                } else {
                    throw new Error("Entered password is incorrect");
                }
            } else {
                throw new Error("No User Exists...!!!");
            }

        } else {
            throw new Error("No User Exists...!!!");
        }

    } catch (error) {
        res.send({ error: error.message });
    }

};
