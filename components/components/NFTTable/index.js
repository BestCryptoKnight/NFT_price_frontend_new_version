import SortArrow from "./SortArrow";
// import { tabledata } from './tabledata';
import { memo, useEffect, useState } from "react";
import { numFormatter, numberWithCommas } from "../../../utils/customFunctions";
import { useRouter } from "next/router";
import Link from 'next/link';
const Ether = "img/icons/vector.svg";
import FadeIn from "react-fade-in";

const NFTTable = ({ tabledata, priceUSD, dataChain }) => {

    const NavLink = props => (
        <Link{...props}>
            <a id={props.id}>
                {props.children}
            </a>
        </Link>
    );

    const [topCollections_active, setTopCollections_active] = useState('');

    const [topCollections_, setTopCollections_] = useState([]);

    const [isTopCollections_, setIsTopCollections_] = useState(false);

    const [dollar, setDollar] = useState(false);

    const [time, setTime] = useState("24h");

    const [pagenum, setPagenum] = useState(1);
    //number of tokes per page
    const [count, setCount] = useState(10);
    //token data per page
    const [pagedata, setPagedata] = useState([]);
    //number of pages
    const [pagecount, setPagecount] = useState(0);

    const [nftcollection, setNftcollection] = useState(tabledata);

    const [filtered, setFiltered] = useState([]);

    const handleTimeChange = (e) => {
        setTime(e.target.value);
        if (e.target.value == "7d") {
            setNftcollection(tabledata.map((nft, index) => {
                const newNFT = { ...nft };
                newNFT.percentage = nft.percentage_7;
                newNFT.sales = nft.sales_7;
                newNFT.volumn = nft.volumn_7;
                return newNFT;
            }));
        } else if (e.target.value == "30d") {
            setNftcollection(tabledata.map((nft, index) => {
                const newNFT = { ...nft };
                newNFT.percentage = nft.percentage_30;
                newNFT.sales = nft.sales_30;
                newNFT.volumn = nft.volumn_30;
                return newNFT;
            }));
        } else setNftcollection(tabledata);
    };

    useEffect(() => {
        let beginningNum = count * (pagenum - 1);
        let endingNum = count * pagenum;
        setPagedata(nftcollection.slice(beginningNum, endingNum));
        setPagecount(Math.ceil(nftcollection.length / count));
    }, [pagenum, count, nftcollection]);

    const toggle = (e) => {
        let lefts = [[40, 67], [26, 56]];
        let pointer = document.getElementById("pointer");
        let south = document.getElementsByClassName("south")[0];
        let north = document.getElementsByClassName("north")[0];
        let colors = ["#ffffff33", "#1053FF"];
        let mobile = 0;
        if (window.innerWidth <= 768) mobile = 1;
        let Case = 1;
        if (e.target.id == "south") {
            if (pointer.style.left == lefts[mobile][0] + "px") return;
            pointer.style.left = lefts[mobile][0] + "px";
        }
        else {
            if (pointer.style.left == lefts[mobile][1] + "px") return;
            pointer.style.left = lefts[mobile][1] + "px";
            Case = 0;
        }
        south.style.backgroundColor = colors[Case];
        north.style.backgroundColor = colors[1 - Case]
        setDollar(!dollar);
        if (!dollar) {
            setNftcollection(tabledata.map((nft, index) => {
                const newNFT = { ...nft };
                newNFT.pricefloor = nft.pricefloor * priceUSD;
                newNFT.volumn = nft.volumn * priceUSD;
                newNFT.marketcap = nft.marketcap * priceUSD;
                return newNFT;
            }));
        } else setNftcollection(tabledata);

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

    const filter = () => {
        if (filtered.includes("star")) {
            setNftcollection(tabledata);
            setFiltered([]);
        }
        else {
            setNftcollection(nftcollection.filter(token => token.stared));
            setFiltered(["star"]);
        }
    }
    const AddChainsFilterData_ = (index, item) => {
        setIsTopCollections_(true);
        setTopCollections_active(item);
        let newArray = tabledata.filter(function (el) {
            return el.chain == item;
        });
        setNftcollection(newArray);
    }

    const AllAddChainsFilterData_ = (item) => {
        setTopCollections_active(item);
        setNftcollection(tabledata);
    }

    const navigateTo = (link) => {
        navigate.push(link);
        // window.open(link);
    };
    const navigate = useRouter();

    return (
        <div className='nfttable'>
            <div className="nft-settings">
                <select
                    className="border-but select"
                    value={time}
                    onChange={handleTimeChange}
                >
                    <option value={"24h"}>24h</option>
                    <option value={"7d"}>7d</option>
                    <option value={"30d"}>30d</option>
                </select>
                <div className="border-but toggle">
                    <div className="toggle-pointer" id="pointer"></div>
                    <div className="south">
                        <i className="fab fa-ethereum" style={{ color: "white" }}></i>
                    </div>
                    <div className="toggle-bar"></div>
                    <div className="north"><i className="fa-sharp fa-solid fa-dollar-sign"></i></div>
                    <div className="south-area" id="south" onClick={toggle}></div>
                    <div className="north-area" id="north" onClick={toggle}></div>
                </div>
            </div>
            <div className="nft-buttons">
                <div className="border-but pointer" onClick={filter}><img alt="star" className="star" src="img/icons/bluestar.svg" /></div>
                {/* <div className="border-but pointer">Categories</div> */}
                {/* <div className="border-but pointer">Collection</div> */}
                {/* <div className="border-but pointer hidden-mobile">Creactors</div> */}
                <div className="border-but pointer">

                    <div className="" style={{ position: 'relative' }}>
                        <button className="btn_table" >
                            Chains
                            <div className={`filter-list-body`}>
                                <div className="" style={{ position: 'relative' }}>
                                    <div onClick={() => AllAddChainsFilterData_('All')} className={`name`}>
                                        All
                                    </div>
                                    {topCollections_active === "All" ?
                                        <div className="" style={{ color: 'white', position: 'absolute', right: '15px', top: '5px' }}>✔</div>
                                        : <></>
                                    }
                                </div>
                                {dataChain.map((item, index) => (

                                    <div key={index} className="" style={{ position: 'relative' }}>
                                        <div className={`name`} onClick={() => AddChainsFilterData_(index, item)}>{item}
                                        </div>
                                        {topCollections_active === item ?
                                            <div className="" style={{ color: 'white', position: 'absolute', right: '15px', top: '5px' }}>✔</div>
                                            : <></>
                                        }
                                    </div>
                                ))}
                            </div>
                        </button>
                    </div>
                </div>

            </div>
            <div className="table">
                <div className="th">
                    <div className="td">#<SortArrow sort={sort} column="id" /></div>
                    <div className="td">Collectible<SortArrow sort={sort} column="collectible" /></div>
                    <div className="td">Price Floor<SortArrow sort={sort} column="pricefloor" /></div>
                    <div className="td hidden-mobile">{time}%<SortArrow sort={sort} column="percentage" /></div>
                    <div className="td">Volumn({time})<SortArrow sort={sort} column="volumn" /></div>
                    <div className="td hidden-mobile">Sales({time})<SortArrow sort={sort} column="sales" /></div>
                    <div className="td hidden-mobile">Listed/Supply Ratio<SortArrow sort={sort} column="ratio" /></div>
                    <div className="td hidden-mobile">Market Cap<SortArrow sort={sort} column="marketcap" /></div>
                </div>
                <FadeIn>
                    {pagedata.map((nft, id) => (
                        <div className="tr" key={id}>
                            <div className="td">
                                <div>
                                    <img alt="star" onClick={(e) => { addToFavourites(e, id) }} className="star" src={`img/icons/star${nft.stared ? '-filled' : ''}.svg`} />
                                </div>
                                <div>{nft.id + 1}</div>
                            </div>
                            <div className="td align-center">
                                <img alt="token" className="avatar" src={nft.img} />
                                <NavLink href={`/collections/${nft.slug}`}>
                                    <h5>{nft.collectible}</h5>
                                </NavLink>
                                {/* <button className="chart-button hidden-mobile" onClick={() => navigateTo(`/collections/${nft.slug}`)}>
                                Charts&nbsp;<i className="fa-sharp fa-solid fa-arrow-up"></i>
                            </button> */}
                            </div>
                            <div className="td ">
                                {
                                    (dollar) ?
                                        <>
                                            ${numFormatter(nft.pricefloor)}
                                        </> :
                                        <>
                                            <img src={Ether} alt="ether" />
                                            {numFormatter(nft.pricefloor)}
                                        </>
                                }
                            </div>
                            <div className="td hidden-mobile">
                                {
                                    nft.percentage > 0 ?
                                        (<span className="green">+{numFormatter(nft.percentage)}%</span>) :
                                        (<span className="red">{numFormatter(nft.percentage)}%</span>)
                                }
                            </div>
                            <div className="td ">
                                {
                                    (dollar) ?
                                        <>
                                            ${numFormatter(nft.volumn)}
                                        </> :
                                        <>
                                            <img src={Ether} alt="ether" />
                                            {numFormatter(nft.volumn)}
                                        </>
                                }
                            </div>
                            <div className="td hidden-mobile">
                                {numFormatter(nft.sales)}
                            </div>
                            <div className="td hidden-mobile">
                                {nft.ratio_pecentage}
                            </div>
                            <div className="td hidden-mobile">
                                {
                                    (dollar) ?
                                        <>
                                            ${numFormatter(nft.marketcap)}
                                        </> :
                                        <>
                                            <img src={Ether} alt="ether" />
                                            {numFormatter(nft.marketcap)}
                                        </>
                                }
                            </div>
                        </div>))}
                </FadeIn>
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
export default memo(NFTTable);