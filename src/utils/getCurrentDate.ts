const getCurrentDate = (): string =>{
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0'); // Ensure 2-digit day
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Ensure 2-digit month (0-indexed)
    const year = now.getFullYear();

    return `${day}/${month}/${year}`;
}

export default getCurrentDate