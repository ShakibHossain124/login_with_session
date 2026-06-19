import {findPassByUsername} from '../model/loginModel.js';

export const checkUser = (pass, password) => {
    return pass === password;
};

export const login = async (req, res) => {
    const { username, password } = req.body;
    let pass = await findPassByUsername(username);
    pass = pass ? pass.password : null;
    if (pass) {
        const isMatch = checkUser(pass, password);
        if (isMatch) {
            req.session.user = { username };
            return res.send('Login successful');
        } else {
            console.log(username, password, pass);
            return res.status(401).send('Invalid credentials');
        }
    }
    return res.status(404).send('User not found');
};