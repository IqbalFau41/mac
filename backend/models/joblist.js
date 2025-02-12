const sql = require("mssql");

// Create new job list item
const createJobListItem = async (data) => {
  const {
    nqp,
    nama_job,
    job_class,
    sub_section,
    factory,
    job_des,
    update_job,
    due_date,
    status,
  } = data;

  try {
    await sql.query`
      INSERT INTO member_joblist (
        nqp, 
        nama_job, 
        job_class, 
        sub_section, 
        factory, 
        job_des, 
        update_job, 
        due_date, 
        status
      ) VALUES (
        ${nqp}, 
        ${nama_job}, 
        ${job_class}, 
        ${sub_section}, 
        ${factory}, 
        ${job_des}, 
        ${update_job}, 
        ${due_date}, 
        ${status}
      )`;
    return { message: "Job list item created successfully" };
  } catch (error) {
    console.error("Error creating job list item:", error.message);
    throw error;
  }
};

// Get all job list items
const getJobListItems = async () => {
  try {
    const result =
      await sql.query`SELECT * FROM member_joblist ORDER BY no_part DESC`;
    return result.recordset;
  } catch (error) {
    console.error("Error fetching job list items:", error.message);
    throw error;
  }
};

// Update job list item
const updateJobListItem = async (no_part, data) => {
  const {
    nqp,
    nama_job,
    job_class,
    sub_section,
    factory,
    job_des,
    update_job,
    due_date,
    status,
  } = data;

  // Validation
  if (!nqp || !nama_job) {
    throw new Error("NQP and Job Name are required.");
  }

  const checkItem =
    await sql.query`SELECT * FROM member_joblist WHERE no_part = ${no_part}`;
  if (checkItem.recordset.length === 0) {
    throw new Error("Job list item not found");
  }

  try {
    await sql.query`
      UPDATE member_joblist 
      SET 
        nqp = ${nqp}, 
        nama_job = ${nama_job}, 
        job_class = ${job_class}, 
        sub_section = ${sub_section}, 
        factory = ${factory}, 
        job_des = ${job_des}, 
        update_job = ${update_job}, 
        due_date = ${due_date}, 
        status = ${status}
      WHERE no_part = ${no_part}`;
    return { message: "Job list item updated successfully" };
  } catch (error) {
    console.error("Error updating job list item:", error.message);
    throw error;
  }
};

// Delete job list item
const deleteJobListItem = async (no_part) => {
  const checkItem =
    await sql.query`SELECT * FROM member_joblist WHERE no_part = ${no_part}`;
  if (checkItem.recordset.length === 0) {
    throw new Error("Job list item not found");
  }

  try {
    await sql.query`DELETE FROM member_joblist WHERE no_part = ${no_part}`;
    return { message: "Job list item deleted successfully" };
  } catch (error) {
    console.error("Error deleting job list item:", error.message);
    throw error;
  }
};

module.exports = {
  createJobListItem,
  getJobListItems,
  updateJobListItem,
  deleteJobListItem,
};
