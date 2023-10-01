var sum_to_n_a = function(n) {
    if(n <= 0) throw Error("n invalid");
    if(n === 1) {
        return 1;
    }else{
        return n + sum_to_n_a(n - 1)
    }
};

var sum_to_n_b = function(n) {
    if(n <= 0) throw Error("n invalid");
    let result = 0;
    for (let index = 0; index <= n; index++) {
        result += index
    }
    return result;
};

var sum_to_n_c = function(n) {
    if(n <= 0) throw Error("n invalid");
    return (n * (n + 1)) / 2;
};
