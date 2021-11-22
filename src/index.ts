const md5 = require('md5');
const fs = require('fs');

const createBitmap = (words : Array<string>, m : number, k : number) : Array<boolean> => {
    let bits = new Array(m).fill(false);

    for (let i = 0; i < words.length; i++) {
        let hash : string = md5(words[i]);
        let hash1 : number = Number.parseInt(hash.substring(0, 16), 16);
        let hash2 : number = Number.parseInt(hash.substring(16, 32), 16);

        for (let j = 1; j <= k; j++) {
            let hashj = (hash1 + j * hash2) % m;
            bits[hashj] = true;
        }
    }

    return bits;
}

const queryBloomFilter = (word : string, m : number, k : number, n : number, bitmap : Array<boolean>) : void => {
    let hash : string = md5(word);
    let hash1 : number = Number.parseInt(hash.substring(0, 16), 16);
    let hash2 : number = Number.parseInt(hash.substring(16, 32), 16);

    for (let j = 1; j <= k; j++) {
        let hashj = (hash1 + j * hash2) % m;
        if (bitmap[hashj] = false) {
            console.log(`${word} is not in the set.`);
        }
    }

    console.log(`${word} is in the set with a false positive probability of ${(1-(1 - 1/m)**(n*k))**k}`);
}

// const words = fs.readFileSync('words.txt', {encoding:'utf8', flag:'r'});

// const words_90 = Math.ceil(words.length * 0.9);
// const words_train = words.slice(0, words_90);
// const words_test = words.slice(words_90, words.length);

const words = ['emily', 'josh', 'olivia', 'chirag', 'yvonne', 'callum'];
const testwords = ['dan', 'alex', 'michael', 'laura'];

var bitmap = createBitmap(words, 500, 4);
for (let i = 0; i < testwords.length; i++) {
    queryBloomFilter(testwords[i], 500, 4, words.length, bitmap);
}
