// corsOptions.js

const whiteList = ['http://localhost:5173' ,'http://localhost:4000'];

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || whiteList.includes(origin)) {
            callback(null, true)
        }
        else {
            callback(new Error('Not accepted by CORS'))
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}

export default corsOptions