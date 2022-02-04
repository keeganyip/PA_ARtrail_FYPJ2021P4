$(document).ready(function () {
    // console.log($("#lightSlider"))
});
var images = document.querySelectorAll('.gallery img');
console.log(images);
images.forEach(image => {
    
    image.addEventListener('click', function () {
        window.location.href = 'imagepreview.html?' + image.getAttribute('src')
    });
});