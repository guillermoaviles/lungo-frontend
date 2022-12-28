import axios from "axios";
import Link from 'next/link'


function NFTContainer({ user, nfts, setNFTs }) {
    

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
        }

        console.log(nfts)
        return (
            <>
              <div className="App">
                <div style={{ fontSize: "23px", fontWeight: "700" }}>
                  My NFTs
                </div>
                <button className="bu" onClick={getNFTs}>
                  Get NFT's
                </button>
                {nfts.length > 0 && (
                  <>
                    <div className="results">
                      {nfts?.map((nft, i) => {
                        return (
                            <Link 
                              href='/nfts/[nft]'
                              as={`nfts/${nft.name}-${nft.token_id}`} 
                              key={nft}
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
}

export default NFTContainer;