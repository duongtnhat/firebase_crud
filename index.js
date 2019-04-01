let referId = null;
let dataTable = null;

$(document).ready(function(){
  dataTable = $('#dataTable');
  $('.datepicker').datepicker();
  loadData();
});

function loadData(){
  dataTable.empty();
  $.ajax({
    url: "http://127.0.0.1:5000/",
    type: 'GET',
    success: function(data) { dataTable.append(data); }
  });
}

function saveData() {
  $.ajax({
    url: "http://127.0.0.1:5000/",
    type: 'POST',
    'processData': false,
    contentType: "text/plain",
    data: dataTable.html(),
    success: function() { loadData() }
  });
}

function deleteStudent(std) {
  referId = std;
}

function deteleConfirm() {
  $(referId).closest("tr").remove();
  saveData();
  $('#deleteEmployeeModal').modal('hide');
}

function addStudent() {
  let id = $('#addId').val();
  let name = $('#addName').val();
  let dob = $('#addDob').val();
  let comeFrom = $('#addComeFrom').val();
  let className = $('#addClass').val();
  let ethnic = $('#addEthnic').val();
  dataTable.append(`
     <tr>
      <td>${id}</td>
      <td>${name}</td>
      <td>${dob}</td>
      <td>${comeFrom}</td>
      <td>${className}</td>
      <td>${ethnic}</td>
      <td>
        <a href="#editEmployeeModal" class="edit" data-toggle="modal" onclick="showEditStudent(this)">
          <i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
        </a>
        <a href="#deleteEmployeeModal" class="delete" data-toggle="modal" onclick="deleteStudent(this)">
          <i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
        </a>
      </td>
    </tr>
  `);
  saveData();
  $('#addStudent').find("input[type=text], textarea").val("");
  $('#addEmployeeModal').modal('hide');
}

function showEditStudent(btn) {
  referId = $(btn).closest('tr');
  let t = referId.children();
  $('#editId').val(t[0].textContent);
  $('#editName').val(t[1].textContent);
  $('#editDob').val(t[2].textContent);
  $('#editComeFrom').val(t[3].textContent);
  $('#editClass').val(t[4].textContent);
  $('#editEthnic').val(t[5].textContent);
}

function editStudent() {
  let id = $('#editId').val();
  let name = $('#editName').val();
  let dob = $('#editDob').val();
  let comeFrom = $('#editComeFrom').val();
  let className = $('#editClass').val();
  let ethnic = $('#editEthnic').val();
  referId.html(`
    <td>${id}</td>
    <td>${name}</td>
    <td>${dob}</td>
    <td>${comeFrom}</td>
    <td>${className}</td>
    <td>${ethnic}</td>
    <td>
      <a href="#editEmployeeModal" class="edit" data-toggle="modal" onclick="showEditStudent(this)">
        <i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
      </a>
      <a href="#deleteEmployeeModal" class="delete" data-toggle="modal" onclick="deleteStudent(this)">
        <i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
      </a>
    </td>
  `);
  saveData();
  $('#editStudent').find("input[type=text], textarea").val("");
  $('#editEmployeeModal').modal('hide');
}

function search(text) {
  let value = $(text).val().toLowerCase();
  $("#dataTable tr").filter(function() {
    let name = $(this).children()[1].textContent;
    let condition = name.toLowerCase().indexOf(value) > -1;
    $(this).toggle(condition);
  });
}
