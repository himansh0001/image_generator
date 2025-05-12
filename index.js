// index.js


let generateImageForm = 
    document.getElementById('generate-image-form');
let formInput = 
    document.getElementById('input-value');
let imageContainerText = 
    document.getElementById('imageContainerText');
let imageGenerated = 
    document.getElementById('generated-image');
let imageContainer = 
    document.getElementById('images-visible');

generateImageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let enteredText = formInput.value;
    if (enteredText !== "") {
        fetchImages(enteredText);
    } else {
        imageContainerText.innerText = 
            "Input field can not be empty!";
    }
});

function fetchImages(prompt) {
    // Construct the API URL
    let apiUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`;
    
    // Show a loading message
    imageContainerText.innerText = "Generating image...";
    imageGenerated.src = ""; // Clear any previous image
    
    // Fetch the image from the API
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch image");
            }
            return response.blob(); // Get the response as a Blob
        })
        .then(blob => {
            // Create a URL for the fetched image
            let imageUrl = URL.createObjectURL(blob);
            imageGenerated.src = imageUrl; // Set the image source
            imageContainer.style.display = "block"; // Make the container visible
            imageContainerText.innerText = "Here is your generated image:";
        })
        .catch(error => {
            console.error("Error:", error);
            imageContainerText.innerText = 
                "Error generating image. Please try again!";
        });
}
