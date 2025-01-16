import { dbmaster } from "../database/db.connection.js";

export async function getAllVacancies(req, res) {
  try {
    const { limit, page, city, state, country } = req.query;

    let whereClause = '';
    if(city) whereClause += ` AND city = '${city}'`;
    if(state) whereClause += ` AND state = '${state}'`;
    if(country) whereClause += ` AND country = '${country}'`;

    const { rows: vacancies } = await dbmaster.query(`
      SELECT * FROM vacancy
      WHERE active = true ${whereClause}
      LIMIT $1 OFFSET $2
    `, [limit ? limit: 10, (page && limit) ? (page - 1) * limit : 0]);
    res.json(vacancies);
  } catch(err) {
    console.log(err);
    res.status(500).send(err.message);
  }
}

export async function getVacancy(req, res) {
  try {
    const { id } = req.query;
    if(!id) return res.status(400).send('Id is required');
    const { rows: vacancies } = await dbmaster.query(`
      SELECT v.*,
        u.name as recruiter_name,
        u.email as recruiter
      FROM vacancy v
      LEFT JOIN users u ON v.user_id = u.id
      WHERE v.id = $1 AND v.active = true
    `, [Number(id)]);
    if (!vacancies.length) return res.status(404).send('Vacancy not found');
    res.json(vacancies[0]);
  } catch(err) {
    console.log(err);
    res.status(500).send(err.message);
  }
}

export async function createVacancy(req, res) {
  try {
    const { title, seniority, description, company_name, city, state, country, type } = req.body;
    const user_id = res.locals.user.id;
    await dbmaster.query(`
      INSERT INTO vacancy (title, seniority, description, company_name, city, state, country, user_id, type)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    `, [
        title,
        seniority,
        description,
        company_name,
        city,
        state,
        country,
        user_id,
        type
      ]);
    res.status(201).send('Vacancy created');
  } catch(err) {
    console.log(err);
    res.status(500).send(err.message);
  }
}

export async function updateVacancy(req, res) {
  try {
    const { id, title, seniority, description, company_name, city, state, country, type } = req.body;
    await dbmaster.query(`
      UPDATE vacancy
      SET title = $1,
        seniority = $2,
        description = $3,
        company_name = $4,
        city = $5,
        state = $6,
        country = $7,
        type = $8
      WHERE id = $9
    `, [
        title,
        seniority,
        description,
        company_name,
        city,
        state,
        country,
        type,
        Number(id)
      ]);
    res.send('Vacancy updated');
  } catch(err) {
    console.log(err);
    res.status(500).send(err.message);
  }
}

export async function deleteVacancy(req, res) {
  try {
    const { id } = req.query;
    await dbmaster.query(`
      UPDATE vacancy
      SET active = false
      WHERE id = $1
    `, [Number(id)]);
    res.send('Vacancy deleted');
  } catch(err) {
    console.log(err);
    res.status(500).send(err.message);
  }
}