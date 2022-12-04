// https://www.udemy.com/course/learn-and-understand-deno-future-nodejs-beginner-guide/

export class Employee {
  id: number;
  name: string;
  
  constructor(_id: number, _name: string) {
    this.id = _id;
    this.name = _name;
  }

  displayEmployee() {
    console.log(`Employee Id ${this.id}, Employee Name: ${this.name}`);
  }
}
