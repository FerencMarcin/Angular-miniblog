const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect("mongodb+srv://user:gXEtBjhj0S1TvpFO@labproject.iyfhv.mongodb.net/angular_project?retryWrites=true&w=majority")
        .then(() => {
            console.log("Polaczono z baza danych MongoDB")
        }) //connect method returns promise when ewerything is fine
        .catch(() => {
            console.log("Nie udalo sie polaczyc z baz danych");
        });  //connect method can return error when something goes wrong
}