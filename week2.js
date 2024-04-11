// Task 1

function findAndPrint(messages, currentStation) {
  // 核心概念：主線（未經過小碧潭）支線（只要Messages 或 currentStation 在小碧潭）

  // 查看是否為支線
  const isBranchLine = isBranchStation(currentStation, messages);
  // 尋找最近的人
  const nearestPerson = findNearestPerson(
    messages,
    currentStation,
    isBranchLine
  );
  if (nearestPerson) {
    console.log(nearestPerson);
  } else {
    console.log(`No one is found near ${currentStation}.`);
  }
}

function isBranchStation(currentStation, messages) {
  // 查看是否有提到「小碧潭」
  const branchStations = ["Xiaobitan"];
  const lowerCaseCurrentStation = currentStation.toLowerCase();
  for (const station of branchStations) {
    if (
      station.toLowerCase() === lowerCaseCurrentStation ||
      Object.values(messages).some((message) =>
        message.toLowerCase().includes(station.toLowerCase())
      )
    ) {
      return true; // 如果有，判定為「支線」成立
    }
  }
  return false; // 如果沒有，判定為「主線」成立
}

function findNearestPerson(messages, currentStation, isBranchLine) {
  // 主線：去掉小碧潭，進行編號
  const mainLineStations = [
    { station: "Songshan", number: 1 },
    { station: "Nanjing Sanmin", number: 2 },
    { station: "Taipei Arena", number: 3 },
    { station: "Nanjing Fuxing", number: 4 },
    { station: "Songjiang Nanjing", number: 5 },
    { station: "Zhongshan", number: 6 },
    { station: "Beimen", number: 7 },
    { station: "Ximen", number: 8 },
    { station: "Xiaonanmen", number: 9 },
    { station: "Chiang Kai-Shek Memorial Hall", number: 10 },
    { station: "Guting", number: 11 },
    { station: "Taipower Building", number: 12 },
    { station: "Gongguan", number: 13 },
    { station: "Wanlong", number: 14 },
    { station: "Jingmei", number: 15 },
    { station: "Dapinglin", number: 16 },
    { station: "Qizhang", number: 17 },
    { station: "Xindian City Hall", number: 18 },
    { station: "Xindian", number: 19 },
  ];

  // 支線：新店市政府、新店改成20、21，小碧潭=18
  const branchLineStations = [
    { station: "Songshan", number: 1 },
    { station: "Nanjing Sanmin", number: 2 },
    { station: "Taipei Arena", number: 3 },
    { station: "Nanjing Fuxing", number: 4 },
    { station: "Songjiang Nanjing", number: 5 },
    { station: "Zhongshan", number: 6 },
    { station: "Beimen", number: 7 },
    { station: "Ximen", number: 8 },
    { station: "Xiaonanmen", number: 9 },
    { station: "Chiang Kai-Shek Memorial Hall", number: 10 },
    { station: "Guting", number: 11 },
    { station: "Taipower Building", number: 12 },
    { station: "Gongguan", number: 13 },
    { station: "Wanlong", number: 14 },
    { station: "Jingmei", number: 15 },
    { station: "Dapinglin", number: 16 },
    { station: "Qizhang", number: 17 },
    { station: "Xiaobitan", number: 18 },
    { station: "Xindian City Hall", number: 20 },
    { station: "Xindian", number: 21 },
  ];

  //  選擇Branchline = 支線、主線（二選一）
  const stations = isBranchLine ? branchLineStations : mainLineStations;

  // Initialize information about the nearest person
  let nearestPerson = { name: null, distance: Infinity };

  // Number of the target station
  const targetStation = stations.find(
    (station) => station.station.toLowerCase() === currentStation.toLowerCase()
  );

  //`toLowerCase()` 是 JavaScript 字符串方法之一，它將字符串轉換為小寫形式。
  // 在這個情況下，我們使用它來確保對比時不區分大小寫，因為 `currentStation` 可能以不同的大小寫形式出現。

  if (!targetStation) {
    console.log("Invalid current station.");
    return;
  } // 找不到就印出無效車站

  // 找出最近的距離：絕對值Math.abs 用法
  // 如果訊息中包含車站名稱，程式就會計算該車站與目標車站之間的距離，並將其存儲在 distance 變數中。
  // 計算距離的方式是取兩者編號的差值的絕對值，以確保距離始終為正數。
  // 如果這個距離比先前找到的最近人更近，則更新 nearestPerson 物件，將名字設置為當前這個人的名字，距離設置為當前這個人的距離。
  for (const [name, message] of Object.entries(messages)) {
    for (const station of stations) {
      const stationName = station.station.toLowerCase();
      if (message.toLowerCase().includes(stationName)) {
        const distance = Math.abs(station.number - targetStation.number);
        if (distance < nearestPerson.distance) {
          nearestPerson = { name, distance };
        }
        break; //找到訊息中包含車站的名稱訊息，可以退出內部迴圈
      }
    }
  }

  return nearestPerson.name;
} // 再返回上面，印出來

// Test data
const messages = {
  Bob: "I'm at Ximen MRT station.",
  Mary: "I have a drink near Jingmei MRT station.",
  Copper: "I just saw a concert at Taipei Arena.",
  Leslie: "I'm at home near Xiaobitan station.",
  Vivian: "I'm at Xindian station waiting for you.",
};

findAndPrint(messages, "Wanlong"); // print Mary
findAndPrint(messages, "Songshan"); // print Copper
findAndPrint(messages, "Qizhang"); // print Leslie
findAndPrint(messages, "Ximen"); // print Bob
findAndPrint(messages, "Xindian City Hall"); // print Vivian

// Task 2
