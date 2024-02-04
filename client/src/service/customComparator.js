export const customComparator = (a, b) => {
    // Extract month and date from the strings
    const [dayA, monthA, yearA] = a.date.split('.');
    const [dayB, monthB, yearB] = b.date.split('.');
  
    // Compare months
    if (yearA !== yearB) {
      return yearA - yearB;
    }
    if (monthA !== monthB) {
      return monthA - monthB;
    }
  
    // If months are the same, compare days
    if (dayA !== dayB) {
      return dayA - dayB;
    }
  
    // If dates are the same, compare hours
    const [startHourA] = a.hour.split('-');
    const [startHourB] = b.hour.split('-');
  
    return startHourA.localeCompare(startHourB);
  };