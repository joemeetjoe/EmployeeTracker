const inquirer = require('inquirer');
const { inherits } = require('util');


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

let answerHandler = (answers) => {
    if (answers.MenuAnser == 'Quit'){
        return;
    }

};



let init = () => {
    let greeting = `
    __________________
    
    Employee Manager
    __________________
    `
    questions();
}

init();