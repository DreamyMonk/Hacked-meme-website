window.onload = async () => {
    const video = document.getElementById("video");
    const loading = document.getElementById("loading");
    const data = document.getElementById("data");
    let videoHasEnded = false;

    const error = (message) => {
        loading.innerText = message;
        throw message;
    };

    const pick = (array) => array[Math.floor(Math.random() * array.length)];
    const hacked_statements = ["Yes", "Maybe", "Most Likely", "Highly Probable", "Potentially", "Unlikely But Still Possible", "Almost Certainly", "Definitely", "Absolutely"];

    const openFullscreen = (elem) => {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) { /* Firefox */
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE/Edge */
            elem.msRequestFullscreen();
        }
    }

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && !videoHasEnded) {
            e.preventDefault();
        }
    });

    try {
        const memes = [];
        const push = (tit, con, add) => memes.push(`${tit}: ${con}${add || ""}`);

        let step = 0;
        let fontSize = Math.min(window.innerHeight / 10, window.innerWidth / 10);
        data.style.fontSize = `${fontSize}px`;

        let my_ip = await (await fetch("https://wtfismyip.com/json").catch()).json().catch();
        let ip_data = await (await fetch(`https://uncors.vercel.app/?url=http://ip-api.com/json/${my_ip.YourFuckingIPAddress}`).catch()).json().catch();

        const videoData = await fetch("./assets/video.mp4").catch(error);
        video.src = URL.createObjectURL(await videoData.blob());
        video.load();

        video.oncanplaythrough = async () => {
            loading.style.display = "none";
            start.style.display = "flex";
            // ... [rest of the oncanplaythrough function]
        };

        start.onclick = async () => {
            openFullscreen(document.documentElement);  // Enter fullscreen mode
            videoHasEnded = false; // Reset the video end flag
            // ... [rest of your start.onclick function]
        };

        video.onended = () => {
            videoHasEnded = true; // Set the video end flag
            video.style.display = "none";
            step = -Infinity;
            loading.innerText = "Press Escape to exit full screen.";
            loading.style.display = "block";
        };
    } catch (e) {
        error(`${e.message}`);
    }
};
