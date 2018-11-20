const database = require('./../database');

/**
 * @class Users
 * Stores all Users.
 * Note that all methods are static.
 * Wherever you import this class, you will be accessing the same data.
 */
class Users {
  /**
   * Add a User.
    * @param {string} email - email address of user
    * @param {string} firstName - first name of user
    * @param {string} lastName - last name of user
    * @param {skills} password - password of user
   */
  static async addUser(email, firstName, lastName, password) {
    try {
        const sql = `INSERT INTO users (email, first_name, last_name, password ) VALUES` +
        `('${email}', '${firstName}', '${lastName}', '${password}');`;
        const response = await database.query(sql);
        return response;
    } catch (err) { throw err; }
}

static async addSkill(userID, skillID) {
  try {
    // update skill
    const sql = 'INSERT INTO userSkills (user_id, skill_id) '
    + `VALUES ('${userID}', '${skillID}');`;
    const response = await database.query(sql);
    return response;
 } catch (err) { throw err; }
}

  /**
   * Find a User by Username.
   * @param {string} Username - Username of User to find
   * @return {User | undefined} - found User
   */
  static async findUser(username) {
    try {
      const sql = `SELECT * FROM users WHERE username = '${username}';`;
      const response = await database.query(sql);
      return response;
   } catch (err) { throw err; }
  }

  /**
   * Change username of user.
   * @param {string} Username - Username of User to update
   * @param {string} new username - new username
   * @return {User | undefined} - updated User; undefined if user not found
   */
  static async changeUsername(username, newUsername) {
    // TODO: change this later
    try {
      // update username in votes
      const sql1 = `UPDATE vote SET voter = '${newUsername}' WHERE voter ='${username}';`;
      // update usernames in follows
      const sql2 = `UPDATE follow SET followed = '${newUsername}' WHERE followed ='${username}';`;await database.query(sql1);
      // update username in followers
      const sql3 = `UPDATE follow SET follower = '${newUsername}' WHERE follower ='${username}';`;
      // update username 
      const sql4 = `UPDATE user SET username = '${newUsername}' WHERE username='${username}';`;
      await database.query(sql2);
      await database.query(sql3);
      const response = await database.query(sql4);
      return response;
   } catch (err) { throw err; }
  }

  /**
   * Change password of user.
   * @param {string} Username - Username of User to update
   * @param {string} password - new password
   * @return {User | undefined} - updated User; undefined if user not found
   */
  static async changePassword(username, newPassword) {
    try {
      const sql1 = `UPDATE user SET password = '${newPassword}' WHERE username='${username}';`;
      const response = await database.query(sql1);
      return response;
    } catch (err) { throw err; }
  }

  
  static async deleteUser(username) {
    // TODO: change this
    try {
      // delete from followers
      const sql1 = `DELETE FROM follow WHERE follower ='${username}' OR followed = '${username}';`;
      // delete from votes
      const sql2 = `DELETE FROM vote WHERE voter ='${username}';`;await database.query(sql1);
      // delete from users
      const sql3 = `DELETE FROM user WHERE username='${username}';`;await database.query(sql2);
      await database.query(sql1);
      await database.query(sql2);
      const response = await database.query(sql3);
      return response;
     } catch (err) { throw err; }
  }

}

module.exports = Users;
