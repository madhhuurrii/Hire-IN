
			 document.getElementById("file").value = "";
			const hirenow = document.getElementById("hirenow-form");
			hirenow.addEventListener('submit', hireNow);

			async function hireNow(event){
				event.preventDefault()
                const hirename = document.getElementById("hirenow-name").value;
				const hireemail = document.getElementById("hirenow-email").value;
				const hirecompany = document.getElementById("hirenow-company").value;
				const hireposition = document.getElementById("hirenow-position").value;
				const hireeli = document.getElementById("hirenow-eli").value;
				const hirestipend = document.getElementById("hirenow-stipend").value;
				const hiredate = document.getElementById("hirenow-date").value;
				const hirecontact = document.getElementById("hirenow-contact").value;
				const hirecompanyemail = document.getElementById("hirenow-companyemail").value;
				const hiredesc = document.getElementById("hirenow-desc").value;
				const hirelink = document.getElementById("hirenow-link").value;
				// const avatar = document.getElementById("img").image;

				const data1 =await fetch("/hirenow",{
					method : 'POST',
								headers: {
				'Content-Type': 'application/json'
				},
                body : JSON.stringify({
                   hirename,
				   hireemail,
				   hirecompany,
				   hireposition,
				   hirestipend,
				   hireeli,
				   hiredate,
				   hirecontact,
				   hirecompanyemail,
				   hiredesc,
				   hirelink
				 
				   
				})
				}).then((res)=>res.json())

				if(data1.status ==='ok'){
    console.log("got token", data1.data);
    alert("Job Instance Created Successfully!")
    window.open('/explore');
   
  }
  else{
    alert(data1.error);
  }
				
			}
		