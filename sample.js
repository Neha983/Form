let myFormEl = document.getElementById("myForm");
let statusEl=document.getElementById("status");
let nameEl = document.getElementById("name");
let nameErrMsgEl = document.getElementById("nameErrMsg");
let genderMaleEl=document.getElementById("genderMale");
let genderFemaleEl=document.getElementById("genderFemale");
let emailEl = document.getElementById("email");
let emailErrMsgEl = document.getElementById("emailErrMsg");

nameEl.addEventListener("change", function (event) {
  if (event.target.value === "") {
    nameErrMsgEl.textContent = "Required*";
  } else {
    nameErrMsgEl.textContent = "";
  }
  formData.name=event.target.value;
});

emailEl.addEventListener("change", function (event) {
  if (event.target.value === "") {
    emailErrMsgEl.textContent = "Required*";
  } else {
    emailErrMsgEl.textContent = "";
  }
  formData.email=event.target.value;
});


let formData={
    name:"",
    email:"",
    status:"Active",
    gender:"Male"
};
statusEl.addEventListener("change",function(event){
    formData.status=event.target.value;
});
genderMaleEl.addEventListener("change",function(event){
    formData.gender=event.target.value;
});
genderFemaleEl.addEventListener("change",function(event){
    formData.gender=event.target.value;
});
function submitFormData(formData){
    let options={
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            Accept:"application/json",
           Authorization:"Bearer 8e42bc5fe5135493a2f501704014fb97b82f77a3de0a5167df64b7edf6c7dad8", 
        },
        body:JSON.stringify(formData)
    };
    let url="https://gorest.co.in/public-api/users";
    fetch(url,options)
    .then(function(response){
        return response.json();
    })
    .then(function(jsonData){
        if(jsonData.code===422){
            if(jsonData.data[0].message==="has already been taken"&& jsonData.data[0].field==="email"){
                emailErrMsgEl.textContent="Email Already Exists";
            }
        }
    });
}

myFormEl.addEventListener("submit", function(event){
  event.preventDefault();
  submitFormData(formData);
});
