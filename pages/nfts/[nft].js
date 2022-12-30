import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from 'next/link'
import { useRouter } from 'next/router'


const NFT = () => {

    const [nftResults, setNFTresults] = useState([])
    const [loaded, setLoaded] = useState(false)
    // const [nftMatch, setNFTmatch] = useState({})

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
            // let n = nftResults;
            setNFTresults(res.data.result);
            setLoaded(true);
        console.log(res);
        })
        .catch(function (error) {
        console.error(error);
        });
  }

      useEffect(() => {
        getNFTs()
      }, [loaded])

        console.log(nftResults)
        let nftMatch = nftResults.filter(item => {
            console.log(item.token_hash)
            console.log(tokenHash)
            console.log(item.token_hash === tokenHash)
            return item.token_hash === tokenHash
        })
        console.log(nftMatch[0])
        if (nftMatch.length === 1) {
            nftMatch = (nftMatch[0])
        }

        console.log(nftMatch)

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
                        <Link href='/user'>Go back</Link>
                    </button>
            </>
            )}
        </div>
    )
}

export default NFT;