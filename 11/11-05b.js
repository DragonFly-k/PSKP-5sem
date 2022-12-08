const async= require('async');
const rpcWSC = require('rpc-websockets').Client;
let ws = new rpcWSC('ws://localhost:4000');

let h = (x=ws) => async.parallel({
    square: (cb)=>{ws.call('square', [3]).catch((e)=>cb(e,null)).then((r)=>cb(null,r));},
    square2: (cb)=>{ws.call('square', [5, 4]).catch((e)=>cb(e,null)).then((r)=>cb(null,r));},

    sum: (cb)=>{ws.call('sum', [2]).catch((e)=>cb(e,null)).then((r)=>cb(null,r));},
    sum2: (cb)=>{ws.call('sum', [2, 4, 6, 8, 10]).catch((e)=>cb(e,null)).then((r)=>cb(null,r));}, 

    mul: (cb)=>{ws.call('mul', [3]).catch((e)=>cb(e,null)).then((r)=>cb(null,r));},
    mul2: (cb)=>{ws.call('mul', [3, 5, 7, 9, 11, 13]).catch((e)=>cb(e,null)).then((r)=>cb(null,r));},

    fib: (cb) =>{ws.login({login: 'admin', password: 'admin'})
        .then((login) => {ws.call('fib', [1]).catch((e)=>cb(e,null)).then((r)=>cb(null,r));})},
    fib2: (cb) =>{ws.login({login: 'admin', password: 'admin'})
        .then((login) => {ws.call('fib', [2]).catch((e)=>cb(e,null)).then((r)=>cb(null,r));})},
    fib3: (cb) =>{ws.login({login: 'admin', password: 'admin'})
        .then((login) => {ws.call('fib', [7]).catch((e)=>cb(e,null)).then((r)=>cb(null,r));})},
        
    fact: (cb) =>{ws.login({login: 'admin', password: 'admin'})
        .then((login) => {ws.call('fact', [0]).catch((e)=>cb(e,null)).then((r)=>cb(null,r));})},
    fact2: (cb) =>{ws.login({login: 'admin', password: 'admin'})
        .then((login) => {ws.call('fact', [5]).catch((e)=>cb(e,null)).then((r)=>cb(null,r));})},
    fact3: (cb) =>{ws.login({login: 'admin', password: 'admin'})
        .then((login) => {ws.call('fact', [10]).catch((e)=>cb(e,null)).then((r)=>cb(null,r));})}
}, (error, result) => {
    if(error) console.log('error =', error);
    else console.log('result =', result);
    ws.close();
});
ws.on('open', h);