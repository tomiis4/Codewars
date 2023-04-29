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
				this.vars[kw[0]] = value;
				return value;
			} else {
				this.vars[kw[0]] = this.eval(value);
				return this.eval(value);
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
	// leave there result without groups
	let resultStr = expr.split('').join('');
	// store groups
	let groups = [];

	// split by groups and to result add GROUPS_ID
	const groupRegex = /\(([^()]*)\)/g;
	while (resultStr.match(groupRegex) != null) {
		let splitGroups = resultStr.match(groupRegex)

		groups.push(...splitGroups)
		resultStr = resultStr.replace(groupRegex, `GROUP_${groups.length-1}`)
	}

	// calculate groups
	groups.forEach((group, i) => {
		// if current group contain another group, add it
		// remove ()
		group = group.replace(/GROUP_(\d+)/g, (_, gIdx) => groups[gIdx])
		group = group.replace(/\(|\)/gm, '');

		// calculate result of group, split by * to calculatoe first +-%
		// TODO: add division
		let groupsResults = group.split(' * ').map(beforeMultiply => {
			let multiplyGroupResult = 0;

			// calculate +- in groups splitted by *
			beforeMultiply.split(' ').forEach((operator, operatorIdx) => {
				// get num beforeOperator & afterOperator
				const a = parseInt(beforeMultiply.split(' ')[operatorIdx-1])
				const b = parseInt(beforeMultiply.split(' ')[operatorIdx+1])

				// if is current character operator
				if (isNaN(parseInt(operator))) {
					// if is first operator, work with first number 
					// else work with prev. result
					if (operatorIdx == 1) {
						multiplyGroupResult = this.calc(a, b, operator)
					} else {
						multiplyGroupResult = this.calc(multiplyGroupResult, b, operator)
					}
				}
			});

			return multiplyGroupResult
		}).join(' * ');

		let tempMultiplied = 1;
		groupsResults.split(' * ').forEach((el) => {
			tempMultiplied *= parseInt(el);
		})

		group = tempMultiplied
		groups[i] = group
	});

	// replace groups to numbers
	resultStr = resultStr.replace(/GROUP_(\d+)/g, (_, gIdx) => groups[gIdx])

	// multiply divide
	let tempMultiply = 0;
	let remove = [];
	resultStr.split(' ').forEach((element, index) => {
		const a = resultStr.split(' ')[index-1]
		const b = resultStr.split(' ')[index+1]

		if (element == "*") {
			tempMultiply += a*b;
			remove.push(index-1, index, index+1)
		}
		else if (element == "/") {
			tempMultiply += a/b;
			remove.push(index-1, index, index+1)
		}
	});

	let multipliedArr = [tempMultiply.toString(), ...resultStr.split(' ').filter((_, index) => {
		return !remove.includes(index)
	})].join(' ');

	if (multipliedArr.split(' ').length == 1) return parseInt(multipliedArr)

	// +-%
	let result = 0
	multipliedArr.split(' ').forEach((operator, operatorIdx) => {
		const a = parseInt(multipliedArr.split(' ')[operatorIdx-1])
		const b = parseInt(multipliedArr.split(' ')[operatorIdx+1])

		// if is current character operator
		if (isNaN(parseInt(operator))) {
		// if is first operator, work with first number 
		// else work with prev. result
			if (operatorIdx == 1) {
				result = this.calc(a, b, operator)
			} else {
				result = this.calc(result, b, operator)
			}
		}
	});

	return result
}
calc(a, b, o) {
   switch (o) {
		case '+':
			return parseInt(a) + parseInt(b)
		case '-':
			return parseInt(a) - parseInt(b)
		case '*':
		return parseInt(a) * parseInt(b)
		case '/':
			return parseInt(a) / parseInt(b)
		case '%':
			return parseInt(a) % parseInt(b)
		default: throw new Error(`Invalid operator ${o}`)
   }
}
}


let comp = new Interpreter
// console.log(comp.input('x = (8 - (4 + 2)) * 3'))
console.log(comp.input('x = 1'))
// console.log(comp.input('(8 - (4 + 2)) * 3'))







function eval(expr) {
	// leave there result without groups
	let resultStr = expr.split('').join('');
	// store groups
	let groups = [];

	// split by groups and to result add GROUPS_ID
	const groupRegex = /\(([^()]*)\)/g;
	while (resultStr.match(groupRegex) != null) {
		let splitGroups = resultStr.match(groupRegex)

		groups.push(...splitGroups)
		resultStr = resultStr.replace(groupRegex, `GROUP_${groups.length-1}`)
	}

	// calculate groups
	groups.forEach((group, i) => {
		// if current group contain another group, add it
		// remove ()
		group = group.replace(/GROUP_(\d+)/g, (_, gIdx) => groups[gIdx])
		group = group.replace(/\(|\)/gm, '');

		// calculate result of group, split by * to calculatoe first +-%
		// TODO: add division
		let groupsResults = group.split(' * ').map(beforeMultiply => {
			let multiplyGroupResult = 0;

			// calculate +- in groups splitted by *
			beforeMultiply.split(' ').forEach((operator, operatorIdx) => {
				// get num beforeOperator & afterOperator
				const a = parseInt(beforeMultiply.split(' ')[operatorIdx-1])
				const b = parseInt(beforeMultiply.split(' ')[operatorIdx+1])

				// if is current character operator
				if (isNaN(parseInt(operator))) {
					// if is first operator, work with first number 
					// else work with prev. result
					if (operatorIdx == 1) {
						multiplyGroupResult = calc(a, b, operator)
					} else {
						multiplyGroupResult = calc(multiplyGroupResult, b, operator)
					}
				}
			});

			return multiplyGroupResult
		}).join(' * ');

		let tempMultiplied = 1;
		groupsResults.split(' * ').forEach((el) => {
			tempMultiplied *= parseInt(el);
		})

		group = tempMultiplied
		groups[i] = group
	});

	// replace groups to numbers
	resultStr = resultStr.replace(/GROUP_(\d+)/g, (_, gIdx) => groups[gIdx])

	// multiply divide
	let tempMultiply = 0;
	let remove = [];
	resultStr.split(' ').forEach((element, index) => {
		const a = resultStr.split(' ')[index-1]
		const b = resultStr.split(' ')[index+1]

		if (element == "*") {
			tempMultiply += a*b;
			remove.push(index-1, index, index+1)
		}
		else if (element == "/") {
			tempMultiply += a/b;
			remove.push(index-1, index, index+1)
		}
	});

	let multipliedArr = [tempMultiply.toString(), ...resultStr.split(' ').filter((_, index) => {
		return !remove.includes(index)
	})].join(' ');

	// +-%
	let result = 0
	multipliedArr.split(' ').forEach((operator, operatorIdx) => {
		const a = parseInt(multipliedArr.split(' ')[operatorIdx-1])
		const b = parseInt(multipliedArr.split(' ')[operatorIdx+1])

		// if is current character operator
		if (isNaN(parseInt(operator))) {
		// if is first operator, work with first number 
		// else work with prev. result
			if (operatorIdx == 1) {
				result = calc(a, b, operator)
			} else {
				result = calc(result, b, operator)
			}
		}
	});



	return result
}

function calc(a, b, o) {
   switch (o) {
		case '+':
			return parseInt(a) + parseInt(b)
		case '-':
			return parseInt(a) - parseInt(b)
		case '*':
		return parseInt(a) * parseInt(b)
		case '/':
			return parseInt(a) / parseInt(b)
		case '%':
			return parseInt(a) % parseInt(b)
		default: throw new Error(`Invalid operator ${o}`)
   }
}

eval('(8 - (4 + 2)) * 3 + 1')
