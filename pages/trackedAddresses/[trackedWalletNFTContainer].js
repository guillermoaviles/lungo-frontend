import React, { useEffect, useState, } from "react";
import axios from "axios";
import Link from 'next/link'
import { useRouter } from 'next/router'



function TrackedWalletNFTContainer() {
    
  const [nfts, setNFTs] = useState([])
  const [loaded, setLoaded] = useState(false)
  const router = useRouter();
  const params = router.query.trackedWalletNFTContainer;

  

  console.log('params', params)

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

    async function getNFTs() {
      let res;
      const options = {
          method: 'GET',
          url: `https://deep-index.moralis.io/api/v2/${params}/nft`,
          params: {chain: 'eth', format: 'decimal', normalizeMetadata: 'false'},
          headers: {accept: 'application/json', 'X-API-Key': '90aMzzA9q0jMTFt2SUqJ2t1CWVRaIVUBErIJcDwYINiHz2vtquYggZMOzf9FKQZL'}
      };

      res = await axios
          .request(options)
          .then(function (res) {
              console.log(res);
              setNFTs(res.data.result);
              setLoaded(true);
          })
          .catch(function (error) {
          console.error(error);
          });
    };

    useEffect(() => {
      if (!params) {
        return
      }
      getNFTs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params])

    console.log('nfts', nfts)

        return (
            <>
              <div className="App">
                <Link className="signout-button" href='/user'>
                        Go back
                </Link>
                <div style={{ fontSize: "23px", fontWeight: "700" }}>
                  {params}&apos;s NFTs ({nfts.length})
                </div>
                {nfts.length > 0 && (
                  <>
                    <div className="nft-container">
                      {nfts?.map((nft, i) => {
                        return (
                            <Link 
                            href={`/trackedAddresses/${params}/${nft.token_hash}` }
                              query = {
                                params
                              }
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
              </div>
            </>
        );
};

export default TrackedWalletNFTContainer;