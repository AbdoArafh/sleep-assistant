export const minutesToMillis = (minutes: number) => minutes * 60000;

export const format12 = (timeString: string) => {
    return new Date('1970-01-01T' + timeString + 'Z')
        .toLocaleTimeString('en-US', {
            timeZone: 'UTC',
            hour12: true,
            hour: 'numeric',
            minute: 'numeric'
        })
        .replace(' ', '');
};

export const numbersStrings = ['one', 'two', 'three', 'four', 'five', 'six'];