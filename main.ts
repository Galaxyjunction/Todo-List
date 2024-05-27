#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

//Creat an empty array of todo List..
let todo_list :string[] = [];

//Deleted todos store in this array and help in undo function
let delete_list :string[] = [];

//Creating a variable(condition), it helps to work in loop
let condition = true;

//Welcome note
console.log(chalk.rgb(250, 250, 0 ).bold.italic('\t \t \t Welcome to your todo list!\t \t \t'));

//Using while loop to ask question repeatedly from user

while (condition){
    console.log(chalk.bgMagentaBright.bold.italic("\tMenu"));
//Creating a menu for user to select an option
    let optionList = await inquirer.prompt([{

    name: "option",
    type: "list",
    message: chalk.bgCyan("Select an option"),
    choices: ["Add", "View" , "Delete", "Undo", "Exit"]
}]);
/////-----Add todo

if(optionList.option === "Add"){
    
    let addTodo = await inquirer.prompt([
    {
        name: "item",
        type: "input",
        message: "Enter a task to add."
    }]);
//////Make sure that user's input is not blank
/// And push the items in an array

    if(addTodo.item !== ''){
    todo_list.push(addTodo.item);
    console.log(chalk.bgGreen.bold.italic("Task added successfully"));
    }else{
        console.log(chalk.bgRedBright("Please write something to add in todo list."));
    }
}

////---- View todo list---
else if(optionList.option === "View"){
    let viewTodo = await inquirer.prompt([
        {
            name: 'view',
            type: 'list',
            message: chalk.bgBlueBright("Here is your do List."),
            choices: todo_list
        }
    ])
    console.log(viewTodo);
}
else if (optionList.option === "Delete"){
    let deleteTodo = await inquirer.prompt(
        {
        name: "remove",
        type: "list",
        message: chalk.bgWhite(" Select an item you want to delete from your list."),
        choices: todo_list
    }
)
let index: number = todo_list.indexOf(deleteTodo.remove);
delete_list = todo_list.splice(index , 1);
console.log(todo_list);

}
/////UNDO----

 else if (optionList.option === "Undo"){
   let undoTodo = await inquirer.prompt(
    {
        name: "undo",
        type: "confirm",
        message: chalk.rgb(290,290, 250)("do you want to undo delete item? ")
     })
     if (undoTodo.undo)
        {
            todo_list = todo_list.concat(delete_list);
            console.log(todo_list);
        }
        if(optionList.option === "Exit"){
            console.log("Exiting Program...");
            condition = false;
        }
}
}
