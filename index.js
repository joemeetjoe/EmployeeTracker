const inquirer = require('inquirer');
const { inherits } = require('util');
const helper = require ("./utils/queries.js")
// main questions to be asked to the user on startup
let questions = () => {
    inquirer
    .prompt ([
        {
            type: 'list',
            name: 'MenuAnswer',
            message: 'What would you like to do?',
            choices: [
                'View all employees', 
                'Add employee', 
                'Update employee role', 
                'View all roles', 
                'Add role', 
                'View all departments',
                'Add department',
                'Quit', 
            ]

        }
    ])
    .then ((answers) => {
        answerHandler(answers);
    })
};
// second set of quetions to be asked if the user chooses add employee
let addEmployeeQuestions = async() => {
    inquirer
    .prompt ([
        { 
            type: 'input',
            name: 'first_name',
            message: "What is the employee's first name?"
        },
        { 
            type: 'input',
            name: 'last_name',
            message: "What is the employee's last name?",
        },
        {
            type: 'list',
            name: 'role_answer',
            message: "What is the Employee's role?",
            choices: await helper.individualRoleQuery(),
        },
        {
            type: 'list',
            name: 'manager_answer',
            message: "What is the Employee's manager?",
            choices: await helper.individualNameQuery(),
        }
    ])
    .then (async(answers) => {
        await helper.addEmployee(answers);
        questions();
    })
}
// second set of quetions to be asked if user chooses change employee role
let employeeRoleQuestions = async() => {
    inquirer
    .prompt ([
        {
            type: 'list',
            name: 'employee_answer',
            message: "Which employees' role would you like to update?",
            choices: await helper.individualNameQuery(),
        },
        {
            type: 'list',
            name: 'update_role_answer',
            message: "What would you like their new role to be?",
            choices: await helper.individualRoleQuery(),
        }
    ])
    .then ( async(answers) => {
        await helper.updateEmployeeRole(answers);
        questions();
    })
};
// second set of questions to be asked if the user chooses add role
let addRoleQuestions = async() => {
    inquirer
    .prompt ([
        { 
            type: 'input',
            name: 'role_answer',
            message: "What is the the name of the role?"
        },
        { 
            type: 'input',
            name: 'salary_answer',
            message: "What is the the salary of the role?"
        },
        {
            type: 'list',
            name: 'department_answer',
            message: "What department does this belong in?",
            choices: await helper.individualDeptQuery(),
        }
    ])
    .then (async (answers) => {
        await helper.addRoles(answers)
        questions();
    })
};
// second set of questions to be asked if the user chooses add department
let addDepartmentQuestions = async() => {
    inquirer
    .prompt ([
        { 
            type: 'input',
            name: 'department_answer',
            message: "What is the the name of the department?"
        },
    ])
    .then ( async (answers) => {
        await helper.addDepartments(answers)
        questions();
    })
};

// answer handler for first set of questions
let answerHandler = async (answers) => {
    if (answers.MenuAnswer == 'Quit'){
        process.exit();
    } else if (answers.MenuAnswer == "View all employees"){
        await helper.employeeQuery();
        questions();
    } else if (answers.MenuAnswer == "View all roles"){
        await helper.roleQuery();
        questions();
    } else if (answers.MenuAnswer == "View all departments"){
        await helper.deptQuery();
        questions();
    } else if (answers.MenuAnswer == "Add employee"){
        addEmployeeQuestions();
    } else if (answers.MenuAnswer == "Update employee role"){
        employeeRoleQuestions();
    } else if (answers.MenuAnswer == "Add role"){
        addRoleQuestions();
    } else if (answers.MenuAnswer == "Add department"){
        addDepartmentQuestions();
    }
};

// initialize with greeting
let init = () => {
    let greeting = `
    __________________
    
    Employee Manager
    __________________
    `
    console.log(greeting);
    questions();
}
// calling init
init();