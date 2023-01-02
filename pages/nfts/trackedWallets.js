import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from 'next/link'


function TrackedWallets({ user }) {

    const [trackedAddresses, setTrackedAddresses] = useState([])
    const [loaded, setLoaded] = useState(false)


    const getTrackedAddresses = () => {
        axios
        .get(`http://localhost:8080/api/lungo-backend/users/${user.address.toLowerCase()}`)
        .then((res) => {
            console.log(res.data.addresses)
            setTrackedAddresses(res.data.addresses)
            setLoaded(true);
        });
    };

    useEffect(() => {
        getTrackedAddresses();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [loaded]);

      console.log(trackedAddresses)

    return (
        <>
            <div className="tracked-addresses">
            <div>
                My Tracked Wallets ({trackedAddresses.length})
            </div>
            {trackedAddresses.length > 0 && (
                <>
                    <div className="addresses-container">
                        {trackedAddresses?.map((trackedAddress, key) => {
                            return (
                                <Link 
                                    href='/trackedAddresses/[trackedAddress]'
                                    as={`trackedAddresses/${trackedAddress}`} 
                                    key={key}
                                >
                                    <div style={{ width: "70px" }}>
                                        {trackedAddress}
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </>
            )}
            </div>
        </>
    )
}

export default TrackedWallets;