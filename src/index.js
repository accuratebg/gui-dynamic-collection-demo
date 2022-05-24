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
    var onCheck1 = document.getElementById('onCheck1');
    var onCheck = document.getElementById('onCheck');
    if(!(t.options[t.selectedIndex].value=="NA")){
        uploadElement.style.display="flex";
        uploadElement.childNodes[0].textContent = selectedText;
        onCheck1.style.display="inline";
        displaySelect.style.display= 'inline-block';
    } else if(t.options[t.selectedIndex].value=="NA"){

       alert("Please submit any one of the given documents");
        t.style.display = 'none';
        onCheck.style.display = 'none';
        uploadElement.style.display="none";
        onCheck1.style.display="inline";
        displaySelect.style.display= 'inline-block';
    }
}
function uploadSelectedDoc(element,y){
    var selectedText = y.options[y.selectedIndex].innerHTML;
    var uploadElement =  document.getElementById(element);
    if(y.options[y.selectedIndex].value){
        uploadElement.style.display="flex";
        uploadElement.childNodes[0].textContent = selectedText;
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
function onFileUpload1(val) {
    alert("File Uploaded Successfully" + val);
    document.getElementById("onCheck1").checked = true;
    document.getElementById("uploadDoc1").style.display="none";
  }

