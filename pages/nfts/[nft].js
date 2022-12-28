import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'


const NFT = ({ nft, i , getNFTimgs }) => {

    const router = useRouter();
    const nftSelected = router.query.nft;

    console.log(nft)
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
                <Link href='/user'><a>Go back</a></Link>
            </h1>
        </div>
    )
}

export default NFT;