// Function to continuously get and log the live time in hh:mm:ss format
function getLiveTime(callback: (time: string) => void): void {
    setInterval(() => {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        
        const time = `${hours}:${minutes}:${seconds}`;
        callback(time);  // Call the callback with the updated time
    }, 1000);  // Update every second
}

export default getLiveTime;
