l1 = [2, 4, 3], l2 = [5, 6, 4]

var addTwoNumbers = function (l1, l2) {
    let sums = [];
    for (let i = l1.length - 1, j = l2.length - 1; i >= 0, j >= 0; j--, i--) {
        let sum = l1[i] + l2[j];

        if (sum >= 10) {
            let carry = sum - 10;
            sum = sum % 10;
            sums.push(sum);
            sums[i + 1] += carry;
        }
        
    }
    return sums;
};

console.log(addTwoNumbers(l1, l2));