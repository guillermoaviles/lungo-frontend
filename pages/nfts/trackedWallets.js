import React, { useEffect, useState } from "react";
import axios from "axios";


function TrackedWallets({ user }) {

    const [trackedAddresses, setTrackedAddresses] = useState([])


    const getTrackedAddresses = () => {
        axios
        .get(`http://localhost:8080/api/lungo-backend/users/${user.address}`)
        .then((res) => {
            setTrackedAddresses(res.data)
        });
    };

    useEffect(() => {
        getTrackedAddresses();
      }, [trackedAddresses]);


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
                                    as={`trackedAddresses/${trackedAddress.address}`} 
                                    key={key}
                                >
                                    <div style={{ width: "70px" }}>
                                        {trackedAddress.address}
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