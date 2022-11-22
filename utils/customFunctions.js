export function numFormatter(num) {
    num = parseFloat(num);
    if (num >= 1000000000000) {
        return (num / 1000000000000).toFixed(3).replace(/\.0$/, '') + 'T';
    }
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(3).replace(/\.0$/, '') + 'B';
    }
    if (num >= 1000000) {
        return (num / 1000000).toFixed(3).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(3).replace(/\.0$/, '') + 'K';
    }

    return num.toFixed(2);
}

export function numberWithCommas(x) {
    //return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    if (x != undefined && x != null)
        return x.toLocaleString('en-US');
    else
        return x;
}

export function dateWithCustom(_originalDate) {
    var originalDate = new Date(_originalDate);
    var month = originalDate.getMonth() + 1; //months from 1-12
    // var day = originalDate.getUTCDate();
    var year = originalDate.getFullYear();
    switch (month) {
        case 0:
            return `Jan ${year}`;
        case 1:
            return `Feb ${year}`;
        case 2:
            return `Mar ${year}`;
        case 3:
            return `Apr ${year}`;
        case 4:
            return `May ${year}`;
        case 5:
            return `Jun ${year}`;
        case 6:
            return `Jul ${year}`;
        case 7:
            return `Aug ${year}`;
        case 8:
            return `Sep ${year}`;
        case 9:
            return `Oct ${year}`;
        case 10:
            return `Nov ${year}`;
        case 11:
            return `Dec ${year}`;
    }

}
