let OrdersWh = [];

class Orders{
    constructor(destination, flightNumber, surnameAndInitials, departureDate, orderNumber){
        this.destination = destination,
        this.flightNumber = flightNumber,
        this.surnameAndInitials = surnameAndInitials,
        this.departureDate = departureDate
        // this.orderNumber = orderNumber
    };
}

let addOrder = (option) =>{
    let arr = option.split(' ');
    let newOrder = new Orders(arr[0],arr[1],arr[2],arr[3],arr[4]);
    OrdersWh.push(newOrder);
};

let deleteOrder = (flightNumber, surnameAndInitials)=>{
    for (let i = 0; i < OrdersWh.length; i++) {
        if (OrdersWh[i].flightNumber == flightNumber && OrdersWh[i].surnameAndInitials == surnameAndInitials) {
            OrdersWh.splice(i,i)
        };
    };
};

let showOrderByNumber = (flightNumber, departureDate)=>{
    let result = [];
    for (let i = 0; i < OrdersWh.length; i++) {
        if (OrdersWh[i].flightNumber == flightNumber && OrdersWh[i].departureDate == departureDate) {
            result.push(OrdersWh[i]);
        };
    };
    console.log(result)
};

let showAllOrder = ()=>{
    console.log(OrdersWh)
}

addOrder('Moscow 271 Volkov.A.V. 2017.12.31');
addOrder('Moscow 271 Petrov.P.P. 2017.12.31');
addOrder('Minsk 139 Starovoitov.E.A. 2018.01.22');
addOrder('St.Petersberg 222 Liberman.S.I. 2018.02.17');

deleteOrder('222', 'Liberman.S.I.');

showOrderByNumber('271', '2017.12.31');

showAllOrder();