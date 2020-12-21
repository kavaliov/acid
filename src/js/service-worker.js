self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  if (
    event.request.method === "GET" &&
    event.request.url.match(/(?:mp4)/)
  ) {
    event.respondWith(
      fetch(event.request).catch(() => {
        const key = `${url.origin}${url.pathname}`;

        const response = caches
        .open("video")
        .then((cache) => cache.match(key));

        if (response) {
          return response;
        }

        return event;
      })
    );
  }
});