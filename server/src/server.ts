import * as dotenv from "dotenv" // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import morgan from "morgan"
import helmet from "helmet"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import userRouter from "./routes/user.routes"
import presentationRouter from "./routes/presentation.routes"
import rateLimit from "express-rate-limit"

const PORT = 4000
const app = express()

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

const corsOptions = {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}

app.use(limiter)
app.use(helmet())
app.use(morgan("combined"))
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ limit: "1mb" }))

app.use("/api/v1/user", userRouter)
app.use("/api/v1/presentation", presentationRouter)

mongoose.connect(
    "mongodb+srv://raamizabbasi:WdoauCvmccpX2x6h@cluster0.k2l4xfy.mongodb.net/?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } as mongoose.ConnectOptions,
    (err) => {
        if (err) {
            throw new Error(`could not connect to mongodb: ${err}`)
        }
        console.log("Connected to MongoDB Successfully!")
    }
)

app.listen(PORT, () => {
    console.log(`CORS-enabled web server listening on port ${PORT}`)
})
