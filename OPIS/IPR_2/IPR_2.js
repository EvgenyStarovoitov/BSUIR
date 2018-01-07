////////////////
let arr1=[40,90,395,440,620],
    arr2=[30,110,385,470,740],
    arr3=[35,95,270,630,700];

let result = [];

let summAll = (pred,pred2,pred3)=>{
    pred.forEach((el,i)=>{
        for (let i = 0; i < pred2.length; i++) { 
            pred3.forEach((el2,i2)=>{
                let one = {}
                one.count =  el + pred2[i]+ el2;
                one.indexTotal = pred.indexOf(el) + pred2.indexOf(pred2[i]) +pred3.indexOf(el2)
                one.index1 = pred.indexOf(el);
                one.index2 = pred2.indexOf(pred2[i]);
                one.index3 = pred3.indexOf(el2);
                if(one.indexTotal == 4){
                result.push(one)  
                }   
            });
       };
    });
    console.log(result)
};

let findOptimal = (arr)=>{
    let AllRes = [];
    let maxRes = 0;
    let res = [];
    arr.forEach((el)=>{
        AllRes.push(el.count)
    });
    maxRes = Math.max.apply(null, AllRes);
    arr.forEach((el)=>{
        if(el.count == maxRes){
            res.push(el)
        };
    });
    console.log(res)
};

summAll(arr1,arr2,arr3)
findOptimal(result)