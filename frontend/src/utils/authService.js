
export const login = async (credentials) => {
  try {

    const response = await fetch("http://localhost:5000/api/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
    });

    let data = await response.json()
    if(data.error){
        throw new Error(data.error)
    }
    if(!response.ok){
        throw new Error('Login failed');
    }

    localStorage.setItem("TOKEN_KEY", data.user.token);
    localStorage.setItem("EMAIL", data.user.email);

    return data.user.token;

  } catch (error) {
    return {
        error: error.message
    }
  }
};

export const signup = async (userData) => {
  try {

    const response = await fetch("/api/signup", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
    });

    let data = await response.json()
    if(data.error){
        throw new Error(data.error)
    }
    if (!response.ok) {
        throw new Error('Signup failed');
    }

    localStorage.setItem("TOKEN_KEY", data.user.token);
    localStorage.setItem("EMAIL", data.user.email);

    return data.user.token;

  } catch (error) {
    return {
        error: error.message
    }
  }
};

export const logout = async () => {

    const token = getToken();
    const response = await fetch("/api/logout", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    });
  
    if (response.ok) {
        localStorage.removeItem("TOKEN_KEY");
    }  
};

export const getToken = () => {
    return localStorage.getItem("TOKEN_KEY");
};

export const isAuthenticated = () => {
    const token = getToken();
    if(!token || token==="undefined"){
        return false
    }else{
        return true
    }
};
