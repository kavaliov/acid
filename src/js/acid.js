document.addEventListener("DOMContentLoaded", () => {
  let state = "empty";  // empty | soda | acid | final
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

  caches.open("video").then((cache) => {
    videoList.forEach((video) => {
      fetch(video).then((response) => {
        cache.put(video, response).then(() => {});
      })
    });
  })


  const player = document.getElementById("player");
  const controls = document.getElementsByClassName("addButton");

  const displayControls = (show) => {
    for (let control of controls) {
      control.style.display = show ? "block" : "none";
    }
  }

  player.onended = function () {
    displayControls(true);
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
      this.onended = () => {

      };
    }
  }

  for (let control of controls) {
    control.addEventListener("click", addHandler);
  }
});