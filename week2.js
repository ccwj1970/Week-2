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
// 儲存前一位客人的預約資料
let previousBooking = {};

// 預約函數
function book(consultants, hour, duration, criteria) {
  // 遍歷所有顧問(filter 語法)
  let availableConsultants = consultants.filter((consultant) => {
    // 檢查時間是否重疊：如果顧問沒有（！）預約 OR 顧問所有預約時間都「不重疊」當前預約的時間段，返回true

    // return (：這表示這是一個返回語句的開始
    // !consultant.booked：這個表達式檢查顧問是否沒有預約。! 是一個邏輯非運算符，將 true 轉換為 false，false 轉換為 true
    // ||：這是邏輯或運算符，用於組合兩個邏輯表達式。如果其中一個表達式為 true，則結果為 true <或者>
    // consultant.booked.every(...)：every 是一個陣列方法，用於檢查陣列中的每個元素是否滿足特定條件。這個表達式檢查顧問的每個預約時間是否與當前預約時間段不重疊
    // (slot) => ...：這是箭頭函式的語法，用於定義匿名函式。在這裡，它用於定義檢查每個預約時間的條件

    return (
      !consultant.booked ||
      consultant.booked.every(
        (slot) =>
          hour >= slot.hour + slot.duration || hour + duration <= slot.hour
      )
    );
  });

  // hour >= slot.hour + slot.duration || hour + duration <= slot.hour 這個表達式由兩個部分組成，使用了邏輯或運算符 `||` 將它們結合起來。

  // hour 代表客人的預約時間，表示預約開始的小時。 slot.hour 表示已預約的醫生的就診時間，即已預約時間的起始小時。
  //`hour >= slot.hour + slot.duration`：這部分檢查當前預約的開始時間是否晚於或等於已預約時間的結束時間。如果這條件成立，表示預約時間與已預約時間段發生了重疊。
  // `||`：這是邏輯或運算符，如果左邊或右邊的表達式任意一個成立（即返回 true），整個表達式就會返回 true。
  // `hour + duration <= slot.hour`：這部分檢查當前預約的結束時間是否早於或等於已預約時間的開始時間。如果這條件成立，同樣表示預約時間與已預約時間段發生了重疊。

  // 如果沒有可用的顧問，則印出 "No Service" 並返回
  if (availableConsultants.length === 0) {
    console.log("No Service");
    return;
  }

  // 根據標準排序可用的顧問（.sort語法） a.price - b.price 的結果是負數，表示第一個元素的價格較低，b.rate - a.rate 的結果是正數，表示第一個元素的評價高，價格相同才會根據評價下去比較。
  availableConsultants.sort((a, b) => {
    if (criteria === "price") {
      return a.price - b.price;
    } else if (criteria === "rate") {
      return b.rate - a.rate;
    }
  });

  // 選擇第一個[0]顧問（按照排序後的標準）
  const selectedConsultant = availableConsultants[0];

  // 更新顧問的預訂信息 (空陣列[] ：不包含任何元素的陣列，用於儲存數據的容器) (!selectedConsultant.booked)沒有被預約、.push ：新的元素加到陣列的末尾
  if (!selectedConsultant.booked) {
    selectedConsultant.booked = [];
  }
  selectedConsultant.booked.push({ hour, duration });

  // 更新前一位客人的預約資料（原本一直出錯原因在於沒有更新資料）
  previousBooking = {
    doctor: selectedConsultant.name,
    hour: hour,
    duration: duration,
    criteria: criteria,
  };

  // 輸出所選擇的顧問
  console.log(selectedConsultant.name);
}

// 醫生資料
const consultants = [
  { name: "John", rate: 4.5, price: 1000 },
  { name: "Bob", rate: 3, price: 1200 },
  { name: "Jenny", rate: 3.8, price: 800 },
];

// 測試預約
book(consultants, 15, 1, "price"); // Jenny
book(consultants, 11, 2, "price"); // Jenny
book(consultants, 10, 2, "price"); // John
book(consultants, 20, 2, "rate"); // John
book(consultants, 11, 1, "rate"); // Bob
book(consultants, 11, 2, "rate"); // No Service
book(consultants, 14, 3, "price"); // John

//Task 3
function func(...data) {
  function findMiddleCharacter(name) {
    if (name.length >= 3 && name.length % 2 !== 0) {
      // 奇數長度的名字，中間字為中間一個字元
      return name.charAt(Math.floor(name.length / 2));
    } else if (name.length >= 4 && name.length % 2 === 0) {
      // 偶數長度的名字，中間字為第二個字元
      return name.charAt(name.length / 2);
    } else {
      return "名字太短找不到中間字";
    }
  }

  let middleNames = [];

  // 找出所有名字的中間字
  for (let name of data) {
    middleNames.push(findMiddleCharacter(name));
  }

  // 檢查是否有不同的中間字
  let uniqueMiddleName = middleNames.find(
    (name, index, arr) => arr.indexOf(name) === arr.lastIndexOf(name)
  );

  if (uniqueMiddleName !== undefined) {
    // 返回具有不同中間字的名字
    return data[middleNames.indexOf(uniqueMiddleName)];
  } else {
    return "沒有";
  }
}

// 測試函數

func("彭大牆", "陳王明雅", "吳明"); // print 彭大牆
func("郭靜雅", "王立強", "郭林靜宜", "郭立恆", "林花花"); // print 林花花
func("郭宣雅", "林靜宜", "郭宣恆", "林靜花"); // print 沒有
func("郭宣雅", "夏曼藍波安", "郭宣恆"); // print 夏曼藍波安

// Task 4

function getNumber(index) {
  var result = 0; // 初始化結果為 0
  var previous = 0; // 初始化前一個數值為 0

  // 先特別處理當 index 為 0 時，數值從0開始跑
  if (index === 0) {
    return 0;
  }

  // 開始迴圈，從 index=1 開始計算，不斷往下遞增
  for (var i = 1; i <= index; i++) {
    if (i % 3 === 0) {
      // 當 i 可以被 3 整除時，將前一個數值減 1
      result = previous - 1;
    } else {
      // 當 i 不可以被 3 整除時，將前一個數值加 4
      result = previous + 4;
    }

    // 更新前一個數值為當前計算結果：新的結果，丟進原本的裡面（順序不要寫錯）
    previous = result;
  }

  // 返回繼續執行
  return result;
}

// 測試
getNumber(1); // 值為 4
getNumber(5); // 值為 15
getNumber(10); // 值為 25
getNumber(30); // 值為 70
