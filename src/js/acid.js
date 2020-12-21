document.addEventListener("DOMContentLoaded", () => {
  let state = "empty";  // empty | soda | acid | final
  const popup = document.getElementById("timeline-wrapper");
  const player = document.getElementById("player");
  const previewImg = document.getElementById("previewImg");
  const controls = document.getElementsByClassName("addButton");
  let pause;
  const videoList = [
    "src/video/emptyAddSoda.mp4",
    "src/video/emptyAddAcid.mp4",
    "src/video/addSoda.mp4",
    "src/video/addAcid.mp4",
    "src/video/acidReaction.mp4"
  ];
  const map = {
    empty: {
      soda: videoList[0],
      acid: videoList[1],
    },
    acid: {
      soda: videoList[2],
    },
    soda: {
      acid: videoList[3],
    },
    final: videoList[4]
  };
  const imageMap = {
    soda: "src/img/soda.png",
    acid: "src/img/acid.png",
    final: "src/img/final.png"
  }

  const displayControls = (show) => {
    for (let control of controls) {
      control.style.display = show ? "block" : "none";
    }
  }

  player.onended = function () {
    displayControls(true);
    previewImg.src = imageMap[state];

    if (state === "final") {
      document.getElementById("baker")
        .style.display = "block";

      if (player.src.indexOf(map[state]) < 0) {
        player.src = map[state];
      }
      player.play();
    }
  }

  const addHandler = function () {
    const component = this.getAttribute("data-component");

    player.src = map[state][component];
    player.play();

    this.remove();
    displayControls(false);

    if (state === "empty") {
      state = component;
    } else {
      state = "final";
    }
  }

  for (let control of controls) {
    control.addEventListener("click", addHandler);
  }

  document.getElementById("baker").addEventListener("click", () => {
    document.getElementById("timeline").innerHTML = "";
    popup.classList.add("opened");

    const { playerPause } = timeline({
      containerId: "timeline",
      framesFolder: "src/img/INT3D-36",
      fps: 15,
      framesCount: 750,
      firstFrameName: "INT3D-36.0000.jpg",
      periods: []
    });

    pause = playerPause;
  });

  document.getElementById("closeButton").addEventListener("click", () => {
    if (popup.classList.contains("opened")) {
      pause();
      popup.classList.remove("opened");
      document.getElementById("timeline").innerHTML = "";
    }
  });
});