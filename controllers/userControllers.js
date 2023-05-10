const Users   = require("../models/user.js");
const jwt = require("jsonwebtoken");
const bcrypt  = require('bcrypt');

const saltRounds = 10;
const JWT_SECRET = "newtonSchool";
const dotenv = require('dotenv');
dotenv.config();

const options = {
    expiresIn: "1h",
};

/*
loginUser Controller

Get request json file structure
    obj =  {
        email:email,
        password: password,
    }


You need to complete the controller for user loginUser.
you need to login the user.
Complete the schema and to look the user schema look ../models/user.js
password is hashed using bcrypt saving it.


Response on different scenario

1. Invalid Password

403 Status code with 
json = {
        "message": 'Invalid Password, try again !!',
        "status": 'fail'
    }


2. Email Doesnot Exist

404 Status code with 
json = {
        "message": 'User with this E-mail does not exist !!',
        "status": 'fail'
    }

3. Success Login

//JWT token that will contain payload containing { userId }
generate a JSON web token (JWT) with the user's { userId } as the payload,
sign it with a JWT_SECRET key, and set the expiration time to 1 hour
//Don't change JWT_SECRET Secret Key.

200 Status code with 
json = {
  status: 'success',
  token : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ.eyJ1c2VySWQiOi'
}



*/

const loginUser =async (req, res) => {

    const email  = req.body.email;
    const password = req.body.password;

    //check email and password
    let user = await Users.findOne({ email });
    if (!user) return res.status(404).json({
        msg: "User with this E-mail does not exist !!",
        error: err.msg,
    });

    try {
        const isValid = await bcrypt.compare(password, user.password);
        if(!isValid) return res.status(403).json({
            msg: "Invalid email or Password, try again !!",
            error: err.msg,
        });
        const payload= { _id };
        const token = await jwt.sign(payload, env.JWT_SECRET, options);
        return res.header("X-Auth-Token", token).status(200).json({
            msg: "User logged in successfully",
            login: true,
        });
    } catch (err) {
        return res.status(500).json({
            msg: "Something went wrong...",
            error: err.msg,
            login: false,
        });
    }
}



/*

Post request json file structure
    obj =  {
        name:name,
        email:email,
        password: password,
        role: role
    }


You need to complete the controller for user signupUser.
you need to register the user.
If any user with given mail allready exist than throw error.
Complete the schema and to look the user schema look ../models/user.js
you should hash the password using bcrypt before saving it.



Response on different scenario

1. On success reg

200 Status code with 
json = {
    "message": 'User SignedUp successfully',
    "status": 'success'
}

2. if user with given email all ready exist.

409 Status code with 
json = {
    "status": 'fail',
    "message": 'User with given Email allready register'.
}

3. if something went wrong

404 Status code with 
json = {
    "status": 'fail',
    "message": 'Something went wrong'
}

*/

const signupUser = async (req, res) => {

    const {email, password, name, role} = req.body;

     //check for user existance
     let user = await Users.findOne({ email });
     if (user) return res.status(409).json({
        msg: "User with given Email already registered",
        error: err.msg,
    });

     try {
        console.log("Creating new user...");
        user = new Users({ email, password, name, role });
        console.log("before hashing user", user);

        //hashing the password
        const salt = await bcrypt.genSalt(saltRounds);
        user.password = await bcrypt.hash(password, salt);
        console.log("after hashing user", user);

        //save it on database
        const newUser = await user.save();

        //JWt create token
        const token = generateToken({ _id: user._id, email: user.email, role });

        return res.header("X-Auth-Token", token).status(200).json({
            msg: "User SignedUp successfully...",
            data:{
            name: newUser.name,
            email: newUser.email,
            }
        });
     } catch (err) {
        return res.status(404).json({
            msg: "Something went wrong",
            error: err.msg,
        });
     }
}

module.exports = { loginUser , signupUser };

