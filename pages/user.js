import { getSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import NFTContainer from './nfts';
import TrackedWallets from './nfts/trackedWallets';
import axios from "axios";


// gets a prop from getServerSideProps
function User({ user }) {

    const [hasActiveUser, setHasActiveUser] = useState(false)
    const [loaded, setLoaded] = useState(false)

    const signedInUser = {address: user.address};
    console.log('user', user)
    console.log('signedInUser', signedInUser)
    

    const getUsers = async () => {
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
            try {
                    // eslint-disable-next-line no-unused-vars
                    axios.post('http://localhost:8080/api/lungo-backend/newUser', signedInUser)
                    .then((res) => {
                        console.log('activeUser', res.data)
                        setHasActiveUser(true);
                        console.log('has active user', hasActiveUser)
                    })
                }
                catch (err) {
                    console.log(err)
                }
    }


    useEffect(() => {
        getUsers()
    }, [hasActiveUser])

    return (
        <div>
            <h1>Welcome to Lungo!</h1>
            {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
            <NFTContainer user={ user } />
            <TrackedWallets user={user} />
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
