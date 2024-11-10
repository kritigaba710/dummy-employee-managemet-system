document.querySelector(".btn button").addEventListener("click", async () => {
    console.log("Yes");
    try {
        let response = await fetch("http://localhost:3000/generate");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        let result = await response.text();
        alert(result);
    } catch (e) {
        console.log("Error:", e);
        alert("An error occurred: " + e.message);
    }
});
