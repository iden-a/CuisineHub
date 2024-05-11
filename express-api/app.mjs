import serverless  from 'serverless-http';
import app from './lambda.mjs';
console.log("Hello World")
export const lambdaHandler = serverless(app);