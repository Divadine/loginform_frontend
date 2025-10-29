// ✅ Register Page Script

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const createBtn = document.getElementById("create_btn");

  if (createBtn) {
    createBtn.addEventListener("click", function (event) {
      event.preventDefault();
      window.location.href = "create.html";
    });
  }

  if (form) {
    form.addEventListener("submit", async function (event) {
      event.preventDefault();

      const username = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("pwd").value;
      const gender = document.querySelector('input[name="gender"]:checked')?.value;

      if (!username || !email || !password || !gender) {
        alert("⚠️ Please fill all fields!");
        return;
      }

      const genderValue = gender.toLowerCase() === "male" ? "M" : "F";
      const data = { username, email, password, gender: genderValue };

      try {
        const response = await fetch("http://127.0.0.1:8000/login/register/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
          alert("✅ Registration Successful!");
          console.log("Server Response:", result);
          form.reset();
        } else {
          alert("❌ Registration Failed: " + JSON.stringify(result));
        }
      } catch (error) {
        alert("⚠️ Error connecting to backend.");
        console.error(error);
      }
    });
  }
});
