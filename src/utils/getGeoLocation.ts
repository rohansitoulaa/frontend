function getGeolocation(): Promise<{ latitude: number, longitude: number }> {
    return new Promise((resolve, reject) => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    resolve({ latitude, longitude });
                },
                (error) => {
                    reject("Error getting geolocation: " + error.message);
                }
            );
        } else {
            reject("Geolocation is not supported by this browser.");
        }
    });
}

export default getGeolocation;
