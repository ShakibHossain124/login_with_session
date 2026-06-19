const authorizeAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.username === 'admin') {
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
};

const authorizeUser = (req, res, next) => {
    if (req.session.user && ((req.session.user.username === 'user') || req.session.user.username === 'admin')) {
        next();
    } else {
        res.status(403).send('Forbidden');
    }
};

export { authorizeAdmin, authorizeUser };