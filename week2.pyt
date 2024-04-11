#-----------------------------------Task 1 -------------------------------

def find_and_print(messages, current_station):
    # 檢查是否為支線
    is_branch_line = is_branch_station(current_station, messages)
    # 尋找最近的人
    nearest_person = find_nearest_person(messages, current_station, is_branch_line)
    if nearest_person:
        print(nearest_person)
    else:
        print(f"No one is found near {current_station}.")

def is_branch_station(current_station, messages):
    # 定義支線車站
    branch_stations = ["Xiaobitan"]
    lower_case_current_station = current_station.lower()
    # 檢查是否有提到支線車站
    for station in branch_stations:
        if station.lower() == lower_case_current_station or any(station.lower() in message.lower() for message in messages.values()):
            return True  # 如果有提到支線車站，則判定為支線
    return False  # 如果沒有提到支線車站，則判定為主線

def find_nearest_person(messages, current_station, is_branch_line):
    # 主線車站
    main_line_stations = [
        {"station": "Songshan", "number": 1},
        {"station": "Nanjing Sanmin", "number": 2},
        {"station": "Taipei Arena", "number": 3},
        {"station": "Nanjing Fuxing", "number": 4},
        {"station": "Songjiang Nanjing", "number": 5},
        {"station": "Zhongshan", "number": 6},
        {"station": "Beimen", "number": 7},
        {"station": "Ximen", "number": 8},
        {"station": "Xiaonanmen", "number": 9},
        {"station": "Chiang Kai-Shek Memorial Hall", "number": 10},
        {"station": "Guting", "number": 11},
        {"station": "Taipower Building", "number": 12},
        {"station": "Gongguan", "number": 13},
        {"station": "Wanlong", "number": 14},
        {"station": "Jingmei", "number": 15},
        {"station": "Dapinglin", "number": 16},
        {"station": "Qizhang", "number": 17},
        {"station": "Xindian City Hall", "number": 18},
        {"station": "Xindian", "number": 19},
    ]

    # 支線車站
    branch_line_stations = [
        {"station": "Songshan", "number": 1},
        {"station": "Nanjing Sanmin", "number": 2},
        {"station": "Taipei Arena", "number": 3},
        {"station": "Nanjing Fuxing", "number": 4},
        {"station": "Songjiang Nanjing", "number": 5},
        {"station": "Zhongshan", "number": 6},
        {"station": "Beimen", "number": 7},
        {"station": "Ximen", "number": 8},
        {"station": "Xiaonanmen", "number": 9},
        {"station": "Chiang Kai-Shek Memorial Hall", "number": 10},
        {"station": "Guting", "number": 11},
        {"station": "Taipower Building", "number": 12},
        {"station": "Gongguan", "number": 13},
        {"station": "Wanlong", "number": 14},
        {"station": "Jingmei", "number": 15},
        {"station": "Dapinglin", "number": 16},
        {"station": "Qizhang", "number": 17},
        {"station": "Xiaobitan", "number": 18},
        {"station": "Xindian City Hall", "number": 20},
        {"station": "Xindian", "number": 21},
    ]

    # 選擇車站列表（支線或主線）
    stations = branch_line_stations if is_branch_line else main_line_stations

    # 初始化最近人的信息
    nearest_person = {"name": None, "distance": float("inf")}

    # 目標車站的編號
    target_station = next((station for station in stations if station["station"].lower() == current_station.lower()), None)

    if not target_station:
        print("Invalid current station.")
        return

    # 查找最近的人
    for name, message in messages.items():
        for station in stations:
            station_name = station["station"].lower()
            if station_name in message.lower():
                distance = abs(station["number"] - target_station["number"])
                if distance < nearest_person["distance"]:
                    nearest_person = {"name": name, "distance": distance}
                break

    return nearest_person["name"]

# 測試數據
messages = {
    "Bob": "I'm at Ximen MRT station.",
    "Mary": "I have a drink near Jingmei MRT station.",
    "Copper": "I just saw a concert at Taipei Arena.",
    "Leslie": "I'm at home near Xiaobitan station.",
    "Vivian": "I'm at Xindian station waiting for you.",
}

find_and_print(messages, "Wanlong")  # print Mary
find_and_print(messages, "Songshan")  # print Copper
find_and_print(messages, "Qizhang")  # print Mary
find_and_print(messages, "Ximen")  # print Bob
find_and_print(messages, "Xindian City Hall")  # print Vivian


#-----------------------------------Task 2 -------------------------------



# 儲存前一位客人的預約資料
previousBooking = {}

# 預約函數
def book(consultants, hour, duration, criteria):
    # 過濾出可用的顧問（時間不重疊）
    availableConsultants = [consultant for consultant in consultants if not is_overlapping(consultant.get("booked", []), hour, duration)]
    
    # 如果沒有可用的顧問，則印出 "No Service" 並返回
    if not availableConsultants:
        print("No Service")
        return
    
    # 根據標準排序可用的顧問
    if criteria == "price":
        availableConsultants.sort(key=lambda x: x['price'])
    elif criteria == "rate":
        availableConsultants.sort(key=lambda x: x['rate'], reverse=True)
    
    # 選擇第一個顧問
    selectedConsultant = availableConsultants[0]
    
    # 更新顧問的預訂信息
    if "booked" not in selectedConsultant:
        selectedConsultant["booked"] = []
    selectedConsultant["booked"].append({"hour": hour, "duration": duration})
    
    # 更新前一位客人的預約資料
    global previousBooking
    previousBooking = {
        "doctor": selectedConsultant["name"],
        "hour": hour,
        "duration": duration,
        "criteria": criteria
    }
    
    # 輸出所選擇的顧問
    print(selectedConsultant["name"])

# 檢查時間是否重疊的函數
def is_overlapping(booked_slots, hour, duration):
    for slot in booked_slots:
        if hour >= slot["hour"] + slot["duration"] or hour + duration <= slot["hour"]:
            continue
        else:
            return True
    return False

# 醫生資料
consultants = [
    {"name": "John", "rate": 4.5, "price": 1000},
    {"name": "Bob", "rate": 3, "price": 1200},
    {"name": "Jenny", "rate": 3.8, "price": 800}
]

# 測試預約
book(consultants, 15, 1, "price")  # Jenny
book(consultants, 11, 2, "price")  # Jenny
book(consultants, 10, 2, "price")  # John
book(consultants, 20, 2, "rate")   # John
book(consultants, 11, 1, "rate")   # Bob
book(consultants, 11, 2, "rate")   # No Service
book(consultants, 14, 3, "price")  # John



#-----------------------------------Task 3-------------------------------




def func(*data):
    def find_middle_character(name):
        if len(name) >= 3 and len(name) % 2 != 0:
            # 奇數長度的名字，中間字為中間一個字元
            return name[len(name) // 2]
        elif len(name) >= 4 and len(name) % 2 == 0:
            # 偶數長度的名字，中間字為第二個字元
            return name[len(name) // 2]
        else:
            return "名字太短找不到中間字"

    middle_names = []

    # 找出所有名字的中間字
    for name in data:
        middle_names.append(find_middle_character(name))

    # 檢查是否有不同的中間字
    unique_middle_names = [name for name in middle_names if middle_names.count(name) == 1]

    if unique_middle_names:
        # 返回具有不同中間字的名字
        return data[middle_names.index(unique_middle_names[0])]
    else:
        return "沒有"

# 測試函數
func("彭大牆", "陳王明雅", "吳明")  # print 彭大牆
func("郭靜雅", "王立強", "郭林靜宜", "郭立恆", "林花花")  # print 林花花
func("郭宣雅", "林靜宜", "郭宣恆", "林靜花")  # print 沒有
func("郭宣雅", "夏曼藍波安", "郭宣恆")  # print 夏曼藍波安



#-----------------------------------Task 4 -------------------------------

def get_number(index):
    result = 0  # 初始化結果為 0
    previous = 0  # 初始化前一個數值為 0

    # 特別處理當 index 為 0 時
    if index == 0:
        return 0

    # 開始迴圈，從 index=1 開始計算
    for i in range(1, index + 1):
        if i % 3 == 0:
            # 當 i 可以被 3 整除時，將前一個數值減 1
            result = previous - 1
        else:
            # 當 i 不可以被 3 整除時，將前一個數值加 4
            result = previous + 4

        # 更新前一個數值為當前計算結果
        previous = result

    return result

# 測試
get_number(1)  # 值為 4
get_number(5)  # 值為 15
get_number(10)  # 值為 25
get_number(30)  # 值為 70
