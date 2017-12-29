class Person {
    constructor(surname, name, patronym, address, sex, educate, birthday){
        this.surname = surname,
        this.name = name,
        this.patronym = patronym,
        this.address = address,
        this.sex = sex,
        this.educate = educate,
        this.birthday = birthday;
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
        this.educate, this.birthday
        );
    };
};

let Evgen = new Person("Starov", "evgen", "Alex", "Mog");

Evgen.showPerson();

Evgen.allDataPerson = 'David Yosa Rabinovich Tel-Aviv male HS 17.11.91';

Evgen.FullName;