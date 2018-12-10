function Edit(path, id) {
  window.location.href = path + "/edit?id=" + id;
}

function Delete(path, id) {
  var rs = confirm("Confirm to delete?");
  if (rs) {
    window.location.href = path + "/delete?id=" + id;
  }
}

function Add(path) {
  window.location.href = path + "/add";
}

function Check() {
    var data = JSON.parse('<%- JSON.stringify(data)%>');
    for (var i = 1; i < data.colName.length; i++) {
        if (!document.getElementsByName(data.colName[i].Field)[0].value) {
            alert('please input the info.');
            return false;
        }
    }
    return true;
}
