import jwt from 'jsonwebtoken';

const processCookie = (reqHeaders) => {
    const cookieObj = {};
    if (reqHeaders.cookie) {
        reqHeaders.cookie.split('; ').map((data) => {
            const dataBreak = data.split('=');
            cookieObj[dataBreak[0]] = dataBreak[1];
        });
    }
    return cookieObj;
};

export const Authorization = (req, res, next) => {
    console.log(req.headers);
    const {token} = processCookie(req.headers);
    if (token) {
        jwt.verify(token, 'SecreteHash', (err, data) => {
            if (err) {
                console.log(err);
                return res.sendStatus(401);
            }
            req.loggedUserEmail = data?.email || '';
        })
        next();
    } else {
        return res.sendStatus(402);
    }
};
