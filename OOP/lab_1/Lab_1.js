class Person {
    constructor(surname, name, patronym, address, sex, educate, birthday){
        this.surname = surname,
        this.name = name,
        this.patronym = patronym,
        this.address = address,
        this.sex = sex,
        this.educate = educate,
        this.birthday = birthday,
        this.age = nowYear - birthday
    };
    get FullName(){
        return this.surname + ' ' + this.name;
    };
    set namePerson(value){
        this.name = value;
    };
    set allDataPerson(values){
        [this.surname, this.name, this.patronym, this.address, this.sex,
            this.educate, this.birthday] = values.split(' ');
    };
    showPerson(){
        console.log(this.surname, this.name, this.patronym, this.address, this.sex,
        this.educate, this.birthday, this.age
        );
    };
};

let now = new Date();
let nowYear = now.getFullYear();

let arr = []

let Evgen = new Person("Starov", "evgen", "Alex", "Mog"),
    Izya = new Person("Старовойтов", "Евгений", "Александрович", "Могилев", "male", "MS", "1992"),
    Moisha = new Person("Моисеенко", "Игорь", "Витальевич", "Минск", "male", "HS", "1988"),
    Sara = new Person("Либерман", "Сара", "Иосифовна", "Иерусалим", "female", "HS", "1995"),
    Lola = new Person("Блестящая", "Лола", "Олеговна", "Витебск", "female", "MS", "1972");

arr.push(Evgen, Izya, Moisha, Sara, Lola);
console.log(arr);
Evgen.showPerson();

Evgen.allDataPerson = 'David Yosa Rabinovich Tel-Aviv male HS 1991';

Izya.showPerson();

Evgen.FullName;

let sortByAge = (age, array) => {
    let result = [];
    for (let i = 0; i < array.length; i++) {
        if (array[i].age >= age ) {
            result.push(array[i])
        }
    }
    console.log(result)
};
let sortByEducate = (educate, array) => {
    let result = [];
    for (let i = 0; i < array.length; i++) {
        if (array[i].educate == educate ) {
            result.push(array[i])
        }
    }
    console.log(result)
};
let sortBySex = (sex, array) => {
    let result = [];
    for (let i = 0; i < array.length; i++) {
        if (array[i].sex >= sex ) {
            result.push(array[i])
        }
    }
    console.log(result)
}
sortByAge("26", arr );
sortByEducate("HS", arr );
sortBySex("male", arr );
