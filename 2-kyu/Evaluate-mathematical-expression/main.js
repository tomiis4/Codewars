function calc(expr) {
    console.log(expr);
    if (parseFloat(expr).toString() == expr)
        return parseFloat(expr);
    expr = removeBrackets(expr);
    expr = expr.replace(/ /g, '');
    expr = expr.replace('\-\-', '+');
    expr = expr.replace('\-\+|\+\-', '-');
    expr = inverse(expr);
    expr = expr.replace('\-\-', '');
    expr = expr.replace('\-\+|\+\-', '-');
    // convert 3-5 to 3 - 5
    expr = expr.replace(/(\-\d*|\d*)(\+|\-|\*|\/)(\-\d*|\d*)/g, '$1 $2 $3');
    let groups = [];
    // get groups
    const groupRegex = /\(([^()]*)\)/;
    while (expr.match(groupRegex) != null) {
        let splitGroups = expr.match(groupRegex);
        // @ts-ignore
        groups.push(splitGroups[0]);
        expr = expr.replace(groupRegex, `GROUP_${groups.length - 1}`);
    }
    // calculate groups
    groups.forEach((group, gIdx) => {
        if (group.includes('GROUP_')) {
            group = group.replace(/GROUP_(\d+)/g, (_, groupCapture) => groups[groupCapture]);
        }
        group = group.replace(/\(|\)/gm, ''); // remove ()
        group = calculate_expr(group);
        groups[gIdx] = group;
    });
    // insert groups to main
    if (expr.includes('GROUP_')) {
        expr = expr.replace(/GROUP_(\d+)/g, (_, groupCapture) => groups[groupCapture]);
    }
    expr = calculate_expr(expr);
    return parseFloat(expr);
}
console.log(calc('12* 123/-(-5 + 2)')); // 982
console.log(calc('((80 - (19)))')); // 61
console.log(calc('(1 - 2) + -(-(-(-4)))')); // 3
function removeBrackets(expr) {
    while (expr.startsWith('(') && expr.endsWith(')')) {
        let temp = expr.split('');
        temp.pop();
        temp.shift();
        expr = temp.join('');
    }
    return expr;
}
function inverse(expr) {
    const matches = expr.match(/(?<=\-\()(.*?)(?=\))/g);
    if (matches == null)
        return expr;
    const inversed = matches.map((match) => {
        let x = match.split('').map((elem, idx) => {
            if (idx == 0) {
                if (elem == '-')
                    return '';
                if (elem == '+')
                    return '-';
                return '-' + elem;
            }
            else {
                if (elem == '-')
                    return '+';
                if (elem == '+')
                    return '-';
                return elem;
            }
        }).join('');
        return x;
    });
    // 	inversed.forEach((m) => {
    matches.forEach((m) => {
        expr = expr.replace(/(\-\()(.*?)(\))/, '-' + m.replace(/(\-\d*|\d*)(\+|\-|\*|\/)(\-\d*|\d*)/g, '$1 $2 $3'));
    });
    console.log(expr.replace(/\-\(/g, '-1 * ('));
    return expr;
}
function calculate_expr(expr) {
    // fix double spaces
    expr = expr.replace(/  /g, ' ');
    // 1. loop -> calculate */%
    // 2. loop -> calculate +-
    // 1. loop
    let removeIdxs = [];
    for (let elemIdx = 0; elemIdx < expr.split(' ').length; elemIdx++) {
        const elem = expr.split(' ')[elemIdx];
        if ("*/%".includes(elem)) {
            const a = parseFloat(expr.split(' ')[elemIdx - 1].replace(/\*/g, ''));
            const b = parseFloat(expr.split(' ')[elemIdx + 1].replace(/\*/g, ''));
            if (elem == "*") {
                expr = change(expr, elemIdx + 1, a * b);
            }
            else if (elem == "/") {
                expr = change(expr, elemIdx + 1, a / b);
            }
            else if (elem == "%") {
                expr = change(expr, elemIdx + 1, a % b);
            }
            removeIdxs.push(elemIdx - 1, elemIdx);
        }
    }
    // remove indexes
    expr = expr.split(' ').filter((_, exprIdx) => {
        return !removeIdxs.includes(exprIdx);
    }).join(' ');
    // 2. loop
    removeIdxs = [];
    for (let elemIdx = 0; elemIdx < expr.split(' ').length; elemIdx++) {
        const elem = expr.split(' ')[elemIdx];
        if ("+-".includes(elem)) {
            const a = parseFloat(expr.split(' ')[elemIdx - 1]);
            const b = parseFloat(expr.split(' ')[elemIdx + 1]);
            if (elem == "+") {
                expr = change(expr, elemIdx + 1, a + b);
            }
            else if (elem == "-") {
                expr = change(expr, elemIdx + 1, a - b);
            }
            removeIdxs.push(elemIdx - 1, elemIdx);
        }
    }
    // remove indexes
    expr = expr.split(' ').filter((_, exprIdx) => {
        return !removeIdxs.includes(exprIdx);
    }).join(' ');
    return expr;
}
function change(s, i, v) {
    let sArr = s.split(' ');
    sArr[i] = v.toString();
    return sArr.join(' ');
}
