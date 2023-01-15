const week = ["日", "月", "火", "水", "木", "金", "土"];
const week_english = ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat."];
const today = new Date();
// 月末だとずれる可能性があるため、1日固定で取得
var showDate = new Date(today.getFullYear(), today.getMonth(), 1);

// ロード時の処理
window.onload = function () {
  // 初期表示
  const today_yyyymm = today.getFullYear() + "-" + today.getMonth() + 1;
  document.querySelector("#yearmonth").value = today_yyyymm;
  showProcess(today, calendar);

  // 年月が入力されたとき
  document.getElementById("yearmonth").onchange = function () {
    let yearmonth = document.getElementById("yearmonth").value;
    const year = yearmonth.split("-")[0];
    const month = Number(yearmonth.split("-")[1]) - 1;
    document.querySelector("#header").innerHTML = year + "年" + month + 1 + "月";

    var calendar = createProcess(year, month);
    document.querySelector("#calendar").innerHTML = calendar;
  };
};

// 前の月表示
function prev() {
  showDate.setMonth(showDate.getMonth() - 1);
  yearmonth =
    showDate.getFullYear() + "-" + ("00" + (showDate.getMonth() + 1)).slice(-2);
  document.getElementById("yearmonth").value = yearmonth;
  showProcess(showDate);
}

// 次の月表示
function next() {
  showDate.setMonth(showDate.getMonth() + 1);
  yearmonth =
    showDate.getFullYear() + "-" + ("00" + (showDate.getMonth() + 1)).slice(-2);
  document.getElementById("yearmonth").value = yearmonth;
  showProcess(showDate);
}

// カレンダー表示
function showProcess(date) {
  var year = date.getFullYear();
  var month = date.getMonth();
  document.querySelector("#header").innerHTML = year + "年" + month + 1 + "月";

  var calendar = createProcess(year, month);
  document.querySelector("#calendar").innerHTML = calendar;
}

// カレンダー作成
function createProcess(year, month) {
  // 曜日
  var calendar = "<table id='c_table'><tr class='dayOfWeek'>";
  for (var i = 0; i < week_english.length; i++) {
    calendar += "<th>" + week_english[i] + "</th>";
  }
  calendar += "</tr>";

  var count = 0;
  var startDayOfWeek = new Date(year, month, 1).getDay();
  var endDate = new Date(year, month + 1, 0).getDate();
  var lastMonthEndDate = new Date(year, month, 0).getDate();
  var row = Math.ceil((startDayOfWeek + endDate) / week_english.length);

  // 1行ずつ設定
  for (var i = 0; i < row; i++) {
    calendar += "<tr>";
    // 1colum単位で設定
    for (var j = 0; j < week_english.length; j++) {
      if (i == 0 && j < startDayOfWeek) {
        // 1行目で1日まで先月の日付を設定
        calendar +=
          "<td class='disabled'>" +
          (lastMonthEndDate - startDayOfWeek + j + 1) +
          "</td>";
      } else if (count >= endDate) {
        // 最終行で最終日以降、翌月の日付を設定
        count++;
        calendar += "<td class='disabled'>" + (count - endDate) + "</td>";
      } else {
        // 当月の日付を曜日に照らし合わせて設定
        count++;
        if (
          year == today.getFullYear() &&
          month == today.getMonth() &&
          count == today.getDate()
        ) {
          calendar += "<td class='today'>" + count + "</td>";
        } else {
          calendar += "<td>" + count + "</td>";
        }
      }
    }
    calendar += "</tr>";
  }
  return calendar;
}

// function previewImage(obj) {
//   var fileReader = new FileReader();
//   fileReader.onload = function () {
//     document.getElementById("preview").src = fileReader.result;
//   };
//   fileReader.readAsDataURL(obj.files[0]);
// }
