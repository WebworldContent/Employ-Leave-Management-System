import jwt from 'jsonwebtoken';
export const Authorization = (req, res, next) => {
    const token = req.headers['authorization'];
    console.log('>>>', token);
    if (token) {
        jwt.verify(token, 'SecreteHash', (err, data) => {
            if (err) {
                console.log(err);
                return res.sendStatus(402);
            }
            req.loggedInUser = data?.email || '';
        })
    } else {
        return res.sendStatus(401);
    }
    next();
};
