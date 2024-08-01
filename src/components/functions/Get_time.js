function getTime() {
    const now = new Date(); // Get the current date and time
    const hours = now.getHours(); // Get the hours
    const minutes = now.getMinutes(); // Get the minutes
    const day = now.getDate(); // Get the day of the month
    const month = now.getMonth() + 1; // Get the month (0-indexed, so add 1)
    const year = now.getFullYear(); // Get the year
  
        return {
            hours,minutes,day,month,year
        }
  }
  
  export { getTime }
  