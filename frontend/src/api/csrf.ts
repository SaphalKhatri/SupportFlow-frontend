export function getCsrfToken(): string | null {
    const cookies=document.cookie.split("; ");

    for(const cookie of cookies){
        const[name,value]=cookie.split("=");

        if(name=="csrftoken"){
            return value;
        }
    }
    return null;
}
