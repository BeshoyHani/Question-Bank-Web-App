
export const verifyUser = (req, res, next) => {
    try {
        const data = decodeToken(req.headers.authorization);
        console.log(data)
        const username = data.username;
        req.username = username;
        next();
    } catch (error) {
        res.status(401).end('Unauthorized Access');
    }
}

export const getUserID = (req, res, next) => {
    if (req.headers.authorization) {
        const data = decodeToken(req.headers.authorization);
        const username = data.username;
        req.username = username;
    }

    next();
}

const decodeToken = (auth)=> {
    const token = auth.split(' ')[1];
    const data = jwt.verify(token, process.env.TOKEN_SECRET);
    return data;
}