import { getSession, signOut } from 'next-auth/react';
import axios from "axios";

// gets a prop from getServerSideProps
function User({ user }) {

    const [nfts, setNFTs] = useState()

    const getNFTs = () => {
        axios
        .get(`https://online-store.herokuapp.com/api/online-store/items/${id}`)
        .then((response) => {
            props.setNFTs(response.data);
        });
    };

    return (
        <div>
            <h4>User session:</h4>
            <pre>{JSON.stringify(user, null, 2)}</pre>
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
