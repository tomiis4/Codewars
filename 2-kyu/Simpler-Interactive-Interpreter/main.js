class Interpreter {
	vars;
	constructor() {
		this.vars = {};
	}
	input(expr) {
		const kw = expr.split(' ');

		if (expr.trim() == '') return '';
		if (expr.includes('=')) {
			const value = this.getValues(expr.replace(`${kw[0]} = `, ''));

			if (value.split(' ').length == 1) {
				this.vars[kw[0]] = parseFloat(value);
				return parseFloat(value);
			} else {
				this.vars[kw[0]] = this.eval(value);
				return this.eval(value);
			}
		}
		if (expr.replace(/[a-zA-Z]/g, '') == '') {
			if (this.vars[kw[0]]) {
				return this.vars[kw[0]]
			} else {
				throw new Error(`ERROR: Invalid identifier. No variable with name '${expr}' was found."`)
			}
		}
		if (!expr.includes('=')) {
			return this.eval(this.getValues(expr))
		}
	}

	getValues(expr) {
		return expr.split('').map(el => {
			if (el.match(/[a-zA-Z]/g) != null) {
				return el.replace(/([a-zA-Z])/g, (_, gIdx) => this.vars[gIdx])
			}

			return el
		}).join('')
	}

eval(expr) {
	let groups = [];

	// get groups
	const groupRegex = /\(([^()]*)\)/g;
	while (expr.match(groupRegex) != null) {
		let splitGroups = expr.match(groupRegex)

		groups.push(...splitGroups)
		expr = expr.replace(groupRegex, `GROUP_${groups.length-1}`)
	}

	// calculate groups
	groups = groups.map(group => {
		if (group.includes('GROUP_')) {
			group = group.replace(/GROUP_(\d+)/g, (_, groupCapture) => groups[groupCapture]);
		}

		group = group.replace(/\(|\)/gm, ''); // remove ()
		group = this.calculate_expr(group)

		return group;
	})


	// insert groups to main
	if (expr.includes('GROUP_')) {
		expr = expr.replace(/GROUP_(\d+)/g, (_, groupCapture) => groups[groupCapture]);
	}

	expr = this.calculate_expr(expr)

	console.log(expr, groups)
}

calculate_expr(expr) {
	let removeIdxs = [];

	// *
	if (expr.includes('*')) {
		expr = expr.split(' ').map((nums, numIdx) => {
			if (nums == "*") {
				const a = parseFloat(expr.split(' ')[numIdx - 1])
				const b = parseFloat(expr.split(' ')[numIdx + 1])

				removeIdxs.push(numIdx-1, numIdx+1)
				return a * b
			} else {
				return nums
			}
		}).join(' ');
	}

	// remove indexes
	expr = expr.split(' ').filter((_, exprIdx) => {
		return !removeIdxs.includes(exprIdx);
	}).join(' ');
	removeIdxs = [];

	// /
	if (expr.includes('/')) {
		expr = expr.split(' ').map((nums, numIdx) => {
			if (nums == "/") {
				const a = parseFloat(expr.split(' ')[numIdx - 1])
				const b = parseFloat(expr.split(' ')[numIdx + 1])

				removeIdxs.push(numIdx-1, numIdx+1)
				return a / b
			} else {
				return nums
			}
		}).join(' ');
	}

	// remove indexes
	expr = expr.split(' ').filter((_, exprIdx) => {
		return !removeIdxs.includes(exprIdx);
	}).join(' ');
	removeIdxs = [];

	// +
	if (expr.includes('+')) {
		expr = expr.split(' ').map((nums, numIdx) => {
			if (nums == "+") {
				const a = parseFloat(expr.split(' ')[numIdx - 1])
				const b = parseFloat(expr.split(' ')[numIdx + 1])

				removeIdxs.push(numIdx-1, numIdx+1)
				return a + b
			} else {
				return nums
			}
		}).join(' ');
	}
	// remove indexes
	expr = expr.split(' ').filter((_, exprIdx) => {
		return !removeIdxs.includes(exprIdx);
	}).join(' ');
	removeIdxs = [];

	// -
	if (expr.includes('-')) {
		expr = expr.split(' ').map((nums, numIdx) => {
			if (nums == "-") {
				const a = parseFloat(expr.split(' ')[numIdx - 1])
				const b = parseFloat(expr.split(' ')[numIdx + 1])

				removeIdxs.push(numIdx-1, numIdx+1)
				return a - b
			} else {
				return nums
			}
		}).join(' ');
	}
	// remove indexes
	expr = expr.split(' ').filter((_, exprIdx) => {
		return !removeIdxs.includes(exprIdx);
	}).join(' ');
	removeIdxs = [];

	// %
	if (expr.includes('%')) {
		expr = expr.split(' ').map((nums, numIdx) => {
			if (nums == "%") {
				const a = parseFloat(expr.split(' ')[numIdx - 1])
				const b = parseFloat(expr.split(' ')[numIdx + 1])

				removeIdxs.push(numIdx-1, numIdx+1)
				return a % b
			} else {
				return nums
			}
		}).join(' ');
	}
	// remove indexes
	expr = expr.split(' ').filter((_, exprIdx) => {
		return !removeIdxs.includes(exprIdx);
	}).join(' ');
	removeIdxs = [];

	return parseFloat(expr)
}
}


let comp = new Interpreter
// console.log(comp.input('x = (8 - (4 + 2)) * 3'))
// console.log(comp.input('x = 4'))
// console.log(comp.input('x'))
// console.log(comp.input('x + 3'))
// console.log(comp.input('2 * 3'))
// console.log(comp.input('(8 - (4 + 2)) * 3'))







function eval(expr) {
	let groups = [];

	// get groups
	const groupRegex = /\(([^()]*)\)/g;
	while (expr.match(groupRegex) != null) {
		let splitGroups = expr.match(groupRegex)

		groups.push(...splitGroups)
		expr = expr.replace(groupRegex, `GROUP_${groups.length-1}`)
	}

	// calculate groups
	groups = groups.map(group => {
		if (group.includes('GROUP_')) {
			group = group.replace(/GROUP_(\d+)/g, (_, groupCapture) => groups[groupCapture]);
		}

		group = group.replace(/\(|\)/gm, ''); // remove ()
		group = calculate_expr(group)

		return group;
	})


	// insert groups to main
	if (expr.includes('GROUP_')) {
		expr = expr.replace(/GROUP_(\d+)/g, (_, groupCapture) => groups[groupCapture]);
	}

	expr = calculate_expr(expr)

	console.log(expr, groups)
}

function calculate_expr(expr) {
	let removeIdxs = [];

	// *
	if (expr.includes('*')) {
		expr = expr.split(' ').map((nums, numIdx) => {
			if (nums == "*") {
				const a = parseFloat(expr.split(' ')[numIdx - 1])
				const b = parseFloat(expr.split(' ')[numIdx + 1])

				removeIdxs.push(numIdx-1, numIdx+1)
				return a * b
			} else {
				return nums
			}
		}).join(' ');
	}

	// remove indexes
	expr = expr.split(' ').filter((_, exprIdx) => {
		return !removeIdxs.includes(exprIdx);
	}).join(' ');
	removeIdxs = [];

	// /
	if (expr.includes('/')) {
		expr = expr.split(' ').map((nums, numIdx) => {
			if (nums == "/") {
				const a = parseFloat(expr.split(' ')[numIdx - 1])
				const b = parseFloat(expr.split(' ')[numIdx + 1])

				removeIdxs.push(numIdx-1, numIdx+1)
				return a / b
			} else {
				return nums
			}
		}).join(' ');
	}

	// remove indexes
	expr = expr.split(' ').filter((_, exprIdx) => {
		return !removeIdxs.includes(exprIdx);
	}).join(' ');
	removeIdxs = [];

	// +
	if (expr.includes('+')) {
		expr = expr.split(' ').map((nums, numIdx) => {
			if (nums == "+") {
				const a = parseFloat(expr.split(' ')[numIdx - 1])
				const b = parseFloat(expr.split(' ')[numIdx + 1])

				removeIdxs.push(numIdx-1, numIdx+1)
				return a + b
			} else {
				return nums
			}
		}).join(' ');
	}
	// remove indexes
	expr = expr.split(' ').filter((_, exprIdx) => {
		return !removeIdxs.includes(exprIdx);
	}).join(' ');
	removeIdxs = [];

	// -
	if (expr.includes('-')) {
		expr = expr.split(' ').map((nums, numIdx) => {
			if (nums == "-") {
				const a = parseFloat(expr.split(' ')[numIdx - 1])
				const b = parseFloat(expr.split(' ')[numIdx + 1])

				removeIdxs.push(numIdx-1, numIdx+1)
				return a - b
			} else {
				return nums
			}
		}).join(' ');
	}
	// remove indexes
	expr = expr.split(' ').filter((_, exprIdx) => {
		return !removeIdxs.includes(exprIdx);
	}).join(' ');
	removeIdxs = [];

	// %
	if (expr.includes('%')) {
		expr = expr.split(' ').map((nums, numIdx) => {
			if (nums == "%") {
				const a = parseFloat(expr.split(' ')[numIdx - 1])
				const b = parseFloat(expr.split(' ')[numIdx + 1])

				removeIdxs.push(numIdx-1, numIdx+1)
				return a % b
			} else {
				return nums
			}
		}).join(' ');
	}
	// remove indexes
	expr = expr.split(' ').filter((_, exprIdx) => {
		return !removeIdxs.includes(exprIdx);
	}).join(' ');
	removeIdxs = [];

	return parseFloat(expr)
}

// FIXME
//	2+2 => 4 (2)
//	4-6 => -2 (4)
//
// 1) 4 / 2 * 3 => 6 (0.666)
// 2) (7 + 3) / (2 * 2 + 1) => 2 (1)
// 3) (10 / (8 - (4 + 2))) * 3 => 15 (NaN)


// calculate_expr('5 * 2 / 3') // 3.33
// calculate_expr('6 / 3 * 2 - 10') // -6 
// eval('(8 - (4 + 2)) * 3 + 1') // 7
// eval('5') // 5
// eval('2 * 3') // 6
// eval('6 / 3') // 2
// eval('6 + 3') // 9
// eval('2 / 0') // ERROR
