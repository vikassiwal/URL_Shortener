const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const connectDB = require('./connect.js');
// const {restrictToLoggedInUserOnly, checkAuth} = require('./middleware/auth');
const {checkForAuthentication,restrictTo} = require('./middleware/auth');
const redisClient = require("./config/redis");

const URL = require('./models/url');

const urlRouter = require('./routes/url');
const StaticRouter = require('./routes/staticRouter');
const UserRouter = require('./routes/user');

const app = express();

const PORT = 8001;

connectDB('mongodb://localhost:27017/url-shortener')
.then(()=> {
    console.log("Connected to DB");
})

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

// app.use(express.urlencoded({extended: true}));

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(checkForAuthentication);


app.use("/", StaticRouter);
app.use("/user", UserRouter);
app.use("/url",restrictTo(["NORMAL", "ADMIN"]), urlRouter);

// server side rendering 
// app.get('/test', async (req, res)=>{
//     const allUrls = await URL.find({});
//     return res.render('home',{
//         urls: allUrls,
//     });
// })

app.get("/:shortId", async (req, res) => {

    const shortId = req.params.shortId;

    // STEP 1 : Redis me check karo
    const cachedURL = await redisClient.get(shortId);

    // STEP 2 : Cache Hit
    if (cachedURL) {

        console.log("Cache Hit");

        // Analytics update
        await URL.updateOne(
            { shortId },
            {
                $push: {
                    visitHistory: {
                        timestamp: Date.now()
                    }
                }
            }
        );

        return res.redirect(cachedURL);
    }

    console.log("Cache Miss");

    // STEP 3 : MongoDB se lao
    const entry = await URL.findOneAndUpdate(
        { shortId },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now()
                }
            }
        }
    );

    if (!entry) {
        return res.status(404).send("Short URL not found");
    }

    // STEP 4 : Redis me store karo
    await redisClient.setEx(
        shortId,
        3600,
        entry.originalURL
    );

    // STEP 5 : Redirect
    return res.redirect(entry.originalURL);
});
app.listen(PORT, ()=> {
    console.log(`Server is running on http://localhost:${PORT}`);
})