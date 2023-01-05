import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import axios from "axios";
import Link from 'next/link'


function TrackedWallets({ user }) {

    const router = useRouter();
    const [trackedAddresses, setTrackedAddresses] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [addressToAdd, setAddressToAdd] = useState({
        addresses: ""
    })


    console.log(user)

    const getTrackedAddresses = () => {
            axios
            .get(`https://lungo-backend.herokuapp.com/api/lungo-backend/users/${user.address}`)
            .then((res) => {
                console.log(res.data)
                setTrackedAddresses(res.data.addresses)
                setLoaded(true);
            });
    };

    useEffect(() => {
        getTrackedAddresses();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [loaded]);

    console.log(trackedAddresses)

    const addAddressCall = async (e) => {
        e.preventDefault()
        try {
            // eslint-disable-next-line no-unused-vars
            const change = await axios.put(`https://lungo-backend.herokuapp.com/api/lungo-backend/addAddress/${user.address}`, addressToAdd)
                router.push('/user')
        }
        catch (err) {
            console.log(err)
        }
    } 

    const handleAddAddress = (e) => {
        e.preventDefault()
        const addAddressInput = {...addressToAdd};
        addAddressInput[e.target.name] = e.target.value;
        setAddressToAdd(addAddressInput);
    }

    const deleteAddressCall = async (addr) => {
        let addressToDelete = {
            addresses: `${addr}`
        }
        try {
            // eslint-disable-next-line no-unused-vars
            const change = await axios.put(`https://lungo-backend.herokuapp.com/api/lungo-backend/deleteAddress/${user.address}`, addressToDelete)
                router.push('/user')
        }
        catch (err) {
            console.log(err)
        }
    } 


    return (
        <>
            <div className="tracked-addresses">
                <div>
                    My Tracked Wallets ({trackedAddresses.length})
                </div>
                <h1>Add Wallet</h1>
                <form className='address-box' onSubmit={addAddressCall}>
                    <input className='input' placeholder="Address" name="addresses" value={addressToAdd.addresses} onChange={handleAddAddress} required></input>
                    <button className='item-button'>Add</button>
                </form>
                {trackedAddresses.length > 0 && (
                    <>
                        <div className="addresses-container">
                            {trackedAddresses?.map((trackedAddress, key) => {
                                return (
                                    <div key={key}>
                                        <Link 
                                            href='/trackedAddresses/[trackedWalletNFTContainer]'
                                            as={`trackedAddresses/${trackedAddress}`} 
                                            key={key}
                                        >
                                            <div style={{ width: "70px" }}>
                                                {trackedAddress}
                                            </div>
                                        </Link>
                                        <button value={trackedAddress} onClick={() => deleteAddressCall(trackedAddress)}>❌</button>
                                    </div>
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