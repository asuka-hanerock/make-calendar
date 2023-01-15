var file = document.getElementById("file");
var canvas = document.getElementById("canvas");
var canvasWidth = 1242;
var canvasHeight = 2688;
var uploadImgSrc;
const month_english = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const m_english = [
  "Jan.",
  "Feb.",
  "Mar.",
  "Apr.",
  "May",
  "Jun.",
  "Jul.",
  "Aug.",
  "Sep.",
  "Oct.",
  "Nov.",
  "Dec.",
];

// Canvasの準備
canvas.width = canvasWidth;
canvas.height = canvasHeight;
var ctx = canvas.getContext("2d");

function loadLocalImage(e) {
  // ファイル情報を取得
  var fileData = e.target.files[0];

  // 画像ファイル以外は処理を止める
  if (!fileData.type.match("image.*")) {
    alert("画像を選択してください");
    return;
  }
  // FileReaderオブジェクトを使ってファイル読み込み
  var reader = new FileReader();
  // ファイル読み込みに成功したときの処理
  reader.onload = function () {
    // Canvas上に表示する
    uploadImgSrc = reader.result;
    canvasDraw();
  };
  // ファイル読み込みを実行
  reader.readAsDataURL(fileData);
}

// ファイルが指定された時にloadLocalImage()を実行
file.addEventListener("change", loadLocalImage, false);

// Canvas上に画像を表示する
function canvasDraw(imgSrc) {
  // canvas内の要素をクリアする
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  addBgColor();
  // Canvas上に画像を表示
  var img = new Image();
  img.src = uploadImgSrc;
  img.width = canvasWidth - 200;
  img.height = (img.width * 9) / 16;
  img.onload = function () {
    ctx.drawImage(
      img,
      100,
      canvasHeight / 4 + 50,
      canvasWidth - 200,
      this.height * (canvasWidth / this.width)
    );

    // Canvas上にカレンダーを表示
    addCalendar();
  };
}

function doenloadImage() {
  // canvasを画像に変換
  var data = canvas.toDataURL("image/jpeg", 1);
  // DL時のファイル名
  var file_name = document.querySelector("#yearmonth").value + ".jpg";
  // 画像として出力
  if (canvas.msToBlob) {
    //IE対応
    var blob = toBlob(data);
    window.navigator.msSaveBlob(blob, file_name);
  } else {
    var outputImg = document.createElement("a");
    outputImg.href = data;
    outputImg.download = file_name;
    outputImg.click();
  }
}

// 背景色を変更
function addBgColor() {
  bg_color = document.querySelector("#bg_color").value;
  ctx.fillStyle = bg_color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Canvas上にテキストを表示する
function addCalendar() {
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  var yearmonth = document.querySelector("#yearmonth").value;
  var this_month = Number(yearmonth.split("-")[1]) - 1;
  ctx.font = "bold 72px serif";
  ctx.fillStyle = "#666666";
  // var display_month = this_month + 1 + "月";
  var display_month = month_english[this_month];
  ctx.fillText(display_month, canvasWidth / 2, canvasHeight / 2 + 250);
  var tb = document.getElementById("c_table").tBodies[0];
  ctx.font = "bold 48px Caveat";
  for (i = 0; i < 6; i++) {
    for (j = 0; j < 7; j++) {
      // tableの要素を取得
      var ele = tb.rows[i].cells[j].innerHTML;
      // 表示色の変更
      if (i > 0) {
        ctx.font = "bold 48px serif";
      }
      if ((i <= 2 && Number(ele) > 20) || (i >= 4 && Number(ele) < 8)) {
        ctx.fillStyle = "#dddddd";
      }
      //  else if (j == 0) {
      //   ctx.fillStyle = "#cc3333";
      // } else if (j == 6) {
      //   ctx.fillStyle = "#3333cc";
      // }
      else {
        ctx.fillStyle = "#666666";
      }
      // カレンダー表示位置
      var x = 150;
      var y = 400;
      ctx.fillText(ele, x + j * 150, canvasHeight / 2 + y + i * 100);
    }
  }
}

document.getElementById("prev").onclick = function () {
  prev();
  canvasDraw();
};
document.getElementById("next").onclick = function () {
  next();
  canvasDraw();
};
document.getElementById("yearmonth").addEventListener("input", function () {
  canvasDraw();
});

document.getElementById("bg_color").addEventListener("change", function () {
  canvasDraw();
});

// スマホか判定する
function isSmartPhone() {
  if (
    window.matchMedia &&
    window.matchMedia("(max-device-width: 640px)").matches
  ) {
    return true;
  } else {
    return false;
  }
}
function chgImg() {
  var png = canvas.toDataURL();
  document.getElementById("sp_save").style.display = "block";
  newImg = document.getElementById("newImg");
  newImg.style.display = "block";
  newImg.width = 360;
  newImg.height = 780;
  newImg.src = png;
}
