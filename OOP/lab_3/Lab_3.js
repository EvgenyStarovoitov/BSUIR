class List{
    constructor(){
        this.warehouse = [];
    };
    addElem(elem){
        this.warehouse.push(elem);
    };
    removeElem(flightNumber, surnameAndInitials){
        for (let i = 0; i < this.warehouse.length; i++) {
            if (this.warehouse[i].flightNumber == flightNumber && this.warehouse[i].surnameAndInitials == surnameAndInitials) {
                this.warehouse.splice(i,i)
            };
        };
    };
    showElementByNumber(flightNumber, departureDate){
        let result = [];
        for (let i = 0; i < this.warehouse.length; i++) {
            if (this.warehouse[i].flightNumber == flightNumber && this.warehouse[i].departureDate == departureDate) {
                result.push(this.warehouse[i]);
            };
        };
        console.log(result);
    };
    showAllElements(){
        console.log(this.warehouse);
    };
}

class Order{
    constructor(destination, flightNumber, surnameAndInitials, departureDate, orderNumber){
        this.destination = destination,
        this.flightNumber = flightNumber,
        this.surnameAndInitials = surnameAndInitials,
        this.departureDate = departureDate
    };
};

let wh = new List();

wh.addElem(new Order('Moscow', '271', 'Volkov.A.V.', '2017.12.31'));
wh.addElem(new Order('Miami', '269', 'Rabinovich.A.A.', '2018.03.21'));
wh.addElem(new Order('Moscow', '271', 'Petrov.P.P.', '2017.12.31'));
wh.addElem(new Order('Minsk', '139', 'Starovoitov.E.A.', '2018.01.22'));
wh.addElem(new Order('St.Petersberg', '222', 'Liberman.S.I.', '2018.02.17'));

wh.removeElem('271','Volkov.A.V.');

wh.showElementByNumber('269','2018.03.21');

wh.showAllElements();

