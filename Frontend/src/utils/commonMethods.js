export const pictureUrl = (src)=>{
    return src ? `http://localhost:5000/assets/images/${src}`: './assets/pictures/dummyavatar.jpg';
}