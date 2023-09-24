from turtle import up, update
import gspread
# Source of errors:
# Changing Name of Spraedsheet : update sh var
# Changing Name of tab/spreadsheet : update appropiate var

sa = gspread.service_account()
sh = sa.open("2022-2023 Point Sheet")
rSheet = sh.worksheet("Record Sheet")
s1PointSheet = sh.worksheet("S1 Points")
s1AttendSheet = sh.worksheet("S1 Attendence")
infoSheet = sh.worksheet("Contact Info")
contact_table = infoSheet.get_all_values()

def update_total():
    total_sheet = s1PointSheet.get_all_values()
    activity_length = len(total_sheet.pop(0))-2
    ref_table =[]
    for i in total_sheet:
        name = i.pop(0)
        points_list = [j for j in i[0:activity_length] if j!= '']
        point_total = sum([int(j) for j in points_list])
        ref_table.append([name, point_total])
    point_sheet = ref_table
    point_table = [h[1] for h in ref_table]
    point_ref_table = []
    for j in point_table:
        point_ref_table.append([j])
    print(point_ref_table)
    col_letter = chr(activity_length +66)
    s1PointSheet.update(col_letter + '2' + ":" + col_letter + str(len(point_table) + 1), point_ref_table)
    col_letter = chr(rSheet.find("S1 Points").col + 64)
    rSheet.update(col_letter+str(3)+":" +col_letter + str(len(point_table) + 2), point_ref_table)
    return point_sheet

def startup():
    point_sheet = update_total()
    info_table = infoSheet.get_all_values()
    refrence_table = []
    for i in range(0, len(point_sheet)):
        refrence_table.append(point_sheet[i] + info_table[i][1:4])
    return refrence_table
    
refrence_table = startup()

def warning(cutoff):
    point_sheet = startup()
    print(point_sheet)
    
    request = s1PointSheet.acell('N2:N13')
    print("requesst")
    print(request)
    
    '''s1PointSheet.format(request, {
    "backgroundColor": {
      "red": 0.0,
      "green": 0.0,
      "blue": 0.0
    },
    "horizontalAlignment": "CENTER",
    "textFormat": {
      "foregroundColor": {
        "red": 1.0,
        "green": 1.0,
        "blue": 1.0
      },
      "fontSize": 12,
      "bold": True
    }
})'''
    max_point = point_sheet[0][1]
    for i in point_sheet:
        if(i[1]>max_point):
            max_point = i[1]
    print(max_point)
    count = 0
    for i in point_sheet:
        if(i[1] >= 20):
            print(str(i[0]) + "is good with: " +str(i[1]) +" points. ")
        else:
            print(str(i[0]) + "is not good with only : " +str(i[1]) +" points. ")

warning(15)    
        