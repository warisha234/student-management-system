#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
console.log("============================================================");
console.log(chalk.bold.bgGreenBright("\n\t welcome to student manager \n"));
console.log("============================================================");
// define the students class
class Student {
    static counter = 100;
    id;
    name;
    courses;
    balance;
    constructor(name) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = [];
        this.balance = 100;
    }
    //method to enroll a student
    enroll_course(course) {
        this.courses.push(course);
    }
    //method to view a student balance
    view_balance() {
        console.log(`Balance for ${this.name} is $${this.balance}`);
    }
    //method to pay fees
    pay_fee(amount) {
        this.balance -= amount;
        console.log(`$${amount}fees paid successfully for ${this.name}`);
        console.log(`remaining balance is $${this.balance}`);
    }
    // method to display details students
    show_status() {
        console.log(`ID: ${this.id}`);
        console.log(`Name: ${this.name}`);
        console.log(`Courses: ${this.courses}`);
        console.log(`Balance: ${this.balance}`);
    }
}
//class to manage students
class Student_manager {
    students;
    constructor() {
        this.students = [];
    }
    //method to add a new student
    add_student(name) {
        let student = new Student(name);
        this.students.push(student);
        console.log(chalk.italic.greenBright(`student : ${name} added successfully . student ID: ${student.id}`));
    }
    //method to enroll a new student
    enroll_student(student_id, course) {
        //  let student =  this.students.find(std => std.id === student_id) 
        let student = this.find_student(student_id);
        if (student) {
            student.enroll_course(course);
            console.log(chalk.italic.greenBright(`${student.name} enrolled in ${course} successfully`));
        }
    }
    //method to view balance of student 
    view_student_balance(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.view_balance();
        }
        else {
            console.log(chalk.italic.redBright("Student not found please enter a correct student ID"));
        }
    }
    // method to pay student fee 
    pay_student_fee(student_id, amount) {
        let student = this.find_student(student_id);
        if (student) {
            student.pay_fee(amount);
        }
        else {
            console.log(chalk.italic.red("Student not found please enter a correct student ID"));
        }
    }
    // method to display student status
    show_student_status(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.show_status();
        }
    }
    //method to find a student by student id 
    find_student(student_id) {
        return this.students.find(std => std.id === student_id);
    }
}
// main fuction to console the programe 
async function main() {
    let student_manager = new Student_manager();
    // while loop to keep programe running
    while (true) {
        let choice = await inquirer.prompt([
            {
                name: "choices",
                type: "list",
                message: "select an option",
                choices: [
                    "Add Student",
                    "Enroll Student",
                    "View Student balance",
                    "Pay fee",
                    "Show status",
                    "Exit",
                ]
            }
        ]);
        // using switch case statement
        switch (choice.choices) {
            case "Add Student":
                let name_input = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "enter student name? "
                    }
                ]);
                student_manager.add_student(name_input.name);
                break;
            case "Enroll Student":
                let course_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "enter student id ? ",
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "enter course name ? ",
                    }
                ]);
                student_manager.enroll_student(course_input.student_id, course_input.course);
                break;
            case "View Student balance":
                let balance_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "enter student id ? ",
                    }
                ]);
                student_manager.view_student_balance(balance_input.student_id);
                break;
            case "Pay fee":
                let fee_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "enter student id ? ",
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: "enter the  amount to pay ? ",
                    }
                ]);
                student_manager.pay_student_fee(fee_input.student_id, fee_input.amount);
                break;
            case "Show status":
                let status_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: (chalk.bold.gray("enter student id ? ")),
                    }
                ]);
                student_manager.show_student_status(status_input.student_id);
                break;
            case "Exit":
                console.log("exiting");
                process.exit();
        }
    }
}
// calling a main function
main();
