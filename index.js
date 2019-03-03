var config = {
  apiKey: "AIzaSyB0QjbBWBtZdETcHogHU5hwC3WYoJfuTxQ",
  authDomain: "simple-76549.firebaseapp.com",
  databaseURL: "https://simple-76549.firebaseio.com",
  projectId: "simple-76549",
  storageBucket: "simple-76549.appspot.com",
  messagingSenderId: "598369259041"
};
firebase.initializeApp(config);

var dbRef = firebase.database();
var studentssRef = dbRef.ref('student');
var dataTable = null;
var referID = null;

$(document).ready(function(){
  // Activate tooltip
  $('[data-toggle="tooltip"]').tooltip();
  dataTable = $('#dataTable');
  studentssRef.once('value', loadData);
  $('.datepicker').datepicker();
});

function loadData(snapshot){
  dataTable.empty();
  snapshot.forEach(userSnapshot => {
    var k = userSnapshot.key;
    var val = userSnapshot.val();
    dataTable.append(htmlOf(k, val));
  });
}

function htmlOf(key, val) {
  return `<tr>
      <td>${val.id}</td>
      <td>${val.name}</td>
      <td>${val.dob}</td>
      <td>${val.comefrom}</td>
      <td>${val.className}</td>
      <td>${val.ethnic}</td>
      <td>
          <a href="#editEmployeeModal" class="edit" data-toggle="modal" onclick="showEditStudent('${key}', this)">
            <i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
          </a>
          <a href="#deleteEmployeeModal" class="delete" data-toggle="modal" onclick="deleteStudent('${key}')">
            <i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
          </a>
      </td>
    </tr>`
} 

function deleteStudent(key) {
  referID = key;
}

function addStudent() {
  student = new Object();
  student.id = $('#addId').val();
  student.name = $('#addName').val();
  student.dob = $('#addDob').val();
  student.comefrom = $('#addComeFrom').val();
  student.className = $('#addClass').val();
  student.ethnic = $('#addEthnic').val();
  console.log(student);
  studentssRef.push(student);
  studentssRef.once('value', loadData);
  $('#addStudent').find("input[type=text], textarea").val("");
  $('#addEmployeeModal').modal('hide');
}

function showEditStudent(key, btn) {
  referID = key;
  var t = $(btn).closest('tr').children();
  $('#editId').val(t[0].textContent);
  $('#editName').val(t[1].textContent);
  $('#editDob').val(t[2].textContent);
  $('#editComeFrom').val(t[3].textContent);
  $('#editClass').val(t[4].textContent);
  $('#editEthnic').val(t[5].textContent);
}

function editStudent() {
  student = new Object();
  student.id = $('#editId').val();
  student.name = $('#editName').val();
  student.dob = $('#editDob').val();
  student.comefrom = $('#editComeFrom').val();
  student.className = $('#editClass').val();
  student.ethnic = $('#editEthnic').val();
  console.log(student);
  studentssRef.update({[referID]: student});
  studentssRef.once('value', loadData);
  $('#editStudent').find("input[type=text], textarea").val("");
  $('#editEmployeeModal').modal('hide');
}

function deteleConfirm() {
  studentssRef.child(referID).remove();
  studentssRef.once('value', loadData);
  $('#deleteEmployeeModal').modal('hide');
}

function search(text) {
  var value = $(text).val().toLowerCase();
  $("#dataTable tr").filter(function() {
    name = $(this).children()[1].textContent;
    condition = name.toLowerCase().indexOf(value) > -1;
    $(this).toggle(condition);
  });
}