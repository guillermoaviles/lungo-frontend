import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'


const NFT = ({ nfts, i }) => {

    const router = useRouter();
    const nftSelected = router.query.nft;
    console.log(nfts)
    console.log(nftSelected)

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
    
    return (
        <div style={{ width: "70px" }}>
            <img
                loading="lazy"
                width={70}
                src={getNFTimgs(nftSelected.metadata)}
                alt={`${i}image`}
                style={{ borderRadius: "5px", marginTop: "10px" }}
            />
            <div key={i} style={{ fontSize: "10px" }}>
                {`${nftSelected.name}\n${nftSelected.token_id}`}
            </div>
            <h1>
                <Link href='/user'>Go back</Link>
            </h1>
        </div>
    )
}

export default NFT;