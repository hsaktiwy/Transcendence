export function formatDate2(dateString: Date | string, slice?: boolean) {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMs = now.getTime() - date.getTime();
    
    // If the date is less than 1 minute ago
    if (diffInMs < 60000) {
        return 'just now';
    }

    // If the date is within the last 24 hours
    const diffInHours = diffInMs / (1000 * 60 * 60);
    if (diffInHours < 12 && now.getDay() === date.getDay() && now.getMonth() === date.getMonth() && now.getFullYear() === date.getFullYear()) {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    // For dates older than 24 hours, format as dd/mm/yyyy hh:mm
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    return `${day}/${month}/${year} ${slice && slice!==true ? hours+":"+minutes : ""}`;
}

export function formatDate(date: Date | string): string {
    const now = new Date();
    const inputDate = new Date(date);
    const diffMs = now.getTime() - inputDate.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60)); 
    const diffHrs = Math.floor(diffMins / 60); 
    const diffDays = Math.floor(diffHrs / 24); 

    if (diffDays === 0) {
        if (diffHrs < 1) {
            if (diffMins < 1) {
                return 'just now';
            } else {
                return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
            }
        } else {
            return `${diffHrs} hour${diffHrs > 1 ? 's' : ''} ago`;
        }
    } else if (diffDays === 1) {
        return 'yesterday';
    } else {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return inputDate.toLocaleDateString(undefined, options);
    }
}