function hasUser() {
    return (req, res, next) => {
        if(req.headers.user) {
            next();
        }else {
            res.status(401).json({ message: 'Please log in'});
        } 
    } 
};

function isAdmin() {
    return (req, res, next) => {
        if (req.headers.user) {
            const user = JSON.parse(req.headers.user);
            if (user._role == 'admin') {
                next();
            } else {
                res.status(401).json({ message: 'You don`t have access' });
            }
        } else {
           
            res.status(401).json({ message: 'You don`t have access' });
        }
    }
};

function isGuest() {
    return (req, res, next) => {
       
        if(req.headers.user) {
            res.status(400).json({ message: 'You are already logged in'});
        }else {
            next();
        }
    }
};

module.exports = {
    hasUser,
    isGuest,
    isAdmin,
}