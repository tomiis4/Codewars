const toInt = (n: number[]): number => {
	return parseInt(n.join(''));
}

const swap = (a:number, b:number) => {
	return [b,a]
};


// TODO
// 1) Take biggest number from i=2 in reversed
//		- if not, i++
//	2) swap i-1 with that number
function nextBigger(n: number): number {
	let numbers = n
		.toString()
		.split('')
		.map(e => parseInt(e));

	numbers.reverse();

	// 1)
	let i = 0;
	while (numbers[i+1] != undefined) {
		if (numbers[i] > numbers[i+1]) {
			[numbers[i], numbers[i+1]] = swap(numbers[i], numbers[i+1])
			break;
		}
		i++;
	}

	// 2)

	let sorted = numbers
		.slice(0, i+1)
		.sort((a,b) => b-a)
		.concat(numbers.slice(i+1))
		.reverse();


	if (toInt(sorted) > n) return toInt(sorted);
	return -1;
}

console.log(nextBigger(459853))

if (nextBigger(1234567890) == 1234567908) {
	console.log("\n  Test 1 passed")
} else {
	console.log("\n  [X] Test 1 failed")
}

if (nextBigger(414) == 441) {
	console.log("  Test 2 passed")
} else {
	console.log("  [X] Test 2 failed")
}

if (nextBigger(9876543210) == -1) {
	console.log("  Test 3 passed")
} else {
	console.log("  [X] Test 3 failed")
}

if (nextBigger(459853) == 483559) {
	console.log("  Test 4 passed")
} else {
	console.log("  [X] Test 4 failed")
}

if (nextBigger(144) == 414) {
	console.log("  Test 5 passed\n")
} else {
	console.log("  [X] Test 5 failed\n")
}
