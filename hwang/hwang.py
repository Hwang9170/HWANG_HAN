numbers = []

for i in range(3):
    num = int(input(f"{i+1}번째 정수를 입력하세요: "))
    numbers.append(num)

max_num = numbers[0]
for num in numbers:
    if num > max_num:
        max_num = num

print("가장 큰 수는:", max_num)
