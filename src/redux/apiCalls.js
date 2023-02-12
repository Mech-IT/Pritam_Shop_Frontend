import { loginFailure, loginStart, loginSuccess, loginFailureReset, logoutSuccess, keepUser,  reset } from "./userRedux"

export const login = async (dispatch, user, navigate,keep) => {
    dispatch(loginStart());
    const userLogin = async () => {
        // const host = "http://localhost:5000"
        const host = process.env.REACT_APP_BASE_URL 
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: user.email,
                password: user.password
            })
        })
        if (response.status >= 200 && response.status <= 299) {
            const tokenObj = await response.json()
            keep===true?localStorage.setItem("token", tokenObj.authToken):sessionStorage.setItem("token", tokenObj.authToken);
            dispatch(keepUser(keep))
            dispatch(loginSuccess(user))
            navigate("/")

        } else {
            const json = await response.json()
            console.log(json)
            dispatch(loginFailure())
            setTimeout(() => {
                dispatch(loginFailureReset())
            }, 5000);

        }

    }
  userLogin()
}


export const logout = async (dispatch,user, navigate) => {
    navigate("/login")
    dispatch(logoutSuccess(user));
    dispatch(reset())
}