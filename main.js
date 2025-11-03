// ---------------- REGISTER ----------------
const registerForm = document.querySelector("form");
if (registerForm) {
  registerForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const username = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("pwd").value;
    const gender = document.querySelector('input[name="gender"]:checked')?.value;

    if (!username || !email || !password || !gender) {
      alert("Please fill all fields!");
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
        window.location.href = "login.html";
      } else {
        alert("⚠️ Registration failed: " + JSON.stringify(result));
      }
    } catch (error) {
      alert("❌ Error connecting to server.");
      console.error(error);
    }
  });
}

// ---------------- LOGIN ----------------
/*const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const data = { email, password };

    try {
      const response = await fetch("http://127.0.0.1:8000/login/token/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        alert("✅ Login Successful!");
        console.log("Access Token:", result.access);
        console.log("Refresh Token:", result.refresh);

        // Store tokens in localStorage
        localStorage.setItem("access_token", result.access);
        localStorage.setItem("refresh_token", result.refresh);

        // Redirect to a protected page
        window.location.href = "dashboard.html";
      } else {
        alert("⚠️ Login failed: " + JSON.stringify(result));
      }
    } catch (error) {
      alert("❌ Error connecting to server.");
      console.error(error);
    }
  });
}
*/
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
    if (!form) return; // Only run on login page

    const alertBox = document.getElementById("alertBox");

    function showAlert(message, type = "danger") {
        alertBox.textContent = message;
        alertBox.className = `alert alert-${type}`;
        alertBox.style.display = "block";
        setTimeout(() => (alertBox.style.display = "none"), 3000);
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!username || !password) {
            showAlert("Please enter both username and password!");
            return;
        }

        try {
            const res = await fetch("http://127.0.0.1:8000/login/token/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            });

            const data = await res.json();

            if (res.ok) {
                showAlert("✅ Login Successful!", "success");
                console.log("Access Token:", data.access);
                console.log("Refresh Token:", data.refresh);

                // Save tokens in localStorage
                localStorage.setItem("access", data.access);
                localStorage.setItem("refresh", data.refresh);

                // Redirect after login
                setTimeout(() => {
                    window.location.href = "dashboard.html";
                }, 1500);
            } else {
                showAlert("⚠️ " + (data.detail || JSON.stringify(data)));
            }
        } catch (err) {
            showAlert("❌ Error connecting to server");
            console.error(err);
        }
    });
});
