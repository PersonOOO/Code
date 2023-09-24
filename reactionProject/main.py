import time
import random
from tkinter import *
from turtle import color


def event_handle(event):
    # Replace the window's title with event.type: input key
    # root.title("{}: {}".format(str(event.type), event.keysym))
    global checkKey
    global tooSoon
    global coloredTest
    if checkKey:
        if tooSoon:
            tooSoonScreen()
        else:
            if coloredTestOn:
                print(event.ketsym)
            else:
                global reactionSpeed
                endTime = time.time()
                reactionSpeed = endTime - start 
                reactionResult(round(reactionSpeed*1000))
            
            
        
def explainScreen():
    
    #Del all the stuff
    root.configure(bg='#4884d4')
    nextScreenButton.pack_forget()
    
    #Create new stuff
    text1.pack(pady = 166)
    text2.pack()
    continueButton.pack()
    
def boolReactions():
    if earlyOff:
        global tooSoon
        tooSoon = False
        global start
        start = time.time()
        #Destroy Stuff
        wait.pack_forget()
        #Create Stuff
        root.configure(bg = 'white')
        boolReact.pack()
    

def boolTest():
    #Del stuff
    text1.pack_forget()
    text2.pack_forget()
    continueButton.pack_forget()
    tooSoonTitle.pack_forget()
    tAgain.pack_forget()
    taButton.pack_forget()
    reactionDisplay.pack_forget()
    nextTest.pack_forget()
    
    
    #Create stuff
    root.configure(bg = 'black')
    wait.pack(pady = 166)
    
    global earlyOff
    earlyOff = True
    
    global checkKey
    checkKey = True
    
    global tooSoon
    tooSoon = True
    extraTime = random.randint(0, 7000)
    root.after(3000 + extraTime, boolReactions)

    
def tooSoonScreen():
    global earlyOff
    earlyOff = False
    #Del all the stuff
    root.configure(bg='#4884d4')
    wait.pack_forget()
    
    #Create new stuff
    tooSoonTitle.pack(pady = 166)
    tAgain.pack()
    taButton.pack()
    
def reactionResult(timed):
    boolReact.pack_forget()
    #Create Stuff
    root.configure(bg = '#4884d4')
    reactionDisplay.configure(text=str(timed) + ' ms')
    reactionDisplay.pack()
    
    global binaryTest
    if(binaryTest > 5):
        colorExplain()

    nextTest.pack()
    binaryTest = binaryTest + 1
    
    global checkKey
    checkKey = False
    
    global earlyOff
    earlyOff = False

def colorExplain():
    reactionDisplay.pack_forget()
    nextTest.pack_forget()
    
    #Create Stuff
    root.configure(bg = '#4884d4')
    colorText1.pack()
    colorText2.pack()
    colorContinueButton.pack()
    
def colorTest():
    print()
    #Should be bool test figure it out.
    
    

if __name__ == '__main__':
    root = Tk()
    root.geometry('1000x600')
    
    event_sequence = '<KeyPress>'
    root.bind(event_sequence, event_handle)
    
    #Start Screen
    nextScreenButton = Button(root, text="Next Screen", command=explainScreen)
    nextScreenButton.pack()
    
    #Explain Screen
    text1 = Label(text="Reaction Time Test", bg='#4884d4' ,fg= 'white', font=("Arial", 60))
    text2 = Label(text="When the black box turns white, press any key.", bg='#4884d4' ,fg= 'white', font=("Arial", 25))
    continueButton = Button(root, text="Click here to begin", command=boolTest)
    #boolTest Screen
    wait = Label(text="Wait for white...", bg='black' ,fg= 'white', font=("Arial", 60))
    #tooSoon Screen
    tooSoonTitle = Label(text="Too Soon!", bg='#4884d4' ,fg= 'white', font=("Arial", 60))
    tAgain = Label(text="Try again", bg='#4884d4' ,fg= 'white', font=("Arial", 25))
    taButton = Button(root, text="Retry", command=boolTest)
    # BoolReaction screen
    boolReact = Label(text="Click!", bg='white' ,fg= 'black', font=("Arial", 60))
    #reactionResult Screen
    reactionDisplay = Label(text="", bg='#4884d4' ,fg= 'white', font=("Arial", 60))
    nextTest = Button(root, text="Click here to continue", command=boolTest)
    #Color Explain Screen
    colorText1 = Label(text="Color Reaction Time Test", bg='#4884d4' ,fg= 'white', font=("Arial", 30))
    colorText2 = Label(text="When the black box turns red, press the 1 key, when it turns blue, press the 2 key, and if it turns yellow, press the 3 key.", bg='#4884d4' ,fg= 'white', font=("Arial", 25))
    colorContinueButton = Button(root, text="Click here to begin", command=colorTest)
    
    
    start = 0
    reactionSpeed = 0
    checkKey = False
    tooSoon = True
    earlyOff = True
    coloredTestOn = False
    binaryTest = 0
    root.mainloop()