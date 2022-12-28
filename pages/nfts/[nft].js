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

      function getNFTdescription(metadata) {
        if (!metadata) return;
    
        let meta = JSON.parse(metadata);
    
        if (!meta.description) return;
        console.log(meta.description)  
        return meta.description;
      }

    //   {"name":"#162","description":"The Face of Sudo is an abstract tribute to the Faceless Crypto Community. The face of Sudo is meant to symbolize both the power and the responsibility that creators have in the web3 domain.","image":"ipfs://QmNX3eKFuZcmn7JQhDM2SSfqMwSGrgaQDVZKfXD7muHXaE/162.png","serialization":-4312380779190534700,"attributes":[{"trait_type":"Background","value":"#212E44"},{"trait_type":"Left Highlights - Eyes","value":"1"},{"trait_type":"Right Highlights - Eyes","value":"1"},{"trait_type":"Left Highlights - Ears","value":"3"},{"trait_type":"Right Highlights - Ears","value":"2"},{"trait_type":"Highlights - Nose","value":"3"},{"trait_type":"Highlights - Mouth","value":"2"},{"trait_type":"Shapes","value":"27"},{"trait_type":"Left Eye","value":"6 Flipped"},{"trait_type":"Right Eye","value":"2 Upsidedown"},{"trait_type":"Left Ear","value":"11 Upsidedown"},{"trait_type":"Right Ear","value":"20"},{"trait_type":"Nose","value":"15 Flipped"},{"trait_type":"Mouth","value":"3"},{"trait_type":"Mouth","value":"3"}]}

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
        <div style={{ width: "500px" }}>
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
                <Link href='/user'>Go back</Link>
            </button>
        </div>
    )
}

export default NFT;