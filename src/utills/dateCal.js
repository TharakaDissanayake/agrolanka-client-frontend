
import moment from "moment";



export function dateCal(dateOfAd) {
    try {
        const timediff = require('timediff');
        let dateDiffArray = timediff(moment(dateOfAd).format(), moment(new Date()).format().toLocaleString(), 'YDHms');
        if (parseFloat(dateDiffArray.years) === 1) {
            return dateDiffArray.years + " year ago";

        }
        else if (parseFloat(dateDiffArray.years) > 1) {
            return dateDiffArray.years + " years ago";

        }
        else if (parseFloat(dateDiffArray.days) === 1) {
            return dateDiffArray.days + " day ago";
        }
        else if (parseFloat(dateDiffArray.days) > 1) {
            return dateDiffArray.days + " days ago";
        }
        else if (parseFloat(dateDiffArray.hours) === 1) {
            return dateDiffArray.hours + " hour ago";
        }
        else if (parseFloat(dateDiffArray.hours) > 1) {
            return dateDiffArray.hours + " hours ago";
        }
        else if (parseFloat(dateDiffArray.minutes) === 1) {
            return dateDiffArray.minutes + " minute ago";
        }
        else {
            return dateDiffArray.minutes + " minutes ago";
        }
    }
    catch (err) {
        console.log(err)
    }
}

