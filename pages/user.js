import { getSession, signOut } from 'next-auth/react';
import NFTContainer from './nfts';
import React from "react";

// gets a prop from getServerSideProps
function User({ user }) {
    

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
