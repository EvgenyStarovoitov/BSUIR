let ticketsWh = [];

class Tickets{
    constructor(destination, flightNumber, surnameAndInitials, departureDate, orderNumber){
        this.destination = destination,
        this.flightNumber = flightNumber,
        this.surnameAndInitials = surnameAndInitials,
        this.departureDate = departureDate
        // this.orderNumber = orderNumber
    }

}

let addOrder = (option) =>{
    let arr = option.split(' ');
    let newOrder = new Tickets(arr[0],arr[1],arr[2],arr[3],arr[4]);
    ticketsWh.push(newOrder);
};

let deleteOrder = (flightNumber, surnameAndInitials)=>{
    for (let i = 0; i < ticketsWh.length; i++) {
        if (ticketsWh[i].flightNumber == flightNumber && ticketsWh[i].surnameAndInitials == surnameAndInitials) {
            ticketsWh.splice(i,i)
        };
    };
    console.log(ticketsWh);
};

addOrder('Moscow 271 Volkov.A.V. 2017.12.31');
addOrder('Minsk 139 Starovoitov.E.A. 2018.01.22');
addOrder('St.Petersberg 222 Liberman.S.I. 2018.02.17');

deleteOrder('222', 'Liberman.S.I.');
