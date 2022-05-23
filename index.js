function onLoad() {
   
    var group1 = document.getElementById("selectOption");
    group1.classList.remove('hide');
    group1.classList.add('show');
}
function onLoad2() {
   var group1 = document.getElementById("selectOption");
    group1.classList.remove('show');
    group1.classList.add('hide');

}
function uploadSelectedDocument(element,t){
    var selectedText = t.options[t.selectedIndex].innerHTML;
    var uploadElement =  document.getElementById(element);
    var displaySelect = document.getElementById('subSelect');
    var onCheck = document.getElementById('onCheck1');
    if(!(t.options[t.selectedIndex].value=="NA")){
        uploadElement.style.display="flex";
        uploadElement.childNodes[0].textContent = selectedText;
        onCheck.style.display="inline";
        displaySelect.style.display= 'inline-block';
    } else{
       alert("Please submit any one of the given documents");
        uploadElement.style.display="none";
    }
}
function onFileUpload(val) {
    alert("File Uploaded Successfully" + val);
    document.getElementById("onCheck").checked = true;
    document.getElementById("uploadDoc").style.display="none";
  }
function onSubmitCheck(x){
    var onUpload = x.type.uploaded.value;
    let fileUploaded = document.getElementById("onCheck");
    if(onUpload == true){
        alert("file uploaded Successfully");
        fileUploaded.checked = true;
    }
}
