class Polynom {
    constructor(){
        this.init(arguments)
    };
    init(coefs){
        this.coefs = new Array();
        for ( var i = coefs.length - 1; i >= 0; i-- ){
            this.coefs.push( coefs[i] );
        };
    };
    eval(x){
        if ( isNaN(x) ){
            throw new Error("Параметр должен быть числом!!");
        };
        var result = 0;
        for ( var i = this.coefs.length - 1; i >= 0; i-- ){
            result = result * x + this.coefs[i];
            console.log("результат=",result,"x=" ,x,"коэффы=",this.coefs[i])
        };
        return result;   
    };
    add(that){
        var result = new Polynom();
        var d1 = this.getDegree();
        var d2 = that.getDegree();
        var dmax = Math.max(d1,d2);
        for ( var i = 0; i <= dmax; i++ ) {
            var v1 = (i <= d1) ? this.coefs[i] : 0;
            var v2 = (i <= d2) ? that.coefs[i] : 0;
            result.coefs[i] = v1 + v2;
        };
        return result;   
    };
    deprive(that){
        var result = new Polynom();
        var d1 = this.getDegree();
        var d2 = that.getDegree();
        var dmax = Math.max(d1,d2);
        for ( var i = 0; i <= dmax; i++ ) {
            var v1 = (i <= d1) ? this.coefs[i] : 0;
            var v2 = (i <= d2) ? that.coefs[i] : 0;
            result.coefs[i] = v1 - v2;
        };
        return result;   
    };
    multiply(){
        var result = new Polynom();
        for ( var i = 0; i <= this.getDegree() + that.getDegree(); i++ ){
            result.coefs.push(0);
        };
        for ( var i = 0; i <= this.getDegree(); i++ ){
            for ( var j = 0; j <= that.getDegree(); j++ ){
                result.coefs[i+j] += this.coefs[i] * that.coefs[j];
            };
        };
        return result;    
    };
    divide_scalar(scalar) {
        for ( var i = 0; i < this.coefs.length; i++ )
            this.coefs[i] /= scalar;
    };
    getDegree() {
        return this.coefs.length - 1;
    };
    getDerivative() {
        var derivative = new Polynom;
        for ( var i = 1; i < this.coefs.length; i++ ) {
            derivative.coefs.push(i*this.coefs[i]);
        };
        return derivative;
    };
};

let poly = new Polynom(1,5,7,9,4)
let moly = new Polynom(2,12,4,6)

let q = moly.eval(3)

let b = poly.deprive(moly)

b
q

