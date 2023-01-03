import React, { useEffect, useState, } from "react";
import axios from "axios";
import Link from 'next/link'
import TrackedWallets from "./trackedWallets";


function NFTContainer({ user }) {
    
  const [nfts, setNFTs] = useState([])
  const [loaded, setLoaded] = useState(false)

    function getNFTimgs(metadata) {
        if (!metadata) return;
    
        let meta = JSON.parse(metadata);
    
        if (!meta.image) return;
    
        if (!meta.image.includes("ipfs://")) {
          return meta.image;
        } else {
          return "https://ipfs.io/ipfs/" + meta.image.substring(7);
        }
      };
      console.log(user.address)

    async function getNFTs() {
      let res;
      const options = {
          method: 'GET',
          url: `https://deep-index.moralis.io/api/v2/${user.address.toLowerCase()}/nft`,
          params: {chain: 'eth', format: 'decimal', normalizeMetadata: 'false'},
          headers: {accept: 'application/json', 'X-API-Key': '90aMzzA9q0jMTFt2SUqJ2t1CWVRaIVUBErIJcDwYINiHz2vtquYggZMOzf9FKQZL'}
      };

      res = await axios
          .request(options)
          .then(function (res) {
              console.log(res);
              setNFTs(res.data.result);
              setLoaded(true);
          console.log(res);
          })
          .catch(function (error) {
          console.error(error);
          });
    };

    useEffect(() => {
      getNFTs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loaded])

    console.log(nfts)

        return (
            <>
              <div className="App">
                <div style={{ fontSize: "23px", fontWeight: "700" }}>
                  My NFTs ({nfts.length})
                </div>
                {nfts.length > 0 && (
                  <>
                    <div className="nft-container">
                      {nfts?.map((nft, i) => {
                        return (
                            <Link 
                              href='/nfts/[nft]'
                              as={`nfts/${nft.token_hash}-${user.address}`} 
                              key={i}
                            >
                                <div style={{ width: "70px" }}>
                                    <img
                                        loading="lazy"
                                        width={70}
                                        src={getNFTimgs(nft.metadata)}
                                        alt={`${i}image`}
                                        style={{ borderRadius: "5px", marginTop: "10px" }}
                                    />
                                    <div key={i} style={{ fontSize: "10px" }}>
                                        {`${nft.name}\n${nft.token_id}`}
                                    </div>
                                </div>
                            </Link>
                        )
                      })}
                    </div>
                  </>
                )}
                <TrackedWallets user={user}/>
              </div>
            </>
        );
};

export default NFTContainer;