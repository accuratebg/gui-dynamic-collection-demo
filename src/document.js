//POST
function onRadioUk(){
  if (document.getElementById("UK").checked) {
    document.getElementById('onBtn').style.display="block";
  }
}
function onLoad() {
  let val = document.getElementById("UK").value;
  console.log(val);
  let obj = { step: "CHOOSE_NATIONALITY", sequence:"1", values:[""+val+""]};
  console.log(typeof obj);
  let strObj= JSON.stringify(obj);
  console.log(strObj);
  console.log(typeof strObj);
  let form = new FormData();
  form.append(
    "documentSessionStepRequest",
    strObj
  );
  
  let settings = {
    url: "http://localhost:8090/v1/document-session/62971d4e8ff5147c524acf0e/step/save",
    method: "POST",
    timeout: 0,
    processData: false,
    mimeType: "multipart/form-data",
    contentType: false,
    data: form,
  };

  $.ajax(settings).done(function(response) {
    console.log(response);
  });
}


function onLoad2() {
  var selectOpt1 = document.getElementById("selectOption");
  selectOpt1.classList.remove("show");
  selectOpt1.classList.add("hide");
}
function uploadSelectedDocument(element, t) {
  var selectedText = t.options[t.selectedIndex].innerHTML;
  var uploadElement = document.getElementById(element);
  var displaySelect = document.getElementById("subSelect");
  var onCheck1 = document.getElementById("onCheck1");
  var onCheck = document.getElementById("onCheck");
  if (!(t.options[t.selectedIndex].value == "NA")) {
    uploadElement.style.display = "flex";
    uploadElement.childNodes[0].textContent = selectedText;
    onCheck1.style.display = "inline";
    displaySelect.style.display = "inline-block";
  } else if (t.options[t.selectedIndex].value == "NA") {
    alert("Please submit any one of the given documents");
    t.style.display = "none";
    onCheck.style.display = "none";
    uploadElement.style.display = "none";
    onCheck1.style.display = "inline";
    displaySelect.style.display = "inline-block";
  }
}
function uploadSelectedDoc(element, y) {
  var selectedText = y.options[y.selectedIndex].innerHTML;
  var uploadElement = document.getElementById(element);
  if (y.options[y.selectedIndex].value) {
    uploadElement.style.display = "flex";
    uploadElement.childNodes[0].textContent = selectedText;
  } else {
    alert("Please submit any one of the given documents");
    uploadElement.style.display = "none";
  }
}
function onFileUpload(val) {
  alert("File Uploaded Successfully" + val);
  document.getElementById("onCheck").checked = true;
  document.getElementById("uploadDoc").style.display = "none";
}
function onFileUpload1(val) {
  alert("File Uploaded Successfully" + val);
  document.getElementById("onCheck1").checked = true;
  document.getElementById("uploadDoc1").style.display = "none";
}
