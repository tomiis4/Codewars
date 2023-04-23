const toInt = (n: number[]): number => {
	return parseInt(n.join(''));
}

const swap = (a:number, b:number) => {
	return [b,a]
};

const sortRest = (a: number[]): number[] => {
	return a.sort((c,b) => {
		return b-c;
	})
}

const appendRest = (arr: number[], append: number[]): number[] => {
	let revArr = arr.reverse();
	const revAppend = append;

	revAppend.forEach((elem, index) => {
		revArr[index] = elem;
	});

	return revArr.reverse();
}

function nextBigger(n: number): number {
	let restNums: number[] = [];
	let N = 0;
	let ns = n
		.toString()
		.split('')
		.map(e => parseInt(e));

	while (ns[N+1] != undefined) {
		ns.reverse();

		if (ns[N] > ns[N+1]) {
			[ns[N], ns[N+1]] = swap(ns[N], ns[N+1]);
			ns.reverse();

			restNums = ns.slice(-(N+1))

			break;
		}

		ns.reverse();
		N++;
	}

	console.log(ns, restNums)
	const result = toInt(appendRest(ns, restNums))

	if (result > n) return result;
	return -1;
}

// TODO: sort biggest number once, then "rest" from that number sort low
// console.log(nextBigger(1234567890)) // 1234567908 
