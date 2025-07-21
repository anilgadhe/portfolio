var loader = document.getElementById("loader");
setTimeout(function () {
    loader.style.top = "-100%"
}, 4000);


const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("animate__animated", "animate__fadeInUp");
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2
});

document.querySelectorAll('.card').forEach(card => {
    observer.observe(card);
});


document.getElementById("formdata").addEventListener("submit", (e) => {
    e.preventDefault();

    const newUser = {
        userName: document.getElementById("userName").value,
        email: document.getElementById("mail").value,
        message: document.getElementById("message").value,
    }

    fetch("https://portfolio-0a84.onrender.com/register", {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
    }).then(response => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    })
    .then(result => {
      alert("Message sent successfully!");
      console.log(result);
      
      document.getElementById("formdata").reset();
    })
    .catch(error => {
      console.error("Error submitting the form:", error);
      alert("Something went wrong.");
    });
})


let darkmode = localStorage.getItem('darkmode')

const themeSwitch = document.getElementById('theme-switch')

const enableDarkmode =()=>{
    document.body.classList.add('darkmode')
    localStorage.setItem('darkmode','active')
}

const disableDarkmode=()=>{
    document.body.classList.remove('darkmode')
    localStorage.removeItem('darkmode');
}

if(darkmode === "active") enableDarkmode()

themeSwitch.addEventListener("click",()=>{
    darkmode=localStorage.getItem("darkmode")
    darkmode !== "active" ? enableDarkmode() : disableDarkmode()
})