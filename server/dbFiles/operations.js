const sql = require('mssql');
const config = require('../config');
const sqlConfig = config.db;

// Add new user
const addUser = async (User) => {
    try {
        await sql.connect(sqlConfig);
        const result = await sql.query(
            `INSERT INTO "User" VALUES ( ${User.isAdmin}, '${User.firstName}', '${User.lastName}',
             '${User.email}', '${User.hash}', '${User.image}')
             SELECT TOP 1 * FROM "User" ORDER BY id DESC`
        );
        console.log(result.recordset);
        return result.recordset
    } catch (err) {
        console.log(err);
        return false;
    }
}

// Retrives list of users
const getUsers = async () => {
    try{
        await sql.connect(sqlConfig);
        const result = await sql.query(
            ` SELECT * FROM "User" `
        );
        return result.recordset;
    } catch(err) {
        console.log(err);
    }
}

// To find the user by id
const findUser = async (userId) => {
    try{
        await sql.connect(sqlConfig);
        const result = await sql.query(
            ` SELECT * FROM "User" WHERE id = ${userId} `
        );
        return result.recordset;
    } catch(err) {
        console.log(err);
    }
}

// Add new task
const addTask = async (Task) => {
    try{
        await sql.connect(sqlConfig);
        const result = await sql.query(
            `INSERT INTO Task (text, status, priority, userId, dueDate, category) VALUES ('${Task.text}', '${Task.status}', '${Task.priority}', '${Task.userId}', '${Task.dueDate}', '${Task.category}')
            SELECT TOP 1 * FROM Task ORDER BY id DESC`
        );
        console.log(result.recordset);
        return result.recordset;
    } catch(err) {
        console.log(err);
    }
}

// Retrives a list of task
const getTasks = async () => {
    try{
        await sql.connect(sqlConfig);
        const result = await sql.query(
            ` SELECT * FROM Task `
        );
        return result.recordset;
    } catch(err) {
        console.log(err);
    }
}

// Delete a task by its id
const deleteTask = async (id) => {
    try{
        await sql.connect(sqlConfig);
        const result = await sql.query(
            ` DELETE FROM Task WHERE id = ${id} `
        );
        console.log(result);
        return result.recordset;
    } catch(err) {
        console.log(err);
    }
}

// Find task y its id
const findTask = async (id) => {
    try{
        await sql.connect(sqlConfig);
        const result = await sql.query(
            ` SELECT * FROM Task WHERE id = ${id} `
        );
        //console.log(result.recordset);
        return result.recordset;
    } catch(err) {
        console.log(err);
    }
}

// Updates a task's information
const editTask = async (id, text, priority, status, dueDate, category) => {
    try{
        await sql.connect(sqlConfig);
        const result = await sql.query(
            `UPDATE Task SET text = '${text}', priority = '${priority}', status = '${status}', dueDate = '${dueDate}', category = '${category}' WHERE id = ${id}
            SELECT * FROM Task WHERE id = ${id}`
        );
        console.log(result.recordset);
        return result.recordset[0];
    } catch(err) {
        console.log(err);
    }
}
// Updates a user's profile information
const updateUserProfile = async (id, firstName, lastName, email) => {
    try {
        await sql.connect(sqlConfig);
        const result = await sql.query(
            `UPDATE [User] SET firstName = '${firstName}', lastName = '${lastName}', email = '${email}' WHERE id = ${id}
            SELECT * FROM [User] WHERE id = ${id} `
        );

        console.log('Update user profile result:', result.recordset);
        if (result.recordset.length > 0) {
            return result.recordset[0];
        } else {
            console.error('User not found or update failed.');
            return "User not found";
        }
    } catch (err) {
        console.error('Error updating user profile:', err);
        return "Error in updating user";
    }
}

// Updates a user's password
// const changePassword = async (id, newPassword) => {
//     try {
//         await sql.connect(sqlConfig);
//         const hash = bcrypt.hashSync(newPassword, 10);
//         const result = await sql.query(
//             `UPDATE users SET hash = '${hash}' WHERE id = ${id}`
//         );
//         return result.rowsAffected > 0; 
//     } catch (err) {
//         console.error(err);
//         return false;
//     }
// };

// function isValidPassword(password) {
// };

module.exports = {
    addUser,
    getUsers,
    findUser,
    addTask,
    deleteTask,
    getTasks,
    findTask,
    editTask,
    updateUserProfile,
    changePassword
}