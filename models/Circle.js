const database = require('../database');

/**
 * @class Circle
 */
class Circle {
    /**
     * Create Circle
      * @param {User} mentor 
      * @param {User} mentee - first name of user
      * @param {Skill} skill - skill that mentor is teaching the mentee
     */


    constructor(mentor, mentee, skill) {
        this.mentor = mentor;
        this.mentee = mentee;
        this.skill = skill;
    }

    toString() {
        return `Circle : ${mentor} teaching ${mentee} for ${skill}`
    }

    /**
     * Find a match for the given User
     * @param {String} email - id of the user to be matched
     */
    static async findCircle(email, need) {
        
        console.log(need);
        const sql_need = `SELECT id FROM skills where name = ${need}`

        const need_id = await database.query(sql_need); 
        console.log("flaflala " + need_id[0].id);

        const sql = `SELECT email 
                    FROM users 
                    WHERE id IN 
                        (SELECT user_id 
                        from userSkills
                        WHERE userSkills.skill_id = ${need_id[0].id})
                    AND 
                    id IN
                        (SELECT users.id from users
                        WHERE users.id NOT IN (
                        SELECT mentor_id 
                        FROM matches
                        GROUP BY mentor_id
                        HAVING COUNT(*) > 3
                    ))`

        const response = await database.query(sql); 
        return response

    }


}

module.exports = Circle; 