import os

def main():
    os.system('cls' if os.name == 'nt' else 'clear')  

    
    print("\033[1;37m" + "=" * 37)
    print("\033[1;31m" + " " * 5 + "KENSPLOIT PAIRING CODE SPAM" + " " * 5)  
    print("\033[1;37m" + "=" * 37 + "\033[0m")  

    
    print("Choose your mode:")
    print("1. Single Target")
    print("2. Multi Target")
    print("3. Format Phone Number")

    choice = input("Enter your choice (1/2/3): ")

    if choice == '1':
        os.system('node ksingle.js')  
    elif choice == '2':
        os.system('node ksmulti.js')  
    elif choice == '3':
        os.system('python ksf.py')  
    else:
        print("Invalid choice. Please enter 1, 2, or 3.")

if __name__ == "__main__":
    main()
