from random import randint
def remove_stock(l):
    if(len(l) != 0 and randint(0,10) == 5):
        return l.pop(randint(0,len(l)-1))
def add_stock(l, stuff):
    if randint(0,10) == 5:
        l.append(pick_rand_stock(stuff))
        
def pick_rand_stock(stuff):
    return stuff[randint(0,len(stuff)-1)]




from yahoo_fin import stock_info as si

nasdaq_stocks = si.tickers_nasdaq()
nyse_stocks = si.tickers_other('nyse')
columns = nyse_stocks.columns.tolist()
nyse_symbols = nyse_stocks['NASDAQ Symbol'].tolist()

nasdaq = []
nyse = []

for i in nasdaq_stocks:
    nasdaq.append(str(i))
    
for i in nyse_symbols:
    nyse.append(str(i))

stocks = sorted(list(set(nasdaq + nyse)))
stocks.pop()


our_stocks = []
# WTF was this nightmare Python can go suck it.
for i in range(1,80,1):
    add_stock(our_stocks, stocks)

print(our_stocks)

for i in range(1,20,1):
    remove_stock(our_stocks)
    
print(our_stocks)



