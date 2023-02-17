// importing in query from express
const { query } = require('express');
// requiring mysql2 promises
const mysql = require('mysql2/promise');

let db;
async function main() {
// Connect to database and save to db
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


// query for showing all employees
let employeeQuery = async() => {
    const query = await db.query('SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.title AS department, roles.salary, employees_copy.first_name AS manager FROM    (((employees INNER JOIN roles ON employees.role_id = roles.id) INNER JOIN departments ON roles.department_id = departments.id) LEFT JOIN employees as employees_copy ON employees.manager_id = employees_copy.id) ORDER BY id;').then((result) => result[0]);
    console.table(query);
};
// query for showing all roles
let roleQuery = async() => {
    const query = await db.query('SELECT  roles.id, roles.title, departments.title as departments, roles.salary FROM (roles INNER JOIN departments ON department_id = departments.id) ORDER BY id;').then((result) => result[0]);
    console.table(query);  
};
// query for showing all departments
let deptQuery = async() => {
    const query =  await db.query('SELECT * FROM departments ORDER BY id;').then((result) => result[0]);
    console.table(query);
};
// query for showing individual roles
let individualRoleQuery = async() => {
    let queryArray = [];
    const query =  await db.query('SELECT title FROM roles ORDER BY id;').then((result) => {
        let neededArray = result[0];
        for ( let i = 0; i < neededArray.length; i++){
            queryArray.push(neededArray[i].title) ;
        };
        return queryArray;
    });
    return(queryArray);
};
// query for showing individual names
let individualNameQuery = async() => {
    let queryArray = [];
    const query =  await db.query('SELECT first_name, last_name FROM employees ORDER BY id;').then((result) => {
        let neededArray = result[0];
        for ( let i = 0; i < neededArray.length; i++){
            queryArray.push(neededArray[i].first_name + " " + neededArray[i].last_name) ;
        };
        return queryArray;
    });
    return(queryArray);
};
// query for showing individual departments
let individualDeptQuery = async() => {
    let queryArray = [];
    const query =  await db.query('SELECT title FROM departments ORDER BY id;').then((result) => {
        let neededArray = result[0];
        for ( let i = 0; i < neededArray.length; i++){
            queryArray.push(neededArray[i].title) ;
        };
        return queryArray;
    });
    return queryArray;
};
// adding in departments
let addDepartments = async(department_answer) => {
    const query = await db.query('INSERT INTO departments (title) VALUES (?)', [department_answer.department_answer]).then((result) => {
        console.log(`
        
        ${department_answer.department_answer} added to database
        
        `);
    });
}
// adding in roles
let roleId;
let addRoles = async(answers) => {
    const getDeptIdQuery = await db.query('SELECT id FROM departments WHERE title = ?', [answers.department_answer]).then((result) => result[0]);
            roleId = getDeptIdQuery[0].id;
    
    const query = await db.query('INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)', [answers.role_answer, answers.salary_answer, roleId]).then((result) => {
        console.log(`

        ${answers.role_answer} added to database
        
        `)
    });
}
// updating employee roles
let updateEmployeeRole = async(answers) => {
    let nameArray = answers.employee_answer.split(" ");
    console.log(answers.update_role_answer);
    const getRolesIdQuery = await db.query('SELECT id FROM roles WHERE title = ?', [answers.update_role_answer]).then((result) => result[0])
            roleId = getRolesIdQuery[0].id;
            console.log(roleId);

    const query = await db.query('UPDATE employees SET role_id = ? WHERE first_name = ?', [ roleId, nameArray[0]]).then((result) => {
        console.log(`

        ${nameArray[0]}'s role changed to ${answers.update_role_answer}.
        
        `)
    });
};
// adding in employees
let addEmployee = async(answers) => {
    let nameArray = answers.manager_answer.split(" ");
    const getRolesIdQuery = await db.query('SELECT id FROM roles WHERE title = ?', [answers.role_answer]).then((result) => result[0])
            let ManagerRoleId = getRolesIdQuery[0].id;
            console.log(ManagerRoleId)
            
    const getManagerIdQuery = await db.query('SELECT id FROM employees WHERE first_name = ?', [nameArray[0]]).then((result) => result[0])
            roleId = getManagerIdQuery[0].id;
            console.log(roleId)
            

    const query = await db.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)', [ answers.first_name, answers.last_name, roleId, ManagerRoleId ]).then((result) => {
        console.log(`

        ${answers.first_name} added as an employee.
        
        `)
    });
};
// exporting all of the functions
module.exports = {
    employeeQuery,
    roleQuery,
    deptQuery,
    individualRoleQuery,
    individualNameQuery,
    addDepartments,
    addRoles,
    individualDeptQuery,
    updateEmployeeRole,
    addEmployee
}










