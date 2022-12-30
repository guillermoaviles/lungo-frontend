import { getSession, signOut } from 'next-auth/react';
import NFTContainer from './nfts';
import React, { useState } from "react";

// gets a prop from getServerSideProps
function User({ user }) {

    const [nfts, setNFTs] = useState([])
    

    return (
        <div>
            <h1>Welcome to Lungo!</h1>
            {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
            <NFTContainer 
                user={ user } 
                nfts={ nfts } 
                setNFTs={ setNFTs }
            />
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
