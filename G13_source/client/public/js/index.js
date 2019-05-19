function onload() {
  setTimeout(overflow, 4800);
  onresize();
}

function onresize() {
  var width = document.documentElement.clientWidth;
  var height = document.documentElement.clientHeight;
  if (width > 767.98) {
    document.getElementById("progress").style.marginTop = (height - height / 4 - 58.9) / 2 + "px";
    document.getElementById("progress").style.height = (height - height / 4 - 58.9) / 2 + "px";
    document.getElementById("main").style.height = height - 58.9 + "px";
  } else {
    document.getElementById("progress").style.marginTop = (height - height / 4 - 49.4) / 2 + "px";
    document.getElementById("progress").style.height = (height - height / 4 - 49.4) / 2 + "px";
    document.getElementById("main").style.height = height - 49.4 + "px";
  }
}

function overflow() {
  var classVal = document.getElementById("body").getAttribute("class");
  classVal = classVal.replace("overflow", "");
  document.getElementById("body").setAttribute("class", classVal);
}
