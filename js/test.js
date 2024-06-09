// variables
var signUpName = document.getElementById("signUpName");
var signUpEmail = document.getElementById("signUpEmail");
var signUpPass = document.getElementById("signUpPass");
var worning = document.getElementById("worning");
var worning2 = document.getElementById("worning2");
var sucsses = document.getElementById("sucsses");
var signInData = [];
if (localStorage.getItem("users") == null) {
  signInData = [];
} else {
  signInData = JSON.parse(localStorage.getItem("users"));
}
var signInEmail = document.getElementById("signInEmail");
var signInPass = document.getElementById("signInPass");
var worning3 = document.getElementById("worning3");
var bntSignIn = document.getElementById("bntSignIn");

// collect users data function
function singUp() {
  var userData = {
    name: signUpName.value,
    email: signUpEmail.value,
    password: signUpPass.value,
  };

  if (checkEmptyData() == false) {
    worning.classList.remove("d-none");
    worning2.classList.add("d-none");
    sucsses.classList.add("d-none");
    singinText.classList.remove("d-none");
    return false;
  } else if (isEmailExist() == true) {
    worning2.classList.remove("d-none");
    sucsses.classList.add("d-none");
    singinText.classList.remove("d-none");
    worning.classList.add("d-none");

    return true;
  } else {
    signInData.push(userData);
    localStorage.setItem("users", JSON.stringify(signInData));
    sucsses.classList.remove("d-none");
    singinText.classList.add("d-none");
    worning.classList.add("d-none");
    worning2.classList.add("d-none");
  }

  // signInData.push(userData)
  // localStorage.setItem('users', JSON.stringify(signInData))

  // else if  (checkEmptyData() == true) {
  //     signInData.push(userData)
  //     localStorage.setItem('users', JSON.stringify(signInData))
  //     sucsses.classList.remove('d-none')
  //     worning.classList.add('d-none')
  //     singinText.classList.add('d-none')
  //     return true
  // }

  clearDate();
}

// clear function
function clearDate() {
  signUpName.value = null;
  signUpEmail.value = null;
  signUpPass.value = null;
}

// check enter all data

function checkEmptyData() {
  if (
    signUpName.value == "" ||
    signUpEmail.value == "" ||
    signUpPass.value == ""
  ) {
    return false;
  } else {
    return true;
  }
}

// for check email is exist
function isEmailExist() {
  for (var i = 0; i < signInData.length; i++) {
    if (signInData[i].email == signUpEmail.value) {
      return true;
    }
  }
}

// log in function

function signIn() {
  var email = document.getElementById("signInEmail").value;
  var password = document.getElementById("signInPass").value;

  // Check if login fields are empty
  if (isLoginEmpty()) {
    worning3.classList.remove("d-none");
    worningNoData.classList.add("d-none")
    return false;

  }

  else if ( signInData.email != email && signInData.password != password) {
      worningNoData.classList.remove("d-none")
      worning3.classList.add("d-none");
      // console.log('hello')
  }

  for (var i = 0; i < signInData.length; i++) {
    if (signInData[i].email == email && signInData[i].password == password) {
      localStorage.setItem('sessionUsername', signInData[i].name)
      bntSignIn.setAttribute("href", "./welcome.html");
      return true;
    }


  }
}

//  to check if login inputs empty 
function isLoginEmpty() {
  var email = document.getElementById("signInEmail").value;
  var password = document.getElementById("signInPass").value;
  return email === "" || password === "";
}

//say welcome when login is successful
var username = localStorage.getItem('sessionUsername')
if (username) {
  document.getElementById('username').innerHTML = "Welcome " + username
}
