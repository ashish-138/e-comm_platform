export const Getauth =()=> {
    const auth= localStorage.getItem('token')
    return auth;
    }

export const Setauth =(data)=> {
        localStorage.setItem('token',data)
        }

export const Removeauth =()=> {
        localStorage.removeItem('token')
            }