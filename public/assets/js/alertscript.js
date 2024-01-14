
const alert = document.getElementsByClassName('alert');
function hideAlert() {
    if (alert.length > 0) {
        alert[0].style.display = 'none';
    }
}
setTimeout(hideAlert, 2000);