// const sessionIdToUserMap = new Map();
const jwt = require('jsonwebtoken');
const secretKey  = 'vikas1122';

// function setUser(id, user){
//     sessionIdToUserMap.set(id, user);
// }

function setUser(user){
    return jwt.sign(
        {
            id: user._id,
            email: user.email,
            name: user.name,
            role: user.role
        },  
         secretKey);
}

function getUser(token){
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        return null;
    }
}
module.exports = {
    setUser,
    getUser
};