class User{
    constructor(isAdmin, firstName, lastName, email, hash, image){
        this.isAdmin = isAdmin;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.hash = hash;
        this.image = `https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava${image}-bg.webp`
    }
} 

module.exports = User;