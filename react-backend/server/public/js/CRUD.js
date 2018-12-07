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
