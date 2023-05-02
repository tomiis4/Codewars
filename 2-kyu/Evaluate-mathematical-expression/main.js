function calc(expr) {
    if (parseFloat(expr).toString() == expr)
        return parseFloat(expr);
    expr = inverse(expr.replace(/ /g, '')).replace(/ /g, '');
    // convert 3-5 to 3 - 5
    expr = expr.replace(/(\-\d*|\d*)(\+|\-|\*|\/)(\-\d*|\d*)/g, '$1 $2 $3');
    let groups = [];
    console.log("Calc ()", expr);
    // get groups
    const groupRegex = /\(([^()]*)\)/;
    while (expr.match(groupRegex) != null) {
        let splitGroups = expr.match(groupRegex);
        // @ts-ignore
        groups.push(splitGroups[0]);
        expr = expr.replace(groupRegex, `GROUP_${groups.length - 1}`);
    }
    console.log("Groups: ", groups);
    // calculate groups
    groups.forEach((group, gIdx) => {
        if (group.includes('GROUP_')) {
            group = group.replace(/GROUP_(\d+)/g, (_, groupCapture) => groups[groupCapture]);
        }
        console.log("before Rgx", group);
        group = group.replace(/\(|\)/gm, ''); // remove () & make from 25-5 25 - 5
        if (group.includes('*') || group.includes('/')) {
            group = group.replace(/-\s*/g, '-'); // make from 25-5 25 - 5
        }
        else {
            expr = expr.replace(/(\-\d*|\d*)(\+|\-|\*|\/)(\-\d*|\d*)/g, '$1 $2 $3');
        }
        console.log("after Rgx", group);
        group = calculate_expr(group);
        console.log("after calc", group);
        groups[gIdx] = group;
    });
    console.log("Calc groups", groups);
    // insert groups to main
    if (expr.includes('GROUP_')) {
        expr = expr.replace(/GROUP_(\d+)/g, (_, groupCapture) => groups[groupCapture]);
    }
    expr = calculate_expr(expr);
    return parseFloat(expr);
}
console.log("-- START --");
// console.log(calc('12* 123/-(-5 + 2)')) // 482
// console.log(calc('((80 - (19)))')) // 61
// console.log(calc('(1 - 2) + -(-(-(-4)))'))  // 3
// console.log(calc('-(-(-(-4)))'))  // 4
// console.log(calc('-(-(-(-4)))'))  // 4
// console.log(calc('2 / (2 + 3) * 4.33 - -6'))  // 4
console.log(calc('2 /2+3 * 4.75- -6')); // 4
console.log("--  END  --");
// -(-(-(-4))
//		(-1 * (-1 * (-1 * -4)))
// -(-5+2)
//		(-1 * (-5+2))
// -(19)
//		(-1 * (19))
function inverse(expr) {
    // between -()
    let matches = expr.match(/(\-\()(.*)(\))/);
    let n = 0;
    while (matches != null) {
        if (n == 0) {
            expr = expr.replace(/(\-\()(.*)(\))/, '(-1 * ($2))');
        }
        expr = expr.replace(/(\-\()(.*)(\))/, '-1 * ($2)');
        matches = expr.match(/(\-\()(.*)(\))/);
        n++;
    }
    ;
    const singeNumber = expr.match(/\(\-(\d*)\)/g);
    if (singeNumber != null) {
        expr = expr.replace(/(\()(\-\d*)(\))/g, '$2');
    }
    return expr;
}
function calculate_expr(expr) {
    // fix double spaces
    expr = expr.replace(/  /g, ' ').replace(/(\-)(\s+)(\-)/g, '+').trim();
    if (expr.split(' ').length == 1) {
        expr = expr.replace(/(\-|\+|\/\*)/g, ' $1 ');
    }
    console.log("calc expr", expr);
    // 	1. loop -> calculate */%
    // 	2. loop -> calculate +-
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
