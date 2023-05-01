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
		// convert 3-5 to 3 - 5
		expr = expr.replace(/(\d*)(\+|\-|\*|\|)(\d*)/g, '$1 $2 $3')
		let groups = [];

		// get groups
		const groupRegex = /\(([^()]*)\)/;
		while (expr.match(groupRegex) != null) {
			let splitGroups = expr.match(groupRegex)

			groups.push(splitGroups[0])
			expr = expr.replace(groupRegex, `GROUP_${groups.length-1}`)
		}

		// calculate groups
		groups.forEach((group, gIdx) => {
			if (group.includes('GROUP_')) {
				group = group.replace(/GROUP_(\d+)/g, (_, groupCapture) => groups[groupCapture]);
			}

			group = group.replace(/\(|\)/gm, ''); // remove ()
			group = this.calculate_expr(group)

			groups[gIdx] = group;
		})


		// insert groups to main
		if (expr.includes('GROUP_')) {
			expr = expr.replace(/GROUP_(\d+)/g, (_, groupCapture) => groups[groupCapture]);
		}

		expr = this.calculate_expr(expr)

		return parseFloat(expr)
	}

	calculate_expr(expr) {
		// fix double spaces
		expr = expr.replace(/  /g, ' ');

		// 1. loop -> calculate */%
		// 2. loop -> calculate +-

		// 1. loop
		let removeIdxs = [];
		for (let elemIdx=0; elemIdx < expr.split(' ').length; elemIdx++) {
			const elem = expr.split(' ')[elemIdx];

			if ("*/%".includes(elem)) {
				const a = parseFloat(expr.split(' ')[elemIdx - 1])
				const b = parseFloat(expr.split(' ')[elemIdx + 1])

				if (elem == "*") {
					expr = this.change(expr, elemIdx+1, a*b);
				} else if (elem == "/") {
					expr = this.change(expr, elemIdx+1, a/b);
				} else if (elem == "%") {
					expr = this.change(expr, elemIdx+1, a%b);
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
					expr = this.change(expr, elemIdx+1, a+b);
				} else if (elem == "-") {
					expr = this.change(expr, elemIdx+1, a-b);
				}

				removeIdxs.push(elemIdx-1, elemIdx)
			}
		}

		// remove indexes
		expr = expr.split(' ').filter((_, exprIdx) => {
			return !removeIdxs.includes(exprIdx);
		}).join(' ');

		return parseFloat(expr)
	}

	change(s, i, v) {
		s = s.split(' ');
		s[i] = v;

		return s.join(' ');
	}
}
