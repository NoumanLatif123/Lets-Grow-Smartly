import {useState, useContext, useEffect} from "react";
import {getAllSpecialists,getSpecialistsByName} from "../apiCalls";
import {UsersContext} from "../context/users/UserContext";

export const useFetchSpecialists = _ => {

    const [searchTerm, setSearchTerm] = useState('');
    const {dispatch} = useContext(UsersContext);
    const fetchSpecialists = async () => {
        try {
            await getSpecialistsByName(searchTerm, dispatch);
        } catch (e) {
            console.log(e, 'use home fetch error');
        }
    }

    useEffect(()=>{ //on first load fetch all the specialists
        getAllSpecialists(dispatch).then();
    },[]);

    return {setSearchTerm, fetchSpecialists};
}