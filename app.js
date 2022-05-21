import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import sessions from 'express-session'
import msIdExpress from 'microsoft-identity-express';

const appSettings = {
    appCredentials: {
        clientId:  "b8ce4802-a8ee-4b0a-8099-9699d750ed30",
        tenantId:  "f6b6dd5b-f02f-441a-99a0-162ac5060bd2",
        clientSecret:  "aNj8Q~XtyEaiJ0L133egITGpBzUmB1NdnUUOsaZv"
    },
    authRoutes: {
        redirect: "http://localhost:3000/redirect",
        //redirect: "https://www.{website name}/redirect",
        error: "/error",
        unauthorized: "/unauthorized"
    }
};

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js'
import apiv1Router from './routes/api/v1/apiv1.js';

import models from './models.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const oneDay = 1000 * 60 * 60 * 24
app.use(sessions({
    secret: "this is some secret key I am making up5ew4e[9umvecwljcl'sa",
    saveUninitialized: true,
    cookie: {maxAge: oneDay},
    resave: false
}))
const msid = new msIdExpress.WebAppAuthClientBuilder(appSettings).build();
app.use(msid.initialize());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
    req.models = models
    next();
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/v1', apiv1Router);

app.get('/signin',
    msid.signIn({postLoginRedirect: '/'})
)
app.get('/signout',
    // this might break later, change to website domain
    msid.signOut({postLogoutRedirect: '/'})
)
app.get('/unauthorized', (req, res) => {
    res.type('txt')
    res.send("Permission Denied");
})
app.get('/error', (req, res) => {
    res.type('txt')
    res.send("There was a server error");
})

export default app;
