function getCookie(name) {  
    let cookieArr = document.cookie.split(";");  
    for(let i = 0; i < cookieArr.length; i++) {  
        let cookiePair = cookieArr[i].split("=");  
        let key = cookiePair[0].trim();  
        if(key === name) {  
            return decodeURIComponent(cookiePair[1]);  
        }  
    }  
    return null;  
}
export {getCookie}