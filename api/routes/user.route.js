import express from "express";
import { verifyToken } from "../utils/index.js";
import { storeUrlResult, submitFeedback, urlChecks } from "../controllers/user.controler.js";

const app=express()

app.post('/submit-feedback', verifyToken, submitFeedback);
app.post('/store-url-result', verifyToken, storeUrlResult);
app.get('/url-checks', verifyToken, urlChecks);

export default app;