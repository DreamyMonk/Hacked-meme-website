window.onload = async () => {
    const video = document.getElementById("video");
    const loading = document.getElementById("loading");
    const data = document.getElementById("data");
    const start = document.getElementById("start");  // Reference to the button
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
    };

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
            start.style.display = "none";
            video.style.display = "flex";
            video.play();

            const interval = setInterval(() => {
                const time = video.currentTime - 2.1 - (step * 60) / 132; // 132 bpm moment
                if (step >= memes.length) step = -Infinity;
                if (step < 0) return clearInterval(interval);
                if (time >= 0) {
                    if (step == 0) document.title = `Hacked by Your Name [${my_ip ? my_ip.YourFuckingIPAddress : "::ffff:172.70.126.134"}]`;
                    const el = document.createElement("span");
                    el.textContent = `${memes[step]}`;
                    step++;
                    data.appendChild(el);
                    const height = data.getBoundingClientRect().height;
                    if (height >= window.innerHeight) {
                        fontSize *= 0.88;
                        data.style.fontSize = `${fontSize}px`;
                    }
                }
            }, 5);
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
