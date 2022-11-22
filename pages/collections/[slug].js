import React, { useEffect, useState } from "react";
import { server } from "../../components/core/api";
import { Axios } from "../../components/core/axios";
import { useRouter } from "next/router";
import Head from "next/head";
import { numFormatter, numberWithCommas, dateWithCustom } from "../../utils/customFunctions";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import * as selectors from "../../components/store/selectors";
import { fetchTopCollectionsPrevNext } from "../../components/store/actions/thunks/topCollections";
import Link from "next/link";
import Chart from "../../components/components/ChartSale/Chart";
import FadeIn from "react-fade-in";

const getDays = (val) => {
    var given = moment(val);
    var current = moment();

    //Difference in number of days
    return current.diff(given, 'days');
};

const shortAddr = (fullAddr) => {
    return fullAddr.slice(0, 10) + "...";
}

const outEtherVal = (value) => {
    return value / (10 ** 18).toFixed(2);
}

const NavLink = props => (
    <Link{...props}>
        <a id={props.id}>
            {props.children}
        </a>
    </Link>
);

const Collections = ({
    serverCollection,
    salesData,
    priceAPIData,
    nftList
}) => {

    const dispatch = useDispatch();
    const router = useRouter();
    const Links = serverCollection.data[0].links;
    const collectionName = serverCollection.data[0].data.name;
    const collectionCreatedData = serverCollection.data[0].data.created_date;
    const collectionTotalSupply = serverCollection.data[0].data.stats.total_supply;
    const collectionDescription = serverCollection.data[0].data.description;
    const collectionFloorPrice = serverCollection.data[0].data.stats.floor_price ? serverCollection.data[0].data.stats.floor_price : "NAN";
    const collectionTotalVolumn = serverCollection.data[0].data.stats.total_volume;
    const collectionOneDayVolumn = serverCollection.data[0].data.stats.one_day_volume;
    const collectionAveragePrice = serverCollection.data[0].data.stats.average_price;
    const collectionAveragePrice1d = serverCollection.data[0].data.stats.one_day_average_price;
    const collectionAveragePrice7d = serverCollection.data[0].data.stats.seven_day_average_price;
    const collectionAveragePrice30d = serverCollection.data[0].data.stats.thirty_day_average_price;
    const collectionOwners = serverCollection.data[0].data.stats.num_owners;
    const one_day_sales = serverCollection.data[0].data.stats.one_day_sales;
    const thirty_day_sales = serverCollection.data[0].data.stats.thirty_day_sales;
    const collection = serverCollection.data[0].data;
    const [showMore, setShowMore] = useState(false);
    const [time, setTime] = useState("24h");
    const [averagePrice, setAveragePrice] = useState(collectionAveragePrice1d);
    const [dollar, setDollar] = useState(false);
    const [nfts, setNfts] = useState(nftList.data.slice(0, 4));
    const { slug } = router.query;

    const navigate = useRouter();
    const navigateTo = (link) => {
        navigate.push(link);
    };

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
        north.style.backgroundColor = colors[1 - Case];
        setDollar(!dollar);
    }

    const handleTimeChange = (e) => {
        setTime(e.target.value);
        if (e.target.value == "7d")
            setAveragePrice(collectionAveragePrice7d);
        else if (e.target.value == "30d")
            setAveragePrice(collectionAveragePrice30d);
        else
            setAveragePrice(collectionAveragePrice1d);
    }

    const [count, setCount] = useState(1);

    const handleLoadMore = () => {
        setCount(count + 1);
        setNfts([...nfts, ...nftList.data.slice(count * 4, (count + 1) * 4)]);
    }

    return (
        <div>
            <Head>
                {collection && (
                    <title>{`${collectionName}`} NFT Floor Price & Stats</title>
                )}
                {collection && (
                    <meta
                        name="title"
                        content={`${collectionName} NFT Floor Price & Stats`}
                    ></meta>
                )}
            </Head>
            <section className="container no-bottom detail-container">

                <div className="session-1">
                    <div className="opt-btn-group">
                        <div className="border-btn">
                            <NavLink href="/">
                                <i className="fas fa-arrow-left"></i>
                            </NavLink>
                        </div>
                        <div className="dis-flex gap-10">
                            <select
                                className="border-btn select"
                                value={time}
                                onChange={handleTimeChange}
                            >
                                <option value={"24h"}>24h</option>
                                <option value={"7d"}>7d</option>
                                <option value={"30d"}>30d</option>
                            </select>
                            <div className="border-btn toggle">
                                <div className="toggle-pointer" id="pointer"></div>
                                <div className="south">
                                    <i className="fab fa-ethereum"></i>
                                </div>
                                <div className="toggle-bar"></div>
                                <div className="north"><i className="fa-sharp fa-solid fa-dollar-sign"></i></div>
                                <div className="south-area" id="south" onClick={toggle}></div>
                                <div className="north-area" id="north" onClick={toggle}></div>
                            </div>
                        </div>
                    </div>
                    <div className="content-box dis-flex-col">
                        <div className="dis-flex">
                            <div className="">
                                <img
                                    className="img-width"
                                    src={collection.image_url}
                                    alt=""
                                />
                                <div className="rank-btn mobile-show mt-2">
                                    <span className="text-grey-font">Rank</span>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <span className="bold-font">#3</span>
                                </div>
                            </div>
                            <div className="content-sub-box w-100">
                                <div className="icons-group mobile-hide">
                                    <NavLink href={collection.external_url ? collection.external_url : ""}>
                                        <img src={"/img/icons/social1.png"} alt="" className="icon-general" />
                                    </NavLink>
                                    <NavLink href={`https://twitter.com/${collection.twitter_username}`}>
                                        <img src="/img/icons/social2.png" alt="" className="icon-general" />
                                    </NavLink>
                                    <NavLink href={collection.discord_url ? collection.discord_url : ""}>
                                        <img src="/img/icons/social3.png" alt="" className="icon-general" />
                                    </NavLink>
                                    {/* <NavLink href={collection.discord_url ? collection.discord_url : ""}>
                                        <img src="/img/icons/social4.png" alt="" className="icon-general" />
                                    </NavLink> */}
                                    {/* <div className="vertical-line"></div>
                                    <img src="/img/icons/star-line.png" alt="" className="icon-general" />
                                    <img src="/img/icons/share-fill.png" alt="" className="icon-general" />
                                    <img src="/img/icons/menu.png" alt="" className="icon-menu" /> */}
                                </div>
                                <div className="">
                                    <div className="bold-font">
                                        {collectionName}
                                    </div>
                                    <div className=" mt-2">
                                        <span className="text-font-2">by</span>
                                        &nbsp;
                                        <span className="text-font-1">
                                            Yuga Labs
                                        </span>
                                        &nbsp;
                                        <img src="/img/verify 8.png" alt="" className="" />
                                    </div>
                                </div>
                                <div className="d-flex flex-column flex-md-row gap-10 mt-4">
                                    <div className="d-flex gap-10 ">
                                        <div className="">
                                            <div className="d-flex gap-10 flex-column flex-md-row">
                                                <div className=" order-md-2 order-sm-1">
                                                    <span className="bold-font">{collectionTotalSupply}</span>
                                                </div>
                                                <div className=" order-md-1 order-sm-2">
                                                    <span className="text-grey-font">Items Supply</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="straight-line mobile-hide"></div>
                                        <div className="">
                                            <div className="d-flex gap-10 flex-column flex-md-row">
                                                <div className="order-md-2 order-sm-1">
                                                    <span className="bold-font">{dateWithCustom(collectionCreatedData)}</span>
                                                </div>
                                                <div className="order-md-1 order-sm-2">
                                                    <span className="text-grey-font">Created</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="straight-line mobile-hide"></div>
                                    </div>
                                    <div className="linear-line mobile-show"></div>
                                    <div className="linear-vertical-line mobile-show"></div>

                                    <div className="d-flex gap-10">

                                        {/* <div className="">
                                            <div className="d-flex gap-10 flex-column flex-md-row">
                                                <div className="order-md-2 order-sm-1">
                                                    <span className="bold-font">2.5%</span>
                                                </div>
                                                <div className="order-md-1 order-sm-2">
                                                    <span className="text-grey-font">Creator's Fee</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="straight-line mobile-hide"></div> */}
                                        <div className="">
                                            <div className="d-flex gap-10 flex-column flex-md-row">
                                                <div className="order-md-2 order-sm-1">
                                                    <span className="bold-font">Ethereum</span>
                                                </div>
                                                <div className="order-md-1 order-sm-2">
                                                    <span className="text-grey-font">Network</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="linear-line mobile-hide"></div>

                            </div>
                        </div>
                        <div className="dis-flex mt-3 gap-3">
                            <div className="rank-btn mobile-hide">
                                <span className="text-grey-font">Rank</span>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <span className="bold-font">#3</span>
                            </div>
                            <div className="dis-flex-col w-100">
                                <div className="">
                                    <span className="text-font">
                                        {
                                            showMore
                                                ? collectionDescription
                                                : `${collectionDescription.substring(0, 160)}`
                                        }
                                    </span>
                                    &nbsp;&nbsp;
                                    <span className="text-color-font" onClick={() => setShowMore(!showMore)}>
                                        {
                                            showMore
                                                ? <>See less &nbsp;<i className="fas fa-chevron-up"></i></>
                                                : <>See more&nbsp;<i className="fas fa-chevron-down"></i></>
                                        }


                                    </span>

                                </div>
                                <div className="icons-group-1 mobile-show">
                                    <NavLink href={collection.external_url ? collection.external_url : ""}>
                                        <img src={"/img/icons/social1.png"} alt="" className="icon-general" />
                                    </NavLink>
                                    <NavLink href={`https://twitter.com/${collection.twitter_username}`}>
                                        <img src="/img/icons/social2.png" alt="" className="icon-general" />
                                    </NavLink>
                                    <NavLink href={collection.discord_url ? collection.discord_url : ""}>
                                        <img src="/img/icons/social3.png" alt="" className="icon-general" />
                                    </NavLink>
                                    {/* <img src="/img/icons/social4.png" alt="" className="icon-general" /> */}
                                    {/* <div className="vertical-line"></div>
                                    <img src="/img/icons/star-line.png" alt="" className="icon-general" />
                                    <img src="/img/icons/share-fill.png" alt="" className="icon-general" />
                                    <img src="/img/icons/menu.png" alt="" className="icon-menu" /> */}
                                </div>
                                <div className="dis-flex mt-2 mobile-hide">
                                    <div className="flex-auto text-center">
                                        <div className="bold-color-font">
                                            {
                                                dollar
                                                    ?
                                                    <>
                                                        ${numFormatter(collectionFloorPrice * priceAPIData.data.USD)}
                                                    </>
                                                    :
                                                    <>
                                                        <i className="fab fa-ethereum"></i>
                                                        {collectionFloorPrice}
                                                    </>
                                            }
                                        </div>
                                        <div className="text-font">Floor Price</div>
                                    </div>
                                    <div className="flex-auto text-center">
                                        <div className="bold-color-font">
                                            {
                                                dollar
                                                    ?
                                                    <>
                                                        ${numFormatter(collectionTotalVolumn * priceAPIData.data.USD)}
                                                    </>
                                                    :
                                                    <>
                                                        <i className="fab fa-ethereum"></i>
                                                        {numFormatter(collectionTotalVolumn)}
                                                    </>
                                            }
                                        </div>
                                        <div className="text-font">Total Volumn</div>
                                    </div>
                                    <div className="flex-auto text-center">
                                        <div className="bold-color-font">
                                            {
                                                dollar
                                                    ?
                                                    <>
                                                        ${numFormatter(averagePrice * priceAPIData.data.USD)}
                                                    </>
                                                    :
                                                    <>
                                                        <i className="fab fa-ethereum"></i>
                                                        {numFormatter(averagePrice)}
                                                    </>
                                            }
                                        </div>
                                        <div className="text-font">Average Price</div>
                                    </div>
                                    {/* <div className="flex-auto text-center">
                                        <div className="bold-color-font">Avatar</div>
                                        <div className="text-font">Category</div>
                                    </div> */}
                                    {/* <div className="flex-auto text-center">
                                        <div className="bold-color-font">18%</div>
                                        <div className="text-font">Listed</div>
                                    </div> */}
                                    <div className="flex-auto text-center">
                                        <div className="bold-color-font">{collectionOwners}</div>
                                        <div className="text-font">Owners</div>
                                    </div>
                                    {/* <div className="flex-auto text-center">
                                        <div className="bold-color-font">63.98%</div>
                                        <div className="text-font">Unique Owners</div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" mobile-show w-100">
                    <div className="d-flex mt-2 content-box w-100">
                        {/* <div className="d-flex"> */}
                        <div className="flex-auto text-center">
                            <div className="bold-color-font">
                                {
                                    dollar
                                        ?
                                        <>
                                            ${numFormatter(collectionFloorPrice * priceAPIData.data.USD)}
                                        </>
                                        :
                                        <>
                                            <i className="fab fa-ethereum"></i>
                                            {collectionFloorPrice}
                                        </>
                                }
                            </div>
                            <div className="text-font">Floor Price</div>
                        </div>
                        <div className="flex-auto text-center">
                            <div className="bold-color-font">
                                {
                                    dollar
                                        ?
                                        <>
                                            ${numFormatter(collectionTotalVolumn * priceAPIData.data.USD)}
                                        </>
                                        :
                                        <>
                                            <i className="fab fa-ethereum"></i>
                                            {numFormatter(collectionTotalVolumn)}
                                        </>
                                }
                            </div>
                            <div className="text-font">Total Volumn</div>
                        </div>
                        <div className="flex-auto text-center">
                            <div className="bold-color-font">
                                {
                                    dollar
                                        ?
                                        <>
                                            ${numFormatter(averagePrice * priceAPIData.data.USD)}
                                        </>
                                        :
                                        <>
                                            <i className="fab fa-ethereum"></i>
                                            {numFormatter(collectionAveragePrice)}
                                        </>
                                }
                            </div>
                            <div className="text-font">Average Price</div>
                        </div>
                        {/* <div className="flex-auto text-center">
                                <div className="bold-color-font">Avatar</div>
                                <div className="text-font">Category</div>
                            </div> */}
                        {/* </div> */}
                        {/* <div className="d-flex"> */}

                        {/* <div className="flex-auto text-center">
                                <div className="bold-color-font">18%</div>
                                <div className="text-font">Listed</div>
                            </div> */}
                        <div className="flex-auto text-center">
                            <div className="bold-color-font">{collectionOwners}</div>
                            <div className="text-font">Owners</div>
                        </div>
                        {/* <div className="flex-auto text-center">
                                <div className="bold-color-font">63.98%</div>
                                <div className="text-font">Unique Owners</div>
                            </div> */}
                        {/* </div> */}
                    </div>
                </div>

                <div className="mt-4">
                    {salesData.data.length ? <Chart sales={salesData.data} /> : <></>}

                </div>
                <div className="">
                    <div className="">
                        <h1 className="gradient-font tac w10 mt-5 mb-5">
                            Sales Activity
                        </h1>
                    </div>
                    <div className="dis-flex-col ttable">
                        <FadeIn>
                            {
                                nfts.map((nft, index) => (

                                    <div className="trr" key={index}>
                                        <div className="tdd">
                                            <img src={nft.data.image_url} alt="" className="imgg" />
                                            <h5 className="ml-2 img-text">#{nft.data.token_id}</h5>
                                        </div>
                                        <div className="tdd tac">
                                            <h6><i className="fab fa-ethereum"></i> &nbsp;{outEtherVal(nft.data.last_sale.total_price)}</h6>
                                        </div>
                                        <div className="tdd">
                                            <h6>{nft.data.last_sale?.created_date ? getDays(nft.data.last_sale?.created_date) : '--'} days ago</h6>
                                        </div>
                                        <div className="tdd tac">
                                            <h6 >{shortAddr(nft.data.owner.address)} <i className="fas fa-chevron-right primary-color"></i>&nbsp;&nbsp; 1-ether.eth </h6>
                                        </div>
                                    </div>
                                ))
                            }
                        </FadeIn>

                    </div>
                </div>
                <div className="justify mt-4">
                    <div
                        className="load-btn"
                        onClick={handleLoadMore}
                    >
                        Load More
                    </div>
                </div>
                <div className="res-mt7">
                    <h1 className="gradient-font tac w10">
                        About
                    </h1>
                </div>
                <div className="session-3">
                    <div className="sub-title-font ppadding">
                        {collectionName} price floor and sales live data
                    </div>
                    <div className="text-font ppadding">
                        The current price floor of {collectionName} is {numFormatter(collectionFloorPrice)} ETH and the 24 hour trading volume is {numFormatter(collectionOneDayVolumn)} ETH with {one_day_sales} sales. In the last 24 hours, the price floor of {collectionName} is down 3.33%. The 7D average sale price is 79.429 ETH, the 7D highest sale price is 120.61 ETH and the 7D lowest sale price is 9.00 ETH. The project is currently ranked #1 in NFT Price Floor with a floor cap of 694,100 ETH. It has a listed ratio of 8.23% and a max supply of 10,000.
                        {collectionName} is an NFT collectible created by Yuga Labs that was released on 4-22-2021. The project consists of 10,000 unique digital items living on the Ethereum blockchain. We categorize it as a pfp/avatar project and it's part of the Yuga Labs general collection.
                    </div>
                    <div className="buttom-background ppadding">

                        <div className="sub-title-font res-pt2">
                            What is {collectionName}?
                        </div>
                        <div className="text-font res-pt2">
                            {collectionName} is, along with CryptoPunks, one of the most popular digital collectibles in NFT format on Ethereum. If CryptoPunks can be considered the genesis of the PFP (profile picture) concept applied to collectible digital assets that take the form of non-fungible tokens, {collectionName} represents the refinement of this concept through a series of innovations.
                        </div>
                        <div className="justify">
                            <div className="fload-btn">
                                Load More
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export async function getServerSideProps({ params }) {
    const res = await fetch(
        `${server.baseUrl}${server.collections}/getCollectionDetail/${params.slug}`,
        {
            method: "GET", // or 'PUT'
            headers: {
                [`${server.header.key}`]: `${server.header.value}`,
            },
        }
    );

    const priceAPIRequest = await fetch(
        `${server.baseUrl}/get-eth-stats`,
        {
            method: "GET", // or 'PUT'
            headers: {
                [`${server.header.key}`]: `${server.header.value}`,
            },
        }
    );

    const salesDataAPIRequest = await fetch(
        `${server.baseUrl}/collection/getSalesData/${params.slug}/all`,
        {
            method: "GET", // or 'PUT'
            headers: {
                [`${server.header.key}`]: `${server.header.value}`,
            },
        }
    );
    // const nftListAPIRequest = await fetch(
    //     `${server.baseUrl}/nft/getNfts/${params.slug}/${page}/12`,
    //     {
    //         method: "GET", // or 'PUT'
    //         headers: {
    //             [`${server.header.key}`]: `${server.header.value}`,
    //         },
    //     }
    // );
    const nftListAPIRequest = await fetch(
        `${server.baseUrl}/nft/getLatestSaleNfts/${params.slug}`,
        {
            method: "GET", // or 'PUT'
            headers: {
                [`${server.header.key}`]: `${server.header.value}`,
            },
        }
    );

    const serverCollection = await res.json();
    const priceAPIData = await priceAPIRequest.json();
    const salesData = await salesDataAPIRequest.json();
    const nftList = await nftListAPIRequest.json();
    if (serverCollection.data.length === 0) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }
    return {
        props: {
            serverCollection,
            salesData,
            priceAPIData,
            nftList
        },
    };
}

export default Collections;
