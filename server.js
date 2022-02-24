const express = require('express');
const expressGraphQL = require('express-graphql').graphqlHTTP
const schema = require('./schema/schema')

// import express from 'express';
// import {graphqlHTTP as expressGraphQL} from "express-graphql"

const app = express();

app.use('/graphql', expressGraphQL({
    schema,
    graphiql: true
}))

app.listen(4000,()=>{
    console.log('listening')
})

