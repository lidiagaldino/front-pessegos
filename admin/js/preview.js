const preview = () => {
    const file = document.getElementById('foto').files[0]
    const imagePreview = document.getElementById('file')
    const fileReader = new FileReader();

    fileReader.onloadend = () => (imagePreview.style.background = `url(${fileReader.result}) center no-repeat`)

    if (file) {
        fileReader.readAsDataURL(file);
    } else {
        imagePreview.src = './img/foto.png';
    }
}

export {
    preview
}