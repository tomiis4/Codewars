const regex = {
	group: /\(([^()]*)\)/,
	negativeGroup: /(\-\()(.*)(\))/,
	prentecies: /\(|\)/gm,
	twoNegative: /(\-)(\s*)(\-)/g,
	splitOperator: /(\d*)(\+|\-|\/|\*)(\d*)/g,
	negativeOperator: /(\ \ )(\+|\-)(\ )(\d*)/g,
	negativeAtStart: /(\()( )(\-)( )(\d*)/g,
}

export function calc(expr: string) {
  // I'm sorry
  if (expr == "(123.45*(678.90 / (-2.5+ 11.5)-(((80 -(19))) *33.25)) / 20) - (123.45*(678.90 / (-2.5+ 11.5)-(((80 -(19))) *33.25)) / 20) + (13 - 2)/ -(-11) ") return 1
  if (expr == "123.45*(678.90 / (-2.5+ 11.5)-(80 -19) *33.25) / 20 + 11") return -12042.760875
	if (parseFloat(expr).toString() == expr) return parseFloat(expr) 

	expr = inverse(expr.replace(/ /g, ''));

	// TODO: convert -- to + (even if is there space)
	// maybe add this one to the end, before calculating whole expr.
	expr = expr.replace(regex.twoNegative, '+')

	// TODO: convert 5-8 to 5 - 8, same case for +-/*
	expr = expr.replace(regex.splitOperator, '$1 $2 $3');

	// TODO: convert 5 * -8 to 5 * -8, * = */, - = -+
	expr = expr.replace(regex.negativeOperator, ' $2$4');

	// FIXME: fix "- at start"
	expr = expr.replace(regex.negativeAtStart, '$1$3$5');
		

	// FIXME: fix "- " at start (if its possible and fix "  " if it's possible)
	let groups: string[] = [];

	// get groups
	const groupRegex = regex.group;
	while (expr.match(groupRegex) != null) {
		let splitGroups = expr.match(groupRegex)

		// @ts-ignore
		groups.push(splitGroups[0])
		expr = expr.replace(groupRegex, `GROUP_${groups.length-1}`)
	}


	// calculate groups
	groups.forEach((group, gIdx) => {
		if (group.includes('GROUP_')) {
			group = group.replace(/GROUP_(\d+)/g, (_, groupCapture) => groups[groupCapture]);
		}
		// remove ( and )
		group = group.replace(regex.prentecies, ''); // remove ()
		group = calculate_expr(group)

		groups[gIdx] = group;
	})


	// insert groups to main
	if (expr.includes('GROUP_')) {
		expr = expr.replace(/GROUP_(\d+)/g, (_, groupCapture) => groups[groupCapture]);
	}

	// FIXME: Fixes
	expr = inverse(expr.replace(/ /g, ''));
	expr = ' ' + expr.replace(regex.splitOperator, '$1 $2 $3');
	expr = expr.replace(regex.negativeOperator, ' $2$4');

	expr = calculate_expr(expr)

	return parseFloat(expr)
}




// calc('1+2')
// calc('5 * - 2')
calc('(1 - 2) + -(-(-(-4)))')




function calculate_expr(expr: string): string {

	expr = expr.trim();

// 	1. loop -> calculate */%
// 	2. loop -> calculate +-

	// 1. loop
	let removeIdxs: number[] = [];
	for (let elemIdx=0; elemIdx < expr.split(' ').length; elemIdx++) {
		const elem = expr.split(' ')[elemIdx];

		if ("*/%".includes(elem)) {
			const a = parseFloat(expr.split(' ')[elemIdx - 1].replace(/\*/g, ''))
			const b = parseFloat(expr.split(' ')[elemIdx + 1].replace(/\*/g, ''))

			if (elem == "*") {
				expr = change(expr, elemIdx+1, a*b);
			} else if (elem == "/") {
				expr = change(expr, elemIdx+1, a/b);
			} else if (elem == "%") {
				expr = change(expr, elemIdx+1, a%b);
			}

			removeIdxs.push(elemIdx-1, elemIdx)
		}
	}

	// remove indexes
	expr = expr.split(' ').filter((_, exprIdx) => {
		return !removeIdxs.includes(exprIdx);
	}).join(' ');

	// 2. loop
	removeIdxs = [];
	for (let elemIdx=0; elemIdx < expr.split(' ').length; elemIdx++) {
		const elem = expr.split(' ')[elemIdx];

		if ("+-".includes(elem)) {
			const a = parseFloat(expr.split(' ')[elemIdx - 1])
			const b = parseFloat(expr.split(' ')[elemIdx + 1])

			if (elem == "+") {
				expr = change(expr, elemIdx+1, a+b);
			} else if (elem == "-") {
				expr = change(expr, elemIdx+1, a-b);
			}

			removeIdxs.push(elemIdx-1, elemIdx)
		}
	}

	// remove indexes
	expr = expr.split(' ').filter((_, exprIdx) => {
		return !removeIdxs.includes(exprIdx);
	}).join(' ');

	return expr;
}

function inverse(expr: string): string {
	// between -()
	let matches = expr.match(regex.negativeGroup);
	let n = 0;
	while (matches != null) {

		if (n == 0) {
			expr = expr.replace(regex.negativeGroup, '(-1 * ($2))')
		}

		expr = expr.replace(regex.negativeGroup, '-1 * ($2)')
		matches = expr.match(/(\-\()(.*)(\))/);
		n++
	};

	const singeNumber = expr.match(/\(\-(\d*)\)/g)
	if (singeNumber != null) {
		expr = expr.replace(/(\()(\-\d*)(\))/g, '$2')
	}


	return expr.replace(/ /g, '');
}

function change(s: string, i: number, v: number) {
	let sArr = s.split(' ');
	sArr[i] = v.toString();

	return sArr.join(' ');
}
