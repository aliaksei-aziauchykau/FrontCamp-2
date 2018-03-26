var express = require("express");
var router = express.Router();
var mapper = require("../helpers/mapper");
var database = require("../db/database");

router.get("/", (request, response) => {
    const UserSchema = database.schemes.userSchema;
    UserSchema.find({}, (error, data) => {
        // let user = new database.models.User();
        // data = mapper.mapProperties(data, user);
        let result = error ? error : { users: data }
        response.json(result);
    })
});

router.get("/:id", (request, response) => {
    const UserSchema = database.schemes.userSchema;
    UserSchema.findById(request.params.id, (error, data) => {
        let result = error ? error : data 
        response.json(result);
    });
});

router.post("/", (request, response) => {
    const UserModel = database.models.User;
    let user = new UserModel();
    
    mapper.mapProperties(request.body, user);
    
    const UserSchema = database.schemes.userSchema;
    new UserSchema(user).save((error) => {
        error ? response.json("Error") : response.json("ok");
    });
});


module.exports = router;