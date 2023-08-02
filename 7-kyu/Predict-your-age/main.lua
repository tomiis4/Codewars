Predicter = {};
function Predicter.predictAge(age1, age2, age3, age4, age5, age6, age7, age8)
    local list = { age1, age2, age3, age4, age5, age6, age7, age8 }
    local n = 0

    for _, v in pairs(list) do
        n = n + (v * v)
    end

    return math.floor(math.sqrt(n) / 2)
end
