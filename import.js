
const fs = require('fs');


function basedecoder(value, base) {
    return parseInt(value, base);
}


function lagrangeInterpolation(numbers) {
    let fixed = 0;

    for (let i = 0; i < numbers.length; i++) {
        let [x_i, y_i] = numbers[i];
        let phase = y_i;

        for (let j = 0; j < numbers.length; j++) {
            if (i !== j) {
                let [x_j] = numbers[j];
                phase *= x_j / (x_j - x_i);
            }
        }

        fixed += phase;
    }

    return Math.round(fixed);
}



function solvedequation(filename) {
    const content = fs.readFileSync(filename);
    const input = JSON.parse(content);

    const { n, k } = input.keys;
    let numbers = [];

  

    Object.keys(input).forEach(key => {
        if (!isNaN(key)) {
            const base = parseInt(input[key].base, 10);
            const value = input[key].value;
            const x = parseInt(key, 10);
            const y = basedecoder(value, base);

            numbers.push([x, y]);
        }
    });

   
    const requirednumbers = numbers.slice(0, k);

    
    const constantTerm = lagrangeInterpolation(requirednumbers);

    console.log(`The secret fixed phase (c) is: ${constantTerm}`);
}


solvedequation('testcase.json');
solvedequation('testcase2.json');
