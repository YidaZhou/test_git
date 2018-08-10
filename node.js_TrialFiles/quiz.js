'use strict';

/*function *prime(n) {
  var init = 4;
  var status;
  yield 1;
  yield 2;
  yield 3;
  while(init<n){
    status = true;
    for(var i=2;i<Math.sqrt(init);i++){
      if(init%i==0) {
        status = false;
      }
    }
    if(status){
      yield init;
    }
    init++;
  }
  return 'ended';
}*/

function *prime(n){
  var prime = new Array();
  for(let i=2;i<=n;i++){prime[i]=true;}
  for(let j in prime){
    if(prime[j]){
      yield j;
      for(let k=2;k<=n/j;k++){
        prime[j*k] = false;
      }
    }
  }
  return 'ended';
}

/*function *fib(){
  var a = 1;
  var b = 2;
  var c;
  yield a;
  yield b;
  while(true){
    c = a+b;
    yield c;
    a = b;
    b = c;
  }
}*/

var fibo = new Array(0, 1, 2);
function *fib(max){
  var i = 2;
  while(fibo[++i]!=undefined) {}
  i -= 1;
  var j = i-1;
  for(let num=1;num<=i;num++){yield fibo[num];}
  var num = i;
  while(num<max){
    fibo[num] = fibo[num-1] + fibo[num-2];
    yield fibo[num];
    num++;
  }
}


var a = fib(10);
var b = fib(10);
for(let apart=0;apart<7;apart++){
  console.log(a.next());
}
for(let apart=0;apart<10;apart++){
  console.log(b.next());
}
