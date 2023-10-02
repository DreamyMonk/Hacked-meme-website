window.onload = async () => {
    const video = document.getElementById("video");
    const start = document.getElementById("start");  // Assuming this element exists
    const loading = document.getElementById("loading");
    const data = document.getElementById("data");

    const error = (message) => {
        loading.innerText = message;
        throw message;
    };

    const pick = (array) => array[Math.floor(Math.random() * array.length)];
    const hacked_statements = ["Yes", "Maybe", "Most Likely", "Highly Probable", "Potentially", "Unlikely But Still Possible", "Almost Certainly", "Definitely", "Absolutely"];

    // Handle full screen changes
    const handleFullScreenChange = (e) => {
        if (
            document.fullscreenElement || 
            document.webkitFullscreenElement || 
            document.msFullscreenElement
        ) {
            // Still in full screen, do nothing
        } else {
            // Attempt to go back to full screen
            video.requestFullscreen();
        }
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullScreenChange); // Safari
    document.addEventListener('msfullscreenchange', handleFullScreenChange); // IE/Edge

    try {
        const memes = [];
        const push = (tit, con, add) => memes.push(`${tit}: ${con}${add || ""}`);
        let step = 0;
        let fontSize = Math.min(window.innerHeight / 10, window.innerWidth / 10);
        data.style.fontSize = `${fontSize}px`;
        // ... (rest of your initialization code)

        start.onclick = async () => {
            if (video.requestFullscreen) {
                video.requestFullscreen();
            } else if (video.webkitRequestFullscreen) { // Safari
                video.webkitRequestFullscreen();
            } else if (video.msRequestFullscreen) { // IE/Edge
                video.msRequestFullscreen();
            }

            // ... (rest of your start.onclick function)
        };

        video.onended = () => {
            // Remove the event listeners, allowing the user to exit fullscreen
            document.removeEventListener('fullscreenchange', handleFullScreenChange);
            document.removeEventListener('webkitfullscreenchange', handleFullScreenChange);
            document.removeEventListener('msfullscreenchange', handleFullScreenChange);

            // Exit fullscreen
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) { // Safari
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) { // IE/Edge
                document.msExitFullscreen();
            }

            video.style.display = "none";
            step = -Infinity;
        };

    } catch (e) {
        error(`${e.message}`);
    }
};
