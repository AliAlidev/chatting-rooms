
function addDays(days) {
    return new Date(Date.now() + days * 24 * 60 * 60 * 1000).getTime().toFixed();
}

module.exports = {
    addDays
}