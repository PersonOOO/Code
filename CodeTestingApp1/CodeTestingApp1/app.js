'use strict';

var numbers = [2, 5, 3, 1, 6]

function changeNums(numList, addNum, subtractNum) {
    for (var i = 0; i < numList.length; i++) {
        if (numList[i] % 3 == 0) {
            numList[i] = numList[i] + addNum;
        } else {
            numList[i] = numList[i] - subtractNum;
        }
    }
}

changeNums(numbers, 3, 2);
console.log(numbers);