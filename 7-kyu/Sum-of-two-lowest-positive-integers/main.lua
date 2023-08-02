function sum_two_smallest_numbers(array)
    table.sort(array)
    return array[1] + array[2]
end

return sum_two_smallest_numbers
