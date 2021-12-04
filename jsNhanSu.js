var selectedRow = null

// Các chức năng của biểu mẫu
function onFormSubmit() {
    // kiểm tra tính hợp lệ
    if (validate()) {
        // lưu trữ dữ liệu người dùng
        var formData = readFormData();
        // kiểm tra hàng đang trống
        if (selectedRow == null) {
            // Chèn hồ sơ người dùng mới
            insertNewRecord(formData);
        } else {
            // Cập nhật hồ sơ người dùng mới
            updateRecord(formData);
        }
        // Đặt lại giá trị đầu vào
        resetForm();
    }
}
// Nhập giá trị từ biểu mẫu
function readFormData() {
    var formData = {};
    // Nhận giá trị từ đầu vào
    formData["userName"] = document.getElementById("userName").value;
    formData["DoB"] = document.getElementById("DoB").value;
    formData["homeTown"] = document.getElementById("homeTown").value;
    formData["position"] = document.getElementById("position").value;
    formData["level"] = document.getElementById("level").value;
    // trả về dữ liệu biểu mẫu
    return formData;
}
// Chèn hồ sơ người dùng mới
function insertNewRecord(data) {
    var table = document.getElementById("stdlist").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.userName;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.DoB;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.homeTown;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.position;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = data.level;
    cell5 = newRow.insertCell(5);
    cell5.innerHTML = `<a onClick="onEdit(this)">Chỉnh sửa</a>
    <a onClick="onDelete(this)">Xóa bỏ</a>`;
}
// Đặt lại chức năng
function resetForm() {
    document.getElementById("userName").value = "";
    document.getElementById("DoB").value = "";
    document.getElementById("homeTown").value = "";
    document.getElementById("position").value = "";
    document.getElementById("level").value = "";
    selectedRow = null;
}
// Chỉnh sửa chức năng
function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("userName").value = selectedRow.cells[0].innerHTML;
    document.getElementById("DoB").value = selectedRow.cells[1].innerHTML;
    document.getElementById("homeTown").value = selectedRow.cells[2].innerHTML;
    document.getElementById("position").value = selectedRow.cells[3].innerHTML;
    document.getElementById("level").value = selectedRow.cells[4].innerHTML;
}
// Cập nhật bản ghi
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.userName;
    selectedRow.cells[1].innerHTML = formData.DoB;
    selectedRow.cells[2].innerHTML = formData.homeTown;
    selectedRow.cells[3].innerHTML = formData.position;
    selectedRow.cells[4].innerHTML = formData.level;
}
// Xóa chức năng
function onDelete(td) {
    if (confirm('Bạn chắc chắn muốn xóa Nhân sự này?')) {
        row = td.parentElement.parentElement;
        document.getElementById("stdlist").deleteRow(row.rowIndex);
        resetForm();
    }
}
// Kiểm tra xác thực người dùng
function validate() {
    isValid = true;
    // xác thực Họ và tên
    if (document.getElementById("userName").value == "") {
        isValid = false;
        document.getElementById("userNamevalidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("userNamevalidationError").classList.contains("hide")) {
            document.getElementById("userNamevalidationError").classList.add("hide");
        }
    }
    // xác thực Ngày sinh
    if (document.getElementById("DoB").value == "") {
        isValid = false;
        document.getElementById("DoBvalidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("DoBvalidationError").classList.contains("hide")) {
            document.getElementById("DoBvalidationError").classList.add("hide");
        }
    }
    // xác thực Quê quán
    if (document.getElementById("homeTown").value == "") {
        isValid = false;
        document.getElementById("homeTownvalidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("homeTownvalidationError").classList.contains("hide")) {
            document.getElementById("homeTownvalidationError").classList.add("hide");
        }
    }
    // Xác thực CHức vụ
    if (document.getElementById("position").value == "") {
        isValid = false;
        document.getElementById("positionvalidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("positionvalidationError").classList.contains("hide")) {
            document.getElementById("positionvalidationError").classList.add("hide");
        }
    }
    // xác thực Trình độ
    if (document.getElementById("level").value == "") {
        isValid = false;
        document.getElementById("levelvalidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("levelvalidationError").classList.contains("hide")) {
            document.getElementById("levelvalidationError").classList.add("hide");
        }
    }
    return isValid;
}
