
class User {
    constructor(username = null, uuid = null, firstName = null, lastName = null, email = null) {
        this.username = username;
        this.uuid = uuid;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }
}

export default User;