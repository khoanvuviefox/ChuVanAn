var myVar = setInterval(function () { Clock() });
function Clock() {
    a = new Date();
    w = Array("Chủ Nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy");
    var a = w[a.getDay()],
        w = new Date,
        d = w.getDate();
    m = w.getMonth() + 1;
    y = w.getFullYear();
    h = w.getHours();
    mi = w.getMinutes();
    se = w.getSeconds();
    if (10 > d) { d = "0" + d }
    if (10 > m) { m = "0" + m }
    if (10 > h) { h = "0" + h }
    if (10 > mi) { mi = "0" + mi }
    if (10 > se) { se = "0" + se }
    document.getElementById("clockDiv").innerHTML = "" + a + ", ngày " + d + " tháng " + m + " năm " + y + " - " + h + ":" + mi + ":" + se + "";
}