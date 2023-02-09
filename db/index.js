const inquirer = require('inquirer');
const { inherits } = require('util');
const helper = require ("./queries.js")



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



let addEmployeeQuestions = () => {
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
            choices: helper.individualRoleQuery(),
        }
    ])
    .then ((answers) => {
        console.log(answers);
        // helper.employeeAdd(first_name, last_name, role, manager);
        questions();
    })
}

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
        
        
    } 

};



let init = () => {
    let greeting = `
    __________________
    
    Employee Manager
    __________________
    `
    console.log(greeting);
    questions();
}

init();