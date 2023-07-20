import Header from "../Header/Header"
import Main from "../Main/Main"


 export default function ProtectedRoute({loggedIn, userEmail, ...props}){
    return{
        loggedIn ?
        <>
            <Header dataUser={userEmail}/>
            <Main
            name='main'
            {...props}
            />
        </>
        :
        <Navigate to={'/signin'} replace/> 

    }
}