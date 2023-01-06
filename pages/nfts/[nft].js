import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from 'next/link'
import { useRouter } from 'next/router'


const NFT = () => {

    const [nftResults, setNFTresults] = useState([])
    const [loaded, setLoaded] = useState(false)
    const router = useRouter();
    const params = router.query.nft?.toString().split('-') || "";
    const tokenHash = params[0];
    const user = params[1];


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

    function getNFTattributes(metadata) {
        if (!metadata) return;

        let meta = JSON.parse(metadata);

        if (!meta.attributes) return;
        console.log('attributes', meta.attributes)
        return (
            <>
                <div className="attribute-container" style={{ marginBottom: "55px" }}>
                    <div style={{ fontSize: "13px", fontWeight: "bold", marginTop: "5px"}}>
                        Attributes
                    </div>
                    {meta.attributes?.map(({trait_type, value}, key) => {
                        return (
                            <div className="attribute" key={key}>
                                <div>
                                    {`${trait_type}: ${value}`}
                                </div>
                            </div> 
                        )
                    })}
                </div>
            </>
        )
    }

    useEffect(() => {
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

    
        getNFTs()
    }, [loaded, user])

    
    let nftMatch = nftResults.filter(item => {
        return item.token_hash === tokenHash
    })
    
    if (nftMatch.length === 1) {
        nftMatch = (nftMatch[0])
    }

    

    return (
        <div style={{ width: "500px", margin: "auto" }}>
            {nftMatch && (
                <>
                    <img
                        loading="lazy"
                        width={450}
                        src={getNFTimgs(nftMatch.metadata)}
                        alt={`image`}
                        style={{ borderRadius: "5px", marginTop: "10px" }}
                    />
                    <div style={{ fontSize: "14px", fontWeight: "bold", marginTop: "5px" }}>
                        {`${nftMatch.name}\n#${nftMatch.token_id}`}
                    </div>
                    <div style={{ fontSize: "12px" }}>
                        {getNFTdescription(nftMatch.metadata)}
                    </div>
                    <div style={{ fontSize: "12px" }}>
                        {getNFTattributes(nftMatch.metadata)}
                    </div>
                    <Link className="button" href={`https://opensea.io/assets/ethereum/${nftMatch.token_address}/${nftMatch.token_id}`}>
                        View on OpenSea
                    </Link>
                    <Link className="button" href='/user'>
                        Go back
                    </Link>
            </>
            )}
        </div>
    )
}

export default NFT;
