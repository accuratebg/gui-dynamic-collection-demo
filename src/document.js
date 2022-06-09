//POST
function onRadioUk() {
  if (document.getElementById("UK").checked) {
    document.getElementById("onBtn").style.display = "block";
  }
}
function onRadioNonUK() {
  var selectOpt1 = document.getElementById("dropDownSection");
  selectOpt1.classList.remove("show");
  selectOpt1.classList.add("hide");
}
function onFileUpload(val) {
  document.getElementById("onCheck").checked = true;
  document.getElementById("onBtn").style.display = "block";
}
function onFileUpload1(val) {
  document.getElementById("onCheck1").checked = true;
  document.getElementById("onBtn").style.display = "block";
}

function onSubmit() {
  let val = document.getElementById("UK").value;
  let dropdownSectionStyle = document.getElementById("dropDownSection");
  let sectionStyle = window
    .getComputedStyle(dropdownSectionStyle, null)
    .getPropertyValue("display");
  let subDropdown = document.getElementById("subDropDown");
  let sectionSubStyle = window
    .getComputedStyle(subDropdown, null)
    .getPropertyValue("display");

  if (
    document.getElementById("UK").checked &&
    document.getElementById("onBtn").style.display == "block" &&
    sectionStyle == "none"
  ) {
    let sequence = "1";
    formDataValues(sequence, val);
    document.getElementById("onBtn").style.display = "none";
  } else if (
    document.getElementById("UK").checked &&
    document.getElementById("onCheck").checked == true &&
    sectionStyle == "block" &&
    sectionSubStyle == "none"
  ) {
    let sequence = "2";
    formDataValues(sequence);
    document.getElementById("onBtn").style.display = "none";
  } else if (
    document.getElementById("UK").checked &&
    sectionStyle == "block" &&
    sectionSubStyle == "block" &&
    document.getElementById("onCheck1").checked == true
  ) {
    let sequence = "3";
    formDataValues(sequence);
  } else {
    let sequence = "4";
    formDataValues(sequence);
  }
}

function getPayloadTemplate() {
  let payload = {
    url: "http://localhost:8090/v1/document-session/62a04c64ffca4d56ae3ee496/step/save",
    method: "POST",
    dataType: "json",
    timeout: 0,
    processData: false,
    mimeType: "multipart/form-data",
    contentType: false,
    data: "",
  };

  return payload;
}

let formDataValues = async (sequence, val = null) => {
  switch (sequence) {
    case "1":
      let obj = {
        step: "CHOOSE_NATIONALITY",
        sequence: "1",
        values: ["" + val + ""],
      };
      let strObj = JSON.stringify(obj);

      let form = new FormData();
      form.append("documentSessionStepRequest", strObj);
      let payloadData = getPayloadTemplate();
      payloadData.data = form;
      await $.ajax(payloadData).done(function (response) {
        response.nextStep.options.forEach((option) => {
          var selectOpt1 = document.getElementById("dropDownSection");
          selectOpt1.classList.remove("hide");
          selectOpt1.classList.add("show");
          let dropDownOpt = document.getElementById("dropdownOpt1");
          const newOption = document.createElement("option");
          newOption.value = option.value;
          newOption.text = option.displayLabel;
          dropDownOpt.appendChild(newOption);
        });
      });
      break;

    case "2":
      var onCheck1 = document.getElementById("onCheck1");
      var displaySelect = document.getElementById("dropdownOpt2");
      let obj1 = {
        step: "GROUP1_DOCUMENT_SELECTION",
        sequence: "2",
        values: ["4"],
        metadata: { documentType: "OTHR" },
      };
      let strObj1 = JSON.stringify(obj1);
      let formData = new FormData();
      formData.append("file", uploaded.files[0]);
      formData.append("documentSessionStepRequest", strObj1);
      let payloadData1 = getPayloadTemplate();
      payloadData1.data = formData;
      await $.ajax(payloadData1).done(function (response) {
        response.nextStep.options.forEach((option) => {
          const newOption = document.createElement("option");
          newOption.value = option.value;
          newOption.text = option.displayLabel;
          displaySelect.appendChild(newOption);
        });

        alert("File Uploaded Successfully");
        document.getElementById("uploadDoc").style.display = "none";
        document.getElementById("subDropDown").style.display = "block";
        onCheck1.style.display = "inline";
        displaySelect.style.display = "inline-block";
      });
      break;
    case "3":
      let obj2 = {
        step: "GROUP1_OR_GROUP2a_OR_GROUP2b_SELECTION",
        sequence: "3",
        values: ["2"],
        metadata: { documentType: "OTHR" },
      };
      let strObj2 = JSON.stringify(obj2);
      let formData1 = new FormData();
      formData1.append("file", uploaded1.files[0]);
      formData1.append("documentSessionStepRequest", strObj2);
      let payloadData2 = getPayloadTemplate();
      payloadData2.data = formData1;
      $.ajax(payloadData2).done(function (response) {
        console.log(response);
      });
      alert("File Uploaded Successfully");
      document.getElementById("uploadDoc1").style.display = "none";
      document.getElementById("onCheck1").checked = true;
      break;
    case "4":
      console.log("Invalid End Point");
      break;
  }
};

function uploadSelectedDocument(element, t) {
  var selectedText = t.options[t.selectedIndex].innerHTML;
  var uploadElement = document.getElementById(element);
  var displaySelect = document.getElementById("dropdownOpt2");
  var onCheck1 = document.getElementById("onCheck1");
  var onCheck = document.getElementById("onCheck");
  if (!(t.options[t.selectedIndex].value == "NA")) {
    uploadElement.style.display = "flex";
    uploadElement.childNodes[0].textContent = selectedText;
  } else if (t.options[t.selectedIndex].value == "NA") {
    alert("Please submit any one of the given documents");
    t.style.display = "none";
    onCheck.style.display = "none";
    uploadElement.style.display = "none";
    document.getElementById("subDropDown").style.display = "block";
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
