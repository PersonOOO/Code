from tkinter import *

root = Tk()
root.geometry('1000x600')

def update():
    root.configure(bg = 'green')
    myLabel.pack_forget()
def test():
    root.configure(bg = 'red')
    myLabel.config(text="New Text")
    root.after(5000,update )
myLabel = Label(root, text="Old Text")
myLabel.pack(pady = 20)
taButton = Button(root, text="Click here to begin", command=test)
taButton.pack()


root.mainloop()