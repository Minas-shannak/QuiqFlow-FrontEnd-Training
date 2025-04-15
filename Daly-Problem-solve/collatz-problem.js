let CollatzProblem = function(n){
    if (n === 1) return 1;
    
    let integer = n;
    let sequence = [n];

    while(integer != 1){
        if(integer % 2 == 0){
            integer = integer / 2;
            sequence.push(integer);
            }else {
            integer = integer * 3 + 1;
            sequence.push(integer);
            }
    }

    return sequence.join(" → ");
}

console.log(CollatzProblem(13));