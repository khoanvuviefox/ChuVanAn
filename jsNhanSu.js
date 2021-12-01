class NhanSu {
    constructor(id, fullname, avatar, dob, email, hometown, depart) {
        this.id = id;
        this.fullname = fullname;
        this.avatar = avatar;
        this.dob = dob;
        this.email = email;
        this.hometown = hometown;
        this.department = depart;
    }
}

let cacnhansu = [];

function init() {
    if (getLocalStorage(nhansu_data) == null) {
        cacnhansu = [
            new NhanSu(1, "Hoàng Khắc Thưởng", "", "01-01-2000", "hoangkhacthuong@cnald.com", "Thanh Hóa", "Hiệu trưởng, Bí thư Chi bộ"),
            new NhanSu(2, "Nguyễn Ngọc Bảo", "", "02-01-2002", "nguyenngocbao@cvald.com", "Lâm Đồng", "Phó Hiệu trưởng"),
        ];
        setLocalStorage(nhansu_data, cacnhansu);
    } else {
        cacnhansu = getLocalStorage(nhansu_data);
    }
}

function setLocalStorage(keyword, data) {
    window.localStorage.setItem(keyword, JSON.stringify(data));
}

function getLocalStorage(keyword) {
    return JSON.parse(window.localStorage.getItem(keyword));
}

function removeLocalStorage(keyword) {
    window.localStorage.removeItem(keyword);
}

function showNhanSu() {
    let tbNhanSu = document.getElementById("tbNhanSu");
    tbNhanSu.innerHTML = '';
    cacnhansu.forEach(function(nhansu, index) {
        tbNhanSu.innerHTML += `
             <tr id='tr_${nhansu.id}'>
                 <td class = "text-center">${nhansu,id}</td>
                 <td>${nhansu.fullname}</td>
                 <td class = "text-center">
                     <img class ="img-sm" src='${nhansu.avatar}'>
                 </td>
                 <td class="text-center">${nhansu.dob}</td>
                 <td>${nhansu.email}</td>
                 <td class="text-center">${nhansu.hometown}</td>
                 <td class='text-center'>${nhansu.department}</td>
                 <td>
                     <button class="btn btn-success" onclick="edit(${nhansu.id})">Chỉnh sửa</button>
                     <button class="btn btn-primary d-none" onclick="update(${nhansu.id})">Cập nhật</button>
                     <button class="btn btn-warning d-none" onclick="cancel(${nhansu.id})">Hủy bỏ</button>
                     <button class="btn btn-danger" onclick='removeNhanSu(${nhansu.id})'>Xóa bỏ</button>
                 </td>
             </tr>
        `;
    })
}

function save() {
    let id = getNewId();
    let fullname = document.getElementById("fullname").value;
    let avatar = document.getElementById("avatar").value;
    let dob = document.getElementById("dob").value;
    let email = document.getElementById("email").value;
    let salary = Number(document.getElementById("hometown").value);
    let department = document.getElementById("department").value;
    let nhansu = newNhanSu(id, fullname, avatar, dob, email, hometown, department);
    cacnhansu.push(nhansu);
    setLocalStorage(nhansu_data, cacnhansu);
    showNhanSu();
    clear();
}

function getNewId() {
    return cacnhansu[cacnhansu.length - 1].id + 1;
}

function initDepartment() {
    let department = document.getElementById("department");
    departments.forEach(function(depart, index) {
        department.innerHTML += `<option value='${depart}' ${depart == default_depart ? 'selected' : ''}>${depart}</option>`;
    });
}

function clear() {
    document.getElementById("fullname").value = '';
    document.getElementById("avatar").value = "";
    document.getElementById("dob").value = "";
    document.getElementById("email").value = "";
    document.getElementById("hometown").value = "";
    document.getElementById("department").value = "";
}

function removeNhanSu(nhansuId) {
    let position = findIndexNhanSu(nhansuId);
    let confirmed = window.confirm("Bạn chắc chắn muốn xóa Nhân sự này?");
    if (confirmed) {
        cacnhansu.splice(position, 1);
        setLocalStorage(nhansu_data, cacnhansu);
        showNhanSu();
    }
}

function findIndexNhanSu(nhansuId) {
    return cacnhansu.findIndex(function(nhansu, index) {
        return nhansu.id == nhansuId;
    });
}

function edit(nhansuId) {
    let tr = document.getElementById(`tr_${nhansuId}`);
    tr.children[7].children[0].classList.add('d-none');
    tr.children[7].children[1].classList.remove('d-none');
    tr.children[7].children[2].classList.remove('d-none');

    let index = findIndexNhanSu(nhansuId);
    let nhansu = cacnhansu[index];
    tr.children[1].innerHTML = `<input id="fn_${nhansuId}" class='input-full' type='text' value='${nhansu.fullname}'>`;
    tr.children[2].innerHTML = `<input id="avatar_${nhansuId}" class='input-full' type='text' value='${nhansu.avatar}'>`;
    tr.children[3].innerHTML = `<input id="dob_${nhansuId}" class='input-full' type='date' value='${nhansu.dob}'>`;
    tr.children[4].innerHTML = `<input id="email_${nhansuId}" class='input-full' type='email' value='${nhansu.email}'>`;
    tr.children[5].innerHTML = `<input id="hometown_${nhansuId}" class='input-full' type='text' value='${nhansu.hometown}'>`;
    tr.children[6].innerHTML = `<input id="depart_${nhansuId}" class='input-full' type='text' value='${nhansu.department}'>`;
}

function update(nhansuId) {
    let index = findIndexNhanSu(nhansuId);
    cacnhansu[index].fullname = document.getElementById(`fn_${nhansuId}`).value;
    cacnhansu[index].avatar = document.getElementById(`avatar_${nhansuId}`).value;
    cacnhansu[index].dob = document.getElementById(`dob_${nhansuId}`).value;
    cacnhansu[index].email = document.getElementById(`email_${nhansuId}`).value;
    cacnhansu[index].hometown = document.getElementById(`hometown_${nhansuId}`).value;
    cacnhansu[index].department = document.getElementById(`depart_${nhansuId}`).value;
    setLocalStorage(nhansu_data, cacnhansu);
    showNhanSu();
}

function cancel(nhansuId) {
    let tr = document.getElementById(`tr_${nhansuId}`);
    tr.children[7].children[0].classList.remove('d-none');
    tr.children[7].children[1].classList.add('d-none');
    tr.children[7].children[2].classList.add('d-none')
    let index = findIndexNhanSu(nhansuId);
    let nhansu = cacnhansu[index];
    tr.children[1].innerHTML = nhansu.fullname;
    tr.children[2].innerHTML = `<img class='img-sm' src='${nhansu.avatar}'>`;
    tr.children[3].innerHTML = nhansu.dob;
    tr.children[4].innerHTML = nhansu.email;
    tr.children[5].innerHTML = nhansu.salary;
    tr.children[6].innerHTML = nhansu.department;
}

function ready() {
    init();
    initDepartment();
    clear();
    showNhanSu();
}

ready();