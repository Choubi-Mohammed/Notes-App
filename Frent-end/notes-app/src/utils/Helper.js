const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const validateEmail = (email) => {
    if (typeof email !== 'string') {
        return false; 
    }
    return emailRegex.test(email);
}
export const Getinitail=(name)=>{
    if(!name) return "";

    const words=name.split(" ");
    let initails="";
    for(let i=0;i< Math.min(words.length,2);i++){
        initails+=words[i][0];
    }
    return initails.toLocaleUpperCase()
    
    
}
