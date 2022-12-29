import React, { useEffect } from "react";
import axios from "axios";
import Link from 'next/link'


function NFTContainer({ user, trackedAddresses, setTrackedAddresses, nfts, setNFTs }) {
    

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
          url: `https://deep-index.moralis.io/api/v2/${user.address}/nft`,
          params: {chain: 'eth', format: 'decimal', normalizeMetadata: 'false'},
          headers: {accept: 'application/json', 'X-API-Key': '90aMzzA9q0jMTFt2SUqJ2t1CWVRaIVUBErIJcDwYINiHz2vtquYggZMOzf9FKQZL'}
      };

      res = await axios
          .request(options)
          .then(function (res) {
              let n = nfts;
              setNFTs(n.concat(res.data.result));
          console.log(res);
          })
          .catch(function (error) {
          console.error(error);
          });
    };


    const getTrackedAddresses = () => {
      axios
        .get(`http://localhost:8080/api/lungo-backend/users/${user.address}`)
        .then((res) => {
          setTrackedAddresses(res.data)
        });
    };

    useEffect(() => {
      getNFTs();
      getTrackedAddresses();
    }, [nfts, trackedAddresses]);

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
                              key={nft.token_hash}
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
                <div>
                  My Tracked Wallets ({trackedAddresses.length})
                </div>
                {trackedAddresses.length > 0 && (
                  <>
                    <div className="addresses-container">
                      {trackedAddresses?.map((trackedAddress, key) => {
                        return (
                            <Link 
                              href='/trackedAddresses/[trackedAddress]'
                              as={`trackedAddresses/${trackedAddress.address}`} 
                              key={key}
                            >
                                <div style={{ width: "70px" }}>
                                   {trackedAddress.address}
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

export default NFTContainer;