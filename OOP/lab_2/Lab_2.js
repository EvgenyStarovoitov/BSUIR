// конструктор
function Polynomial() {
    this.init( arguments );
}
// инициализация многочлена
Polynomial.prototype.init = function(coefs) {
    this.coefs = new Array();
    for ( var i = coefs.length - 1; i >= 0; i-- ){
        this.coefs.push( coefs[i] );
    }
};
//  вычисление значения многочлена
Polynomial.prototype.eval = function(x) {
    if ( isNaN(x) ){
        throw new Error("Параметр должен быть числом!!");
    }
    var result = 0;
    for ( var i = this.coefs.length - 1; i >= 0; i-- ){
        result = result * x + this.coefs[i];
        console.log("результат=",result,"x=" ,x,"коэффы=",this.coefs[i])
    }
    return result;
};
// сложить многочлены
Polynomial.prototype.add = function(that) {
    var result = new Polynomial();
    var d1 = this.getDegree();
    var d2 = that.getDegree();
    var dmax = Math.max(d1,d2);
    for ( var i = 0; i <= dmax; i++ ) {
        var v1 = (i <= d1) ? this.coefs[i] : 0;
        var v2 = (i <= d2) ? that.coefs[i] : 0;
        result.coefs[i] = v1 + v2;
    }
    return result;
};
// умножить многочлены
Polynomial.prototype.multiply = function(that) {
    var result = new Polynomial();
    for ( var i = 0; i <= this.getDegree() + that.getDegree(); i++ ){
        result.coefs.push(0);
    }
    for ( var i = 0; i <= this.getDegree(); i++ ){
        for ( var j = 0; j <= that.getDegree(); j++ ){
            result.coefs[i+j] += this.coefs[i] * that.coefs[j];
        }
    }
    return result;
};
// разделить
Polynomial.prototype.divide_scalar = function(scalar) {
    for ( var i = 0; i < this.coefs.length; i++ )
        this.coefs[i] /= scalar;
};
// get/set методы
// найти степень
Polynomial.prototype.getDegree = function() {
    return this.coefs.length - 1;
};
// найти производную
Polynomial.prototype.getDerivative = function() {
    var derivative = new Polynomial();
    for ( var i = 1; i < this.coefs.length; i++ ) {
        derivative.coefs.push(i*this.coefs[i]);
    }
    return derivative;
};

let poly = new Polynomial(1,5,7,9,4)
let moly = new Polynomial(2,12,4,6)
let q = moly.eval(3)
q

