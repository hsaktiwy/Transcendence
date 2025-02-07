import { useContext} from 'react';
import {Navigate} from 'react-router-dom';



import { AuthContext } from '@/components/AuhtenticationContext';
import LoadingIndecator from '@/components/Loading';
import { childrenInterface } from '../utils/interfaces';

function RouteProtection(children: childrenInterface)
{

    const AuthContextConsummer = useContext(AuthContext)
    if (!AuthContextConsummer)
        throw new Error("invalid scope");

   return  AuthContextConsummer.loggedIn === undefined ? <LoadingIndecator/> : AuthContextConsummer.loggedIn === true ? (<>{children.children}</>) : (<><Navigate to='/home'/></>) 

}

export default RouteProtection;