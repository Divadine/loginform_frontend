// ✅ Create Profile Page Script

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  if (form) {
    form.addEventListener("submit", async function (event) {
      event.preventDefault();

      const firstname = document.getElementById("Firstname").value;
      const lastname = document.getElementById("Lastname").value;
      const email = document.getElementById("email").value;
      const phonenumber = document.getElementById("phonenumber").value;
      const dob = document.getElementById("date").value;

      if (!firstname || !lastname || !email || !phonenumber || !dob) {
        alert("⚠️ Please fill all fields!");
        return;
      }

      const data = {
        firstname,
        lastname,
        email,
        phonenumber,
        dob
      };

      try {
        const response = await fetch("http://127.0.0.1:8000/login/profile/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
          alert("✅ Profile Created Successfully!");
          console.log("Server Response:", result);
          form.reset();
        } else {
          alert("❌ Profile Creation Failed: " + JSON.stringify(result));
        }
      } catch (error) {
        alert("⚠️ Error connecting to backend.");
        console.error(error);
      }
    });
  }
});
