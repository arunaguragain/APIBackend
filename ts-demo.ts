let message = "hello";
let message2 = "TypeScript";
console.log(message, message2);
//message = 1; //auto
//message2 = true  //error -type enforced

//primitive types
let booleanVar: boolean = true;
let numberVar: number = 42;
let stringVar : string = "TypeScript";
let nullVar : null = null;
let undefinedVar: undefined = undefined;
let symbolVar: symbol = Symbol("unique");

// any and unknown types
let anyVar : any = 10;
anyVar = anyVar + 1;   //no error 

let unknownVar: unknown = "10";
//unknownVar = unknownVar + 1; //error
//any type can be used for any operations
console.log("End of file");

//array/tuples
let scores: number[] = [90, 80, 70];
let userData: [string, number] = ["Alice", 30];   //fixed length and types
//userData[0] = 1; //error

console.log(scores, userData)

//Union 
let age: number | string = 25;  //can be either
console.log(age)
age = "Thirty"
console.log(age)
//age = false  //error

console.log("End of the file");

//functions with types
function add(num1:number, num2:number): string{
    let sum: number = num1 + num2;
    return `Sum is ${sum}`;
}
let result: string = add(10, 20);
console.log(result);

const greet = (name: string = "Guest"): void => {
    console.log(`Hello, ${name}`);
}

greet();  //name optional
greet("Bob");
//greet(123);  //error


//Object types
// 1. Onject iterals
let person: { name: string, age: number};
person = {name: "Charlie", age: 28};
console.log(person.name)

//2.Interfaces
interface Product {
    id: number;
    name: string;
    price: number;
    description?: string; //optional
}
let product1: Product = {id:1, name:"Laptop", price: 999.99};
console.log(product1)
//3. Type Aliases
type Student = {
    id: number;
    name: string;
    product? : Product; //optional
}
let student1: Student = {id: 101, name:"David", product: product1};
console.log(student1)

//Generics
//DataTypep injection at runtime
function identify<T>(arg: T) : T {
    return arg;
}
let output1: string = identify<string>("Hello Generics");
let output2: number = identify<number>(12345);
console.log(output1, output2);
//differs from any as it preserves type information

//Enum - named constants
enum Direction {
    ADMIN , // in default - ADMIN = 0
    USER, 
    GUEST
}

let userRole: Direction = Direction.USER;
console.log(userRole);  //1
console.log(Direction[userRole]);  //USER
//Compare usecase
console.log(userRole === Direction.USER)  // exact comparision  / single source
let usrRole: string = "USER";
console.log(usrRole === "USER")    //inconsitant prone to typo and mistake


// Generic usecases with utility types
interface User {
    id: number;
    name: string;
    role: Direction;
}
let user1: User = {id:1, name:"Eve", role: Direction.ADMIN};

let user2: Partial<User> = {id: 2};  //all properties optional 
console.log(user2)

let user3: Readonly<User> = {id: 3, name: "Frank", role: Direction.GUEST};
//user3.name = "New Name "; // error - readonly
console.log(user3)


//Tasks
enum CarType{
    Sedan,
    SUV,
    Truck,
    Coupe
}

type CarModel = {
    name: string,
    description: string
}

interface Car {
    make: string | number;
    model: CarModel;
    year: number;
    type : CarType;
    isElectric?: boolean | number | string;
}

let cars: Car [] = [
    {
        make: "Toyota",
        model: {name: "Camry", description: "A comfortable sedan"},
        year: 2018,
        type: CarType.Sedan,
        isElectric: false
    }
]
//cars.filter