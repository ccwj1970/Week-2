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
find_an