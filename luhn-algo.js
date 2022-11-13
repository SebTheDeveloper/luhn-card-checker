document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#submit').onclick = (e) => {
        let card = document.querySelector('#card-num').value;
        document.querySelector('#result').innerHTML = luhn(card);
        document.querySelector('#card-num').value = '';
        return false;
    }
})

function luhn(card) {
    let cardNumber = String(card);
    let productDigits = [];
    let notMultiplied = [];

    // Reverse input
    let reversedCard = [];
    for (let i = 0, length = `${card}`.length - 1; i <= length; i++) {
        reversedCard.unshift(String(card)[i]);
    }

    // Multiply every other digit by 2, starting with the number’s second-to-last digit
    for (num in reversedCard) {
        if (num % 2 == 0) {
            notMultiplied.push(reversedCard[num]);
        } else {
            productDigits.push(String(parseInt(reversedCard[num]) * 2));
        }
    }
    // Add those products’ digits together
    let s1 = 0;
    for (num in productDigits) {
        for (char in productDigits[num]) {
            s1 += parseInt(productDigits[num][char]);
        }
    }

    // Add the sum to the sum of the digits that weren’t multiplied by 2
    let s2 = 0;
    for (num in notMultiplied) {
        s2 += parseInt(notMultiplied[num]);
    }

    document.querySelector('#result').style.color = 'red';
    let isValid = 'False ~ not a valid card';
    let cardType = '';


    const total = String(s1 + s2);

    if (`${card}`[0] == '5') cardType = 'MasterCard';
    else if (`${card}`[0] == '4') cardType = 'Visa';
    else if (`${card}`[0] == '3') cardType = 'AMEX';
    else if (`${card}`[0] == '6') cardType = 'Discover';
    else cardType = 'unfamiliar Card Type';
    
    if (cardNumber.length >= 13 && cardNumber.length <= 19) {
        if (parseInt(total[total.length - 1]) % 10 == 0) {
            isValid = 'True ~ ';
            document.querySelector('#result').style.color = 'green';
        }
    }
    
    if (isValid == 'True ~ ') {
        return String(isValid) + cardType;
    } else return isValid;

}