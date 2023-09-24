from http.client import SERVICE_UNAVAILABLE
from googleapiclient.discovery import build
from google.oauth2 import service_account
from pprint import pprint

import discord
from discord.ext import commands


#Google Set up
SERVICE_ACCOUNT_FILE = 'GoogleKeys.json'
SCOPES = ['https://www.googleapis.com/auth/spreadsheets']

creds = None
creds = service_account.Credentials.from_service_account_file(
    SERVICE_ACCOUNT_FILE, scopes=SCOPES
)

SAMPLE_SPREADSHEET_ID = '1xxwj4K7PWADl2H-HzJr0s45DllvGbJnxkrDZVVgE-VE'
service = build('sheets', 'v4', credentials=creds)

result = service.spreadsheets().values().get(
    spreadsheetId=SAMPLE_SPREADSHEET_ID, range="Sheet1!A1:A5").execute()
rows = result.get('values', [])
print(rows)

request = service.spreadsheets().get(spreadsheetId=SAMPLE_SPREADSHEET_ID, ranges="Sheet1!A1", includeGridData=True)
response = request.execute()

#pprint(response)

''''Color found here
sheets': [{'data': [{'columnMetadata': [{'pixelSize': 100}],
                       'rowData': [{'values': [{'effectiveFormat': {'backgroundColor': {'blue': 0.8627451,
                                                                                        'green': 0.81960785,
                                                                                        'red': 0.91764706},'''

'''
#Discord Set up

discord_client = commands.Bot(command_prefix= '^')

@discord_client.event
async def on_ready():
    print('Bot is on')
    


""" @discord_client.event
async def on_message(message):
    if message.author == discord_client.user:
            return
    if message.content.startswith('$hello'):
            await message.channel.send(f'hello {message.author}') """  

discord_client.run('ODMzMzgxNjA1MDE5ODc3NDQ2.YHxhGg.n-LciFLHdsgEML5TylDkrl2eVTk')
'''

