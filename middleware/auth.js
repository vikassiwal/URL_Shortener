const { getUser} = require('../service/auth');
function checkForAuthentication(req, res, next){
    const tokenCookie = req.cookies?.token;

    if(!tokenCookie){return next();}

    const token = tokenCookie;
    const user = getUser(token);
    req.user = user;
    return next();
}

function restrictTo(roles){
    
 return function(req, res, next){
    if(!req.user) return res.redirect("/login");

    if(!roles.includes(req.user.role)) return res.end("unAuthorized");

    next();
 }

}

// async function restrictToLoggedInUserOnly(req, res, next) {
    
//     // const userUid = req.cookies?.uid;
//     const userUid = req.headers['authorization'];

//     if(!userUid) {
//         return res.redirect('/login');
       
//     }
//     // const user = getUser(userUid);
//     // token Bearer ejf42485248erer;
//     const token = userUid.split('Bearer ')[1];   // Extract token from "Bearer <token>"

//     // if(!user) {
//     //     return res.redirect('/login');
//     // }    
//     const user = getUser(token);
//     if(!user) {
//         return res.redirect('/login');
//     }   
//     req.user = user;
//     next();
// }
// async function checkAuth(req, res, next) {
//     // const userUid = req.cookies?.uid;
//     const userUid = req.headers['authorization'];

//     const token = userUid.split('Bearer ')[1];  // Extract token from "Bearer <token
//     // const user = getUser(userUid);    
//     const user = getUser(token);  
//     req.user = user;
//     next();
// }

module.exports = {
    // restrictToLoggedInUserOnly,
    // checkAuth
    checkForAuthentication,
    restrictTo
};