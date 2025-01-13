import { dbmaster } from "../database/db.connection.js";

export async function getAllUsers(req, res) {
  try {
    const { limit, page, type } = req.query;
    const user_id = res.locals.user.id;

    const whereClause = type ? `AND type = '${type}'` : '';
    const { rows: users } = await dbmaster.query(`
      SELECT * FROM users
      WHERE id != $3 ${whereClause}
      LIMIT $1 OFFSET $2
    `, [limit ? limit: 10, (page && limit) ? (page - 1) * limit : 1, user_id]);
    res.json(users);
  } catch(err) {
    console.log(err);
    res.status(500).send(err.message);
  }
}

export async function getUser(req, res) {
  try {
    const { id } = req.params;
    console.log('id', id)
    if(!id) return res.status(400).send('Id is required');
    const { rows: users } = await dbmaster.query(`
      SELECT 
        u.*,
        p.title,
        p.about,
        p.description,
        p.experiences,
        p.courses,
        p.skills
      FROM users u 
      LEFT JOIN profile p ON u.id = p.user_id
      WHERE u.id = $1
    `, [Number(id)]);
    if (!users.length) return res.status(404).send('User not found');
    res.json(users[0]);
  } catch(err) {
    console.log(err);
    res.status(500).send(err.message);
  }
}

export async function createProfile(req, res) {
  try {
    const { title, about, description } = req.body;
    const user_id = res.locals.user.id;
    const experiences = req.body.experiences || null;
    const courses = req.body.courses || null;
    const skills = req.body.skills || null;
    await dbmaster.query(`
      INSERT INTO profile (user_id, title, about, description, experiences, courses, skills)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `, [
        user_id,
        title, 
        about, 
        description, 
        experiences ? JSON.stringify(experiences) : null, 
        courses ? JSON.stringify(courses) : null, 
        skills ? JSON.stringify(skills): null,
      ]);

    res.status(201).send('Profile created');
  } catch(err) {
    console.log(err);
    res.status(500).send(err.message);
  }
}

export async function updateProfile(req, res) {
  try {
    const { title, about, description } = req.body;
    const user_id = res.locals.user.id;
    const experiences = req.body.experiences || null;
    const courses = req.body.courses || null;
    const skills = req.body.skills || null;
    if(!user_id) return res.status(400).send('User id is required');

    await dbmaster.query(`
      UPDATE profile
      SET title = $1, about = $2, description = $3, experiences = $4, courses = $5, skills = $6
      WHERE user_id = $7
    `, [
      title, 
      about, 
      description, 
      experiences ? JSON.stringify(experiences) : null, 
      courses ? JSON.stringify(courses) : null, 
      skills ? JSON.stringify(skills): null,
      user_id
    ]);
    res.send('Profile updated');
  } catch(err) {
    console.log(err);
    res.status(500).send(err.message);
  }
}