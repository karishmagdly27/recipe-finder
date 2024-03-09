var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// Generate Hash
exports.generateHash = async (password) => {
    var salt = await bcrypt.genSaltSync(10);
    var hash = await bcrypt.hashSync(password, salt);
    return hash
}

// Compare Password
exports.comparePassword = async (hash, password) => {
    let flag = await bcrypt.compareSync(password, hash);
    return flag
}

// Generate Token
exports.generateToken = async(email) => {
    var token = await jwt.sign({email}, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token
}

// Decode Token
exports.decodeToken = async(token) => {
    let decoded = await jwt.verify(token, "flavorverse");
    return decoded
}