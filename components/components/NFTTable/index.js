import SortArrow from "./SortArrow";
import { tabledata } from './tabledata';
import { useEffect, useState } from "react";
const Ether = "img/icons/vector.svg";

//Initialize id of each token
for (let id in tabledata) {
    tabledata[id].id = parseInt(id);
}

const NFTTable = () => {

    const [pagenum, setPagenum] = useState(1);
    //number of tokes per page
    const [count, setCount] = useState(10);
    //token data per page
    const [pagedata, setPagedata] = useState([]);
    //number of pages
    const [pagecount, setPagecount] = useState(0);

    const [nftcollection, setNftcollection] = useState(tabledata);

    useEffect(() => {
        let beginningNum = count * (pagenum - 1);
        let endingNum = count * pagenum;
        setPagedata(nftcollection.slice(beginningNum, endingNum));
        setPagecount(Math.ceil(nftcollection.length / count));
    }, [pagenum, count, nftcollection]);

    const toggle = (e) => {
        let pointer = document.getElementById("pointer");
        if (e.target.id == "south") pointer.style.left = "40px";
        else pointer.style.left = "67px";
    }

    const addToFavourites = (e, id) => {
        let token = nftcollection[count * (pagenum - 1) + id];
        if (token.stared) {
            e.target.src = "img/icons/star.svg";
        }
        else e.target.src = "img/icons/star-filled.svg";
        token.stared = !token.stared;
    }

    const sort = (column, ascending) => {
        //ascending:1, descending:0
        let beginningNum = count * (pagenum - 1);
        let endingNum = count * pagenum;
        nftcollection.sort((a, b) => {
            if (a[column] > b[column]) return ascending;
            if (a[column] < b[column]) return -ascending;
            return 0;
        });
        setPagedata(nftcollection.slice(beginningNum, endingNum));
    }

    return (
        <div className='nfttable'>
            <div className="nft-settings">
                <select className="border-but select">
                    <option>24h</option>
                    <option>12h</option>
                    <option>6h</option>
                </select>
                <div className="border-but toggle">
                    <div className="toggle-pointer" id="pointer"></div>
                    <div className="south">
                        <img alt="ether" src={Ether} />
                    </div>
                    <div className="toggle-bar"></div>
                    <div className="north"><i className="fa-sharp fa-solid fa-dollar-sign"></i></div>
                    <div className="south-area" id="south" onClick={toggle}></div>
                    <div className="north-area" id="north" onClick={toggle}></div>
                </div>
            </div>
            <div className="nft-buttons">
                <div className="border-but pointer"><img alt="star" width="20px" src="img/icons/bluestar.svg" /></div>
                <div className="border-but pointer">Categories</div>
                <div className="border-but pointer">Collection</div>
                <div className="border-but pointer">Creactors</div>
                <div className="border-but pointer">Chains</div>
            </div>
            <div className="table">
                <div className="th">
                    <div className="td">#<SortArrow sort={sort} column="id" /></div>
                    <div className="td">Collectible<SortArrow sort={sort} column="collectible" /></div>
                    <div className="td">Price Floor<SortArrow sort={sort} column="pricefloor" /></div>
                    <div className="td">24h%<SortArrow sort={sort} column="percentage" /></div>
                    <div className="td">Volumn(24h)<SortArrow sort={sort} column="volumn" /></div>
                    <div className="td">Sales(24h)<SortArrow sort={sort} column="sales" /></div>
                    <div className="td">Listed/Supply Ratio<SortArrow sort={sort} column="ratio" /></div>
                    <div className="td">Market Cap<SortArrow sort={sort} column="marketcap" /></div>
                </div>
                {pagedata.map((nft, id) => (
                    <div className="tr" key={id}>
                        <div className="td">
                            <div>
                                <img alt="star" onClick={(e) => { addToFavourites(e, id) }} width="20px" src={`img/icons/star${nft.stared ? '-filled' : ''}.svg`} />
                            </div>
                            <div>{nft.id + 1}</div>
                        </div>
                        <div className="td">
                            <img alt="token" src={nft.img} />
                            <h5>{nft.collectible}</h5>
                            <button className="chart-button">Charts&nbsp;<i className="fa-sharp fa-solid fa-arrow-up"></i></button>
                        </div>
                        <div className="td">
                            <img src={Ether} alt="ether" />
                            {nft.pricefloor}
                        </div>
                        <div className="td">
                            {
                                nft.percentage > 0 ?
                                    (<span className="green">+{nft.percentage}%</span>) :
                                    (<span className="red">{nft.percentage}%</span>)
                            }
                        </div>
                        <div className="td">
                            <img src={Ether} alt="ether" />
                            {nft.volumn}
                        </div>
                        <div className="td">
                            {nft.sales}
                        </div>
                        <div className="td">
                            {nft.ratio}
                        </div>
                        <div className="td">
                            <img src={Ether} alt="ether" />
                            {nft.marketcap}
                        </div>
                    </div>))}
            </div>
            <div className="pagination">
                <div className="arrows">
                    <div className={`border-but ${pagenum == 1 && "disable"}`} onClick={() => { pagenum > 1 && setPagenum(pagenum - 1) }}><i className="fa-sharp fa-solid fa-angle-left"></i></div>
                    <div className={`border-but ${pagenum == pagecount && "disable"}`} onClick={() => { pagenum < pagecount && setPagenum(pagenum + 1) }}><i className="fa-sharp fa-solid fa-angle-right"></i></div>
                </div>
                <span>Rows per page</span>
                <select className="border-but select" onChange={(e) => { setCount(e.target.value) }}>
                    <option>10</option>
                    <option>15</option>
                    <option>20</option>
                </select>
                <div className="item-num">{count * (pagenum - 1) + 1} - {pagenum == pagecount ? nftcollection.length : count * pagenum}  of {nftcollection.length} items</div>
            </div>
        </div>
    )
};
export default NFTTable;