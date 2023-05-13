
export function generateCardNumber(): string {
    let cardNumber: string = '';
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            cardNumber += Math.floor(Math.random() * 10).toString();
        }
        if (i !== 3) {
            cardNumber += ' ';
        }
    }
    return cardNumber;
}

export function generateCvcCode(): number {
    let digits: string = '';
    for (let i = 0; i < 3; i++) {
        digits += Math.floor(Math.random() * 10).toString();
    }
    return Number(digits);
}

export function generateCardExpireDate(): number {
    const currentTimestamp = Date.now()
    const expireDate = currentTimestamp + (4 * 365 * 24 * 60 * 60 * 1000)
    return expireDate

}