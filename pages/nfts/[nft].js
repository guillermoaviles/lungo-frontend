import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from 'next/link'
import { useRouter } from 'next/router'


const NFT = () => {

    const [nftResults, setNFTresults] = useState([])

    const router = useRouter();
    const params = router.query.nft.toString().split('-');
    const tokenHash = params[0];
    const user = params[1];
    console.log(params)

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
                let n = nftResults;
                setNFTresults(n.concat(res.data.result));
            console.log(res);
            })
            .catch(function (error) {
            console.error(error);
            });
      }
      useEffect(() => {
        getNFTs()
      }, [nftResults])

        console.log(nftResults)
        let nftMatch = nftResults.filter(item => {
            return item.token_hash === tokenHash
        })
       
        if (nftMatch.length > 1) {
            nftMatch = nftMatch[0]
        }

        console.log(nftMatch)

    return (
        <div style={{ width: "70px" }}>
            <img
                loading="lazy"
                width={70}
                src={getNFTimgs(nftMatch.metadata)}
                alt={`image`}
                style={{ borderRadius: "5px", marginTop: "10px" }}
            />
            <div style={{ fontSize: "10px" }}>
                {`${nftMatch.name}\n${nftMatch.token_id}`}
            </div>
            <h1>
                <Link href='/user'>Go back</Link>
            </h1>
        </div>
    )
}

export default NFT;