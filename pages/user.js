import { getSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import NFTContainer from '.';
import TrackedWallets from './trackedWallets';
import axios from "axios";


// gets a prop from getServerSideProps
function User({ user }) {

    const [hasActiveUser, setHasActiveUser] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const signedInUser = {address: user.address};
    console.log('user', user)
    console.log('signedInUser', signedInUser)


    useEffect(() => {
    const getUsers = async () => {
        axios
        .get(`https://lungo-backend.herokuapp.com/api/lungo-backend/users/${user.address}`)
        .then((res) => {
            console.log(res.data)
            if (res.data === null) {
                createNewUser()
                setLoaded(true);
            } else {
                setHasActiveUser(true)
                setLoaded(true);
                console.log('has active user', hasActiveUser)
            }
        });
    };

    const createNewUser = async () => {
            try {
                    // eslint-disable-next-line no-unused-vars
                    axios.post('https://lungo-backend.herokuapp.com/api/lungo-backend/newUser', signedInUser)
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

        getUsers()
    }, [hasActiveUser, user])

    return (
        <div>
            <h1>Welcome to Lungo!</h1>
            <NFTContainer user={ user } />
            {
               (loaded && hasActiveUser) && <TrackedWallets user={ user } />
            }
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
