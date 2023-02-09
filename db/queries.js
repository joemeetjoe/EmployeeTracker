const { query } = require('express');

const mysql = require('mysql2/promise');
let db;
async function main() {

// Connect to database
db = await mysql.createConnection(
    {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'Root1234',
    database: 'employee_tracker'
    },
    console.log(`Connected to the employee_tracker database.`)
);
}
main();



let employeeQuery = async() => {
    const query = await db.query('SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.title AS department, roles.salary, employees_copy.first_name AS manager FROM    (((employees INNER JOIN roles ON employees.role_id = roles.id) INNER JOIN departments ON roles.department_id = departments.id) LEFT JOIN employees as employees_copy ON employees.manager_id = employees_copy.id) ORDER BY id;').then((result) => result[0]);
    console.table(query);
};

let roleQuery = async() => {
    const query = await db.query('SELECT  roles.id, roles.title, departments.title as departments, roles.salary FROM (roles INNER JOIN departments ON department_id = departments.id) ORDER BY id;').then((result) => result[0]);
    console.table(query);  
};

let deptQuery = async() => {
    const query =  await db.query('SELECT * FROM departments ORDER BY id;').then((result) => result[0]);
    console.table(query);
};

let individualRoleQuery = () => {
    let queryArray = [];
    db.query('SELECT title FROM roles ORDER BY id;', (err, result) => {
        if (err) {
            console.log(err);
        }
            queryArray = result;
        })
console.log(queryArray);
return queryArray
}

// let employeeAdd = (first_name, last_name, role, manager) => {
//     db.query('')
// }

// individualRoleQuery();


module.exports = {
    employeeQuery,
    roleQuery,
    deptQuery,
    individualRoleQuery,
}










