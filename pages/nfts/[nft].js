export const getStaticPaths = async () => {
    const options = {
        method: 'GET',
        url: `https://deep-index.moralis.io/api/v2/${user.address}/nft`,
        params: {chain: 'eth', format: 'decimal', normalizeMetadata: 'false'},
        headers: {accept: 'application/json', 'X-API-Key': '90aMzzA9q0jMTFt2SUqJ2t1CWVRaIVUBErIJcDwYINiHz2vtquYggZMOzf9FKQZL'}
    };

    const res = await axios
        .request(options)
        .then(function (res) {
        console.log(res);
        })
        .catch(function (error) {
        console.error(error);
        });

        let n = data;
        const data = await (n.concat(res.data.result));

        const paths = data.map(nft => {
            return {
                params: { id: nft.token_hash.toString() }
            }
        })

        return {
            paths,
            fallback: false
        }
}

export const getStaticProps = async (context) => {
    const id = context.params.id;
    const response = 
}


const NFT = ({ nfts }) => {

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

        console.log(nfts)
    
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