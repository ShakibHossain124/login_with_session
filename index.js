import express from 'express'
import session from 'express-session';
import cookieParser from 'cookie-parser';
import pgConenct from 'connect-pg-simple';
import pool from './db.js';
import logInRoute from './routes/logInRoute.js';
import {authorizeAdmin, authorizeUser} from './middlewires/authenticate.js';

const PostgresStore = pgConenct(session);


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  store: new PostgresStore({
    pool: pool, // Connection pool
    createTableIfMissing: true, // Automatically create the session table if it doesn't exist
    pruneSessionInterval: 60 * 60 * 1000 // Prune expired sessions every hour                
  }),
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));

app.use('/', logInRoute);
app.get('/dashboard', authorizeUser, (req, res) => {
    res.send('Welcome to the dashboard!');
});

app.get('/admin', authorizeAdmin, (req, res) => {
    res.send('Welcome to the admin panel!');
});

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).send('Error occurred while logging out');
        }
        res.send('You have been logged out successfully');
    });
});

app.listen(3000,()=>{
  console.log('Server is running on port 3000');
})