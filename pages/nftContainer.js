import axios from "axios";
import Link from 'next/link'


function NFTContainer({ user, nfts, setNFTs }) {

    const options = {
        method: 'GET',
        url: `https://deep-index.moralis.io/api/v2/${user.address}/nft`,
        params: {chain: 'eth', format: 'decimal', normalizeMetadata: 'false'},
        headers: {accept: 'application/json', 'X-API-Key': '90aMzzA9q0jMTFt2SUqJ2t1CWVRaIVUBErIJcDwYINiHz2vtquYggZMOzf9FKQZL'}
    };
    
        axios
            .request(options)
            .then(function (response) {
                setNFTs(response.data)
            console.log(response.data);
            })
            .catch(function (error) {
            console.error(error);
            });

        console.log(user.address)

    if (nfts === undefined) return;

    let newData = Object.values(nfts.result);
    
    const data = newData.map((nfts, key) => {
        return (
        <div key={key} className='item'>
            <Link href={`description/${nfts._id}`}>
            <img src={nfts.images} alt={nfts.name} className='gallery-image'/>
            
            <div className='item-info'>
                <p className='item-title'>{nfts.title}</p>
                <p className='price'>${nfts.price}</p>
            </div>
            </Link>
        </div>
        );
    });
    return  <div>
                <h1 className='items'>NFTs: ({data.length})</h1>
                <div className='gallery-container'>{data}</div>
            </div>

}

export default NFTContainer;