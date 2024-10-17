import os
import re

def format_phone_number(number):
    
    number = number.replace(" ", "").replace("-", "")
    if number.startswith('+62'):
        return number.replace('+62', '62', 1)
    return number

def main():
    os.system('cls' if os.name == 'nt' else 'clear')  

    print("\033[1;37m" + "=" * 19)
    print("\033[1;31m" + " " * 5 + "KENSPLOIT" + " " * 5)  
    print("\033[1;37m" + "=" * 19 + "\033[0m")  

    try:
        with open('no.txt', 'r') as f:
            lines = f.readlines()
    except FileNotFoundError:
        print("no.txt file not found. Please create the file and add phone numbers.")
        return

    formatted_numbers = []
    for line in lines:
        formatted_number = format_phone_number(line.strip())
        formatted_numbers.append(formatted_number)

    with open('no.txt', 'w') as f:
        for number in formatted_numbers:
            f.write(number + '\n')

    print("Phone numbers formatted and saved to no.txt.")

if __name__ == "__main__":
    main()
