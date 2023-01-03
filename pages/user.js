import { getSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import NFTContainer from './nfts';
import axios from "axios";
import { CommonSolUtilsConfigSetup } from '@moralisweb3/common-sol-utils';

// gets a prop from getServerSideProps
function User({ user }) {

    const [newUser, setNewUser] = useState()
    const [loaded, setLoaded] = useState(false)


    console.log(user)


    const getUsers = () => {
        axios
        .get(`http://localhost:8080/api/lungo-backend/users/${user.address.toLowerCase()}`)
        .then((res) => {
            console.log(res.data)
            if (res.data === null) {
                createNewUser()
                setLoaded(true);
            }
        });
    };

    const createNewUser = async () => {
        // e.preventDefault()
        console.log(newUser)
        try {
            // eslint-disable-next-line no-unused-vars
            axios.post('http://localhost:8080/api/lungo-backend/newUser', newUser)
        }
        catch (err) {
            console.log(err)
        }
    }
    
    useEffect(() => {
        setNewUser({
            address: user.address.toLowerCase(),
            addresses: []
        })
        getUsers()
    }, [loaded])

    return (
        <div>
            <h1>Welcome to Lungo!</h1>
            {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
            <NFTContainer user={ user } />
            <button onClick={() => signOut({ redirect: '/signin' })}>Sign out</button>
        </div>
    );
}

export async function getServerSideProps(context) {
    const session = await getSession(context);
    
    // redirect if not authenticated
    if (!session) {
        return {
            redirect: {
                destination: '/signin',
                permanent: false,
            },
        };
    }

    return {
        props: { user: session.user },
    };
}

export default User;
