import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from 'next/link'
import { useRouter } from 'next/router'


const trackedWalletNFT = () => {

    const [nftResults, setNFTresults] = useState([])
    const [loaded, setLoaded] = useState(false)
    const router = useRouter();
    const params = router.query.trackedWalletNFT;
    console.log(router)
    const user = params[0]
    const tokenHash = params[1]

    console.log('NFT user', params)

    function getNFTimgs(metadata) {
        if (!metadata) return;
    
        let meta = JSON.parse(metadata);
    
        if (!meta.image) return;
    
        if (!meta.image.includes("ipfs://")) {
          return meta.image;
        } else {
          return "https://ipfs.io/ipfs/" + meta.image.substring(7);
        }
      }

    function getNFTdescription(metadata) {
        if (!metadata) return;

        let meta = JSON.parse(metadata);

        if (!meta.description) return;
        return meta.description;
    }

    async function getNFTs() {
    let res;
    const options = {
        method: 'GET',
        url: `https://deep-index.moralis.io/api/v2/${user}/nft`,
        params: {chain: 'eth', format: 'decimal', normalizeMetadata: 'false'},
        headers: {accept: 'application/json', 'X-API-Key': '90aMzzA9q0jMTFt2SUqJ2t1CWVRaIVUBErIJcDwYINiHz2vtquYggZMOzf9FKQZL'}
    };

    res = await axios
        .request(options)
        .then(function (res) {
            setNFTresults(res.data.result);
            setLoaded(true);
        })
        .catch(function (error) {
        console.error(error);
        });
    }

    useEffect(() => {
        getNFTs()
    }, [loaded])

    
    let nftMatch = nftResults.filter(item => {
        return item.token_hash === tokenHash
    })
    
    if (nftMatch.length === 1) {
        nftMatch = (nftMatch[0])
    }

    

    return (
        <div style={{ width: "500px" }}>
            {nftMatch && (
                <>
                    <img
                        loading="lazy"
                        width={450}
                        src={getNFTimgs(nftMatch.metadata)}
                        alt={`image`}
                        style={{ borderRadius: "5px", marginTop: "10px" }}
                    />
                    <div style={{ fontSize: "14px", fontWeight: "bold" }}>
                        {`${nftMatch.name}\n#${nftMatch.token_id}`}
                    </div>
                    <div style={{ fontSize: "12px" }}>
                        {getNFTdescription(nftMatch.metadata)}
                    </div>
                    <button>
                        <Link href={{
                            pathname: '/trackedAddresses/[trackedWalletNFTContainer]',
                            query: {trackedWalletNFTContainer: user}}}>Go back</Link>
                    </button>
            </>
            )}
        </div>
    )
}

export default trackedWalletNFT;