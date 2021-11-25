const form = document.getElementById("reg-form");
form.addEventListener('submit', regUser);

async function regUser(event){
  event.preventDefault()
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const college = document.getElementById("college").value;
  const branch = document.getElementById("branch").value;
  const year = document.getElementById("year").value;
  const contact = document.getElementById("contact").value;

  const password = document.getElementById("password").value;
  const confirm = document.getElementById("confirm").value;

  const result =await fetch("/register", {
    method : 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body : JSON.stringify({
      name,
      email,
      college,
      branch,
      year,
      contact,
      password,
      confirm
    })

  }).then((res)=> res.json())
  
  if(result.status ==='ok'){

    alert("Registration Successful!");
   
    window.open('/');
  }else{
    alert(result.error);
  }
}

// const loginform = document.getElementById("login-form");
// loginform.addEventListener('submit', loginUser);

// async function loginUser(event){
//   event.preventDefault()
//   const password = document.getElementById("password").value;
//   const email = document.getElementById("email").value;

//   const result =await fetch("/api/login", {
//     method : 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body : JSON.stringify({
     
//       email,
//       password
      
//     })

//   }).then((res)=> res.json())
  
//   if(result.status ==='ok'){
//     console.log("got token", result.data);
//     alert("Registration Successful!");
//   }else{
//     alert(result.error);
//   }
// }