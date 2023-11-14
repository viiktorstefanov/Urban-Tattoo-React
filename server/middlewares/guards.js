function hasUser() {
    return (req, res, next) => {
        if(req.headers.user) {
            next();
        }else {
            res.status(401).json({ message: 'Please log in'});
        }
        
    } 
}
//preraboti da poluchava token i da proverqva dali e admin
function isAdmin() {
    return (req, res, next) => {

        if(JSON.parse(req.headers.user)._role == 'admin') {
            next();
        }else {
            res.status(401).json({ message: 'You don`t have access to do that!'});
        }
        
    } 
}

function isGuest() {
    return (req, res, next) => {
       
        if(req.headers.user) {
            res.status(400).json({ message: 'You are already logged in'});
        }else {
            next();
        }
    }
}

module.exports = {
    hasUser,
    isGuest,
    isAdmin,
}