
function isLoggedIn(req, res, next) {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
}

function isAdmin(req, res, next) {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = jwt.verify(token, JWT_SECRET_KEY);

    if (user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }

    next();
}

export { isLoggedIn, isAdmin };