import { createContext, useContext, useReducer, useMemo , useState} from "react";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
// import PropTypes from "prop-types";
// Create MyContext
export const MyContext = createContext();
// Setting custom name for the context 
MyContext.displayName = "MyContextContext";
// React reducer
function reducer(state, action) {
    switch (action.type) {
        case "USER_LOGIN": {
            return { ...state, darkMode: action.value };
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
}
// React context provider
function MyContextControllerProvider({ children }) {
   
  
 
        
    const initialState = {
        userLogin: {
            name: "admin",
            phone: "0969215279",
            address: "Binh Duong",
            email: "ntthao6722@gmail.com",
            password: "123456",
            role: "admin",

        },
    };
    const [controller, dispatch] = useReducer(reducer, initialState);
    const value = useMemo(() => [controller, dispatch], [controller, dispatch]);
    return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
}
//React custom hook for using context
function useMyContextController() {
    const context = useContext(MyContext);
    if (!context) {
        throw new Error(
            "useMyContextController should be used inside the MyContextControllerProvider."
        );
    }
    return context;
}

const USERS = firestore().collection("USERS")
const login = async (dispatch, email, password) => {

    // auth().signInWithEmailAndPassword(email,password)
    //     .then(
    //         () =>
    //             USERS.doc(email)
    //                 .onSnapshot(u => {
    //                     const value = u.data();
    //                     console.log("Đăng Nhập Thành Công voi user : ", value);
    //                     dispatch({ type: "USER_LOGIN", value });
    //                 })
    //     )
    //     .catch(e => alert("Sai user hoac password") )
    auth().signInWithEmailAndPassword(email, password)
        .then(() => USERS.doc(email).onSnapshot(u => {
            const value = u && u.exists ? u.data() : null;
            console.log("Đăng Nhập Thành Công Với User : ", value);
            dispatch({ type: "USER_LOGIN", value });
        }))
        .catch(e => alert("Sai user hoặc password"));

}

export {
    MyContextControllerProvider,
    useMyContextController,
    login,
};
