# Emiza--L1---BE-Project-1--To-Do-App---1wuy40mr7l9g
TODO Application 





As a backend developer, you have been tasked with building a TODO Application  using NodeJS, ExpressJS, Mongoose & MongoDB. The system should be able to register and login user. The project requires the implementation of a userSchema that includes name, password, role, and email fields. 

The folder structure of the project should consist of four main folders: "src," "models," "routes," and "controllers."




"src":  contains the "index.js" and "app.js" files, where "index.js" handles the database connection.

"models" : includes the "user.js" file, which defines the schema for the MongoDB database using Mongoose.

"routes" : contains the "userRoutes.js" files, which handle routing for login and signup the user. You'll find routing logic with endpoints in these files. 

"controllers": folder includes the "userController.js" file for login and signup the user operations.



You only need to update 1 Controllers "userController.js", and 1 models  "user.js" .



NOTE: Don't edit any other file.



WHAT YOU HAVE TO DO?



1. Implement userSchema in user.js models. Write missing code only.




name should be a string and required.

password should be a string and required.

role should be a string with only two values ('user', 'admin') and default should be user.

email should be a string and required.

Also Enable timestamps which will store the date of the document created and updated.



You need to Modify ./models/user.js



2. Write controller logic for signupUser in userControllers.js. Controller structure is given to you in this file, write missing code only. 




Check if any user with the given email already exists. If so, throw an error.

Hash the password using bcrypt before saving it.

Return a 200 status code with a JSON response containing a success message if the signup is successful.

Return a 409 status code with a JSON response containing a failure message if the user with the given email already exists.

Return a 404 status code with a JSON response containing a failure message if something goes wrong.



Expected Input & Output:



Method: POST

Endpoint: api/v1/user/signup



Input :



req.body = { email:email, password: password, name:name, role: role}



Output :




On successful signup:


200 Status code.

json = { message: 'User SignedUp successfully', status: 'success' }



If user with given email all ready exist:

409 Status code.

json = { message: 'User with given Email allready register' , status: 'fail' }



If something went wrong:

404 Status code.

json = { message: 'Something went wrong' , status: 'fail' }





3. Write controller logic for loginUser in userControllers.js. Controller structure is given to you in this file, write missing code only. 




Check if the email exists in the database. If not, return a 404 status code with a JSON response containing a failure message.

Compare the password with the hashed password stored in the database using bcrypt. If they don't match, return a 403 status code with a JSON response containing a failure message.

Generate a JSON web token (JWT) with the user's { userId } as the payload, sign it with a JWT_SECRET key, and set the expiration time to 1 hour.

Return a 200 status code with a JSON response containing a success message and the generated token.



Expected Input & Output:



Method: GET

Endpoint: api/v1/user/login



Input :



req.body = { email:email, password: password}



Output :




Invalid Password :


403 Status code

json = { message: 'Invalid Password, try again !!', status: 'fail' }



Email Does not Exist :

404 Status code.

json = { message: 'User with this E-mail does not exist !!', status: 'fail' }



Success Login :

Generate a JSON web token (JWT) with the user's { userId } as the payload, sign it with a JWT_SECRET key, and set the expiration time to 1 hour

Don't change JWT_SECRET Secret Key.

200 Status code.

json = { status: 'success', token : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ.eyJ1c2VySWQiOi' }





Third-Party Libraries: The application uses two third-party libraries, JWT, and bcrypt.



NOTE: All error messages & success messages are in JSON Format.
