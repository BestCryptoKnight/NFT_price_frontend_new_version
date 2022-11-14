import React, { useEffect, useState } from "react";
import { server } from "../../components/core/api";
import { Axios } from "../../components/core/axios";
import { useRouter } from "next/router";
import Head from "next/head";
import { numFormatter, numberWithCommas } from "../../utils/customFunctions";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import * as selectors from "../../components/store/selectors";
import { fetchTopCollectionsPrevNext } from "../../components/store/actions/thunks/topCollections";
import Link from "next/link";
import Chart from "../../components/components/ChartSale/Chart";



const Collections = ({
    serverCollection,
    resHighestLowestValues,
    twitterChartData,
    salesData,
    discardData,
    priceAPIData,
    slugsData
}) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const Links = serverCollection.data[0].links;
    const collectionName = serverCollection.data[0].data.name;
    const collectionOwners = serverCollection.data[0].data.stats.num_owners;
    const thirty_day_sales = serverCollection.data[0].data.stats.thirty_day_sales;
    const collection = serverCollection.data[0].data;
    const [prevCollection, setPrevCollection] = useState({});
    const [nextCollection, setNextCollection] = useState({});

    const { slug } = router.query;

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const time = localStorage.getItem("collection_time");
                const data2 = await Axios.get(
                    `${server.baseUrl}${server.collections}/getPageLinkSlugs/${time === null ? "1d" : time
                    }`,
                    {
                        params: {},
                        headers: {
                            [`${server.header.key}`]: `${server.header.value}`,
                        },
                    }
                );
                const slugs = data2.data.data;
                for (let i = 0; i < slugs.length; i++) {
                    if (slugs[i].Slug === slug) {
                        //If the collection is first one
                        if (i === 0) {
                            setPrevCollection(null);
                            setNextCollection(slugs[i + 1]);
                        }
                        //If collection is last
                        else if (i === slugs.length - 1) {
                            setNextCollection(null);
                            setPrevCollection(slugs[i - 1]);
                        }
                        //If collection in middle
                        else {
                            setNextCollection(slugs[i + 1]);
                            setPrevCollection(slugs[i - 1]);
                        }
                        break;
                    }
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchStats();
    }, [slug]);
    const [l1, setL1] = useState(0);
    const [l2, setL2] = useState(0);
    const [l3, setL3] = useState(0);
    const [percentileMonitoring, setPercentileMonitoring] = useState(0);
    useEffect(() => {
        setL1(localStorage.getItem('percentile10'));
        setL2(localStorage.getItem('percentile50'));
        setL3(localStorage.getItem('percentile90'));
    }, [percentileMonitoring])

    const [nftNumber, setNftNumber] = useState(0);
    const [tradingVolumn, setTradingVolumn] = useState(0);
    const [averageSale, setAverageSale] = useState(0);
    const [period, setPeriod] = useState("7d");
    const [floorusdprice, setfloorusdprice] = useState();

    useEffect(() => {
        dispatch(fetchTopCollectionsPrevNext(slug));
    }, [dispatch, slug]);

    const latest_sale_total_price =
        serverCollection.latestsale != null
            ? serverCollection.latestsale.total_price / Math.pow(10, serverCollection.latestsale.payment_token.decimals)
            : null;
    const latest_sale_date =
        serverCollection.latestsale != null
            ? moment(serverCollection.latestsale.created_date).format(
                "MMMM Do YYYY, h:mm:ss a"
            )
            : null;
    const latest_sale_token_id =
        serverCollection.latestsale != null
            ? serverCollection.latestsale.asset.token_id
            : null;
    const nft_Lowest_Price = numberWithCommas(
        numFormatter(parseInt(resHighestLowestValues.nft_Lowest_Price))
    );
    const nft_Highest_Price = numberWithCommas(
        !isNaN(numFormatter(parseInt(resHighestLowestValues.nft_Highest_Price))) ? numFormatter(parseInt(resHighestLowestValues.nft_Highest_Price)) : 0
    );
    const Median = (!isNaN(numberWithCommas(parseInt(numFormatter(resHighestLowestValues.Median))))) ? numberWithCommas(parseInt(numFormatter(resHighestLowestValues.Median))) : 0;

    const handlePrevCollection = () => {
        if (prevCollection?.Name)
            router.push(`/collections/${prevCollection.Slug}`);
    };

    const handleNextCollection = () => {
        if (nextCollection?.Name)
            router.push(`/collections/${nextCollection.Slug}`);
    };

    const arrTwitterChartData = [];
    const arrSalesChartData = [];
    const arrDiscardChartData = [];

    for (var i = 0; i < twitterChartData.data.length; i++) {
        let obj = {};
        obj.x = new Date(twitterChartData.data[i]["Date"]).getTime();
        obj.y = twitterChartData.data[i]["follower"];
        arrTwitterChartData.push(obj);
    }
    for (var i = 0; i < salesData.data.length; i++) {
        let obj = {};
        obj.x = new Date(salesData.data[i]["Date"]).getTime();
        obj.y = salesData.data[i]["price"];
        arrSalesChartData.push(obj);
    }
    for (var i = 0; i < discardData.data.length; i++) {
        let obj = {};
        obj.x = new Date(discardData.data[i]["Date"]).getTime();
        obj.y = discardData.data[i]["follower"];
        arrDiscardChartData.push(obj);
    }

    const percentileToUsd = (num) => {
        return num * priceAPIData.data.USD;
    }

    function floor_price_to_usd() {
        setfloorusdprice(priceAPIData.data.USD * collection?.stats?.floor_price)
    }

    const [switchcurrency, setswitchcurrency] = useState(false);
    const currencyToggle = () => {
        setswitchcurrency(current => !current);
    }

    const [switchcurrencytoeth, setswitchcurrencytoeth] = useState(true);
    const currencyToggletoeth = () => {
        setswitchcurrencytoeth(current => !current);
    }
    const [toggleClass, settoggleClass] = useState(true);
    const toogleicon = () => {

        settoggleClass(current => !current);
    };

    const handlePeriodChange = (e) => {
        setPeriod(e.target.value);
        let pp = e.target.value;
        if (pp == "1d") {
            setNftNumber(collection?.stats?.one_day_sales);
            setTradingVolumn(collection?.stats?.one_day_volume);
            setAverageSale(collection?.stats?.one_day_average_price);
        } else if (pp == "30d") {
            setNftNumber(collection?.stats?.thirty_day_sales);
            setTradingVolumn(collection?.stats?.thirty_day_volume);
            setAverageSale(collection?.stats?.thirty_day_average_price);
        } else {
            setNftNumber(collection?.stats?.seven_day_sales);
            setTradingVolumn(collection?.stats?.seven_day_volume);
            setAverageSale(collection?.stats?.seven_day_average_price);
        }
    }
    const navigate = useRouter();
    const navigateTo = (link) => {
        navigate.push(link);
    };

    const toggle = (e) => {
        let pointer = document.getElementById("pointer");
        let south = document.getElementsByClassName("south")[0];
        let north = document.getElementsByClassName("north")[0];
        let colors = ["#ffffff33", "#1053FF"];
        let Case = 1;
        if (e.target.id == "south") {
            pointer.style.left = "40px";
        }
        else {
            pointer.style.left = "67px";
            Case = 0;
        }
        south.style.backgroundColor = colors[Case];
        north.style.backgroundColor = colors[1 - Case]
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
                            <i className="fas fa-arrow-left"></i>
                        </div>
                        <div className="dis-flex">
                            <select className="border-btn select">
                                <option>24h</option>
                                <option>12h</option>
                                <option>6h</option>
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
                    <div className="content-box .dis-flex-col">
                        <div className="dis-flex">
                            <div className="">
                                <img
                                    className="img-width"
                                    src={collection.image_url}
                                    alt=""
                                ></img>
                            </div>
                            <div className="content-sub-box w-100">
                                <div className="">
                                    <div className="bold-font">
                                        {collectionName}
                                    </div>
                                    <div className="text-font-1 mt-2">
                                        <span className="text-font-2">by</span>
                                        &nbsp;Yuga Labs&nbsp;
                                        <img src="/img/verify 8.png" alt="" className="" />
                                    </div>
                                </div>
                                <div className="dis-flex mt-4">
                                    <div className="flex-auto">
                                        <span className="text-grey-font">Items Supply</span>
                                        &nbsp;&nbsp;<span className="bold-font">10,000</span>
                                    </div>
                                    <div className="straight-line flex-auto"></div>
                                    <div className="flex-auto">
                                        <span className="text-grey-font">Items Supply</span>
                                        &nbsp;&nbsp;<span className="bold-font">10,000</span>
                                    </div>
                                    <div className="straight-line flex-auto"></div>
                                    <div className="flex-auto">
                                        <span className="text-grey-font">Items Supply</span>
                                        &nbsp;&nbsp;<span className="bold-font">10,000</span>
                                    </div>
                                    <div className="straight-line flex-auto"></div>
                                    <div className="flex-auto">
                                        <span className="text-grey-font">Items Supply</span>
                                        &nbsp;&nbsp;<span className="bold-font">10,000</span>
                                    </div>
                                </div>
                                <div className="linear-line"></div>
                            </div>
                        </div>
                        <div className="dis-flex mt-3 gap-3">
                            <div className="rank-btn">
                                <span className="text-grey-font">Rank</span>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <span className="bold-font">#3</span>
                            </div>
                            <div className="dis-flex-col ">
                                <div className="">
                                    <span className="text-font">
                                        The Bored Ape Yacht Club is a collection of 10,000 unique Bored Ape NFTs— unique digital collectibles living on the Ethereum blockchain. Your Bored Ape doubles
                                    </span>
                                    &nbsp;&nbsp;
                                    <span className="text-color-font">
                                        See more&nbsp;<i className="fas fa-chevron-down"></i>
                                    </span>

                                </div>
                                <div className="dis-flex mt-2">
                                    <div className="flex-auto">
                                        <div className="bold-color-font">0.08</div>
                                        <div className="text-font">Mint price</div>
                                    </div>
                                    <div className="flex-auto">
                                        <div className="bold-color-font">0.08</div>
                                        <div className="text-font">Mint price</div>
                                    </div>
                                    <div className="flex-auto">
                                        <div className="bold-color-font">0.08</div>
                                        <div className="text-font">Mint price</div>
                                    </div>
                                    <div className="flex-auto">
                                        <div className="bold-color-font">0.08</div>
                                        <div className="text-font">Mint price</div>
                                    </div>
                                    <div className="flex-auto">
                                        <div className="bold-color-font">0.08</div>
                                        <div className="text-font">Mint price</div>
                                    </div>
                                    <div className="flex-auto">
                                        <div className="bold-color-font">0.08</div>
                                        <div className="text-font">Mint price</div>
                                    </div>
                                    <div className="flex-auto">
                                        <div className="bold-color-font">0.08</div>
                                        <div className="text-font">Mint price</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <Chart />
                </div>
                <div className="">
                    <div className="">
                        <h1 className="gradient-font tac w10 mt-5 mb-5">
                            Sales Activity
                        </h1>
                    </div>
                    <div className="dis-flex-col ttable">
                        <div className="trr">
                            <div className="tdd">
                                <img src="/img/token/1.png" alt="" className="imgg" />
                                <h5 className="ml-2">Bored Ape Yacht Club   #8765</h5>
                            </div>
                            <div className="tdd tac">
                                <h5><i className="fab fa-ethereum"></i> &nbsp; 12.7</h5>
                            </div>
                            <div className="tdd">
                                <h5>About 4 hours ago</h5>
                            </div>
                            <div className="tdd tac">
                                <h5 >0x6cfdad077... <i className="fas fa-chevron-right primary-color"></i>&nbsp;&nbsp; 1-ether.eth </h5>
                            </div>
                        </div>
                        <div className="trr">
                            <div className="tdd">
                                <img src="/img/token/2.png" alt="" className="imgg" />
                                <h5 className="ml-2">Bored Ape Yacht Club   #8765</h5>
                            </div>
                            <div className="tdd tac">
                                <h5><i className="fab fa-ethereum"></i> &nbsp; 12.7</h5>
                            </div>
                            <div className="tdd">
                                <h5>About 4 hours ago</h5>
                            </div>
                            <div className="tdd tac">
                                <h5 >0x6cfdad077... <i className="fas fa-chevron-right primary-color"></i>&nbsp;&nbsp; 1-ether.eth </h5>
                            </div>
                        </div>
                        <div className="trr">
                            <div className="tdd">
                                <img src="/img/token/3.png" alt="" className="imgg" />
                                <h5 className="ml-2">Bored Ape Yacht Club   #8765</h5>
                            </div>
                            <div className="tdd tac">
                                <h5><i className="fab fa-ethereum"></i> &nbsp; 12.7</h5>
                            </div>
                            <div className="tdd">
                                <h5>About 4 hours ago</h5>
                            </div>
                            <div className="tdd tac">
                                <h5 >0x6cfdad077... <i className="fas fa-chevron-right primary-color"></i>&nbsp;&nbsp; 1-ether.eth </h5>
                            </div>
                        </div>
                        <div className="trr">
                            <div className="tdd">
                                <img src="/img/token/4.png" alt="" className="imgg" />
                                <h5 className="ml-2">Bored Ape Yacht Club   #8765</h5>
                            </div>
                            <div className="tdd tac">
                                <h5><i className="fab fa-ethereum"></i> &nbsp; 12.7</h5>
                            </div>
                            <div className="tdd">
                                <h5>About 4 hours ago</h5>
                            </div>
                            <div className="tdd tac">
                                <h5 >0x6cfdad077... <i className="fas fa-chevron-right primary-color"></i>&nbsp;&nbsp; 1-ether.eth </h5>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="justify mt-4">
                    <div className="load-btn">
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
                        Bored Ape Yacht Club price floor and sales live data
                    </div>
                    <div className="text-font ppadding">
                        The current price floor of Bored Ape Yacht Club is 69.41 ETH and the 24 hour trading volume is 892.86 ETH with 13 sales. In the last 24 hours, the price floor of Bored Ape Yacht Club is down 3.33%. The 7D average sale price is 79.429 ETH, the 7D highest sale price is 120.61 ETH and the 7D lowest sale price is 9.00 ETH. The project is currently ranked #1 in NFT Price Floor with a floor cap of 694,100 ETH. It has a listed ratio of 8.23% and a max supply of 10,000.
                        Bored Ape Yacht Club is an NFT collectible created by Yuga Labs that was released on 4-22-2021. The project consists of 10,000 unique digital items living on the Ethereum blockchain. We categorize it as a pfp/avatar project and it's part of the Yuga Labs general collection.
                    </div>
                    <div className="buttom-background ppadding">

                        <div className="sub-title-font res-pt2">
                            What is Bored Ape Yacht Club?
                        </div>
                        <div className="text-font res-pt2">
                            Bored Ape Yacht Club is, along with CryptoPunks, one of the most popular digital collectibles in NFT format on Ethereum. If CryptoPunks can be considered the genesis of the PFP (profile picture) concept applied to collectible digital assets that take the form of non-fungible tokens, Bored Ape Yacht Club represents the refinement of this concept through a series of innovations.
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
    const resHighestLowest = await fetch(
        `${server.baseUrl}/nft/get-cheaper-and-expensive-nft/${params.slug}`,
        {
            method: "GET", // or 'PUT'
            headers: {
                [`${server.header.key}`]: `${server.header.value}`,
            },
        }
    );
    const twitterChartRequest = await fetch(
        `${server.baseUrl}/collection/getTwitterData/${params.slug}`,
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
    const discardDataAPIRequest = await fetch(
        `${server.baseUrl}/collection/getDiscordData/${params.slug}`,
        {
            method: "GET", // or 'PUT'
            headers: {
                [`${server.header.key}`]: `${server.header.value}`,
            },
        }
    );
    const slugsDataRequest = await fetch(
        `${server.baseUrl}${server.collections}/getPageLinkSlugs/1d`,
        {
            method: "GET",
            headers: {
                [`${server.header.key}`]: `${server.header.value}`,
            },
        }
    )


    const serverCollection = await res.json();
    const priceAPIData = await priceAPIRequest.json();
    const twitterChartData = await twitterChartRequest.json();
    const salesData = await salesDataAPIRequest.json();
    const discardData = await discardDataAPIRequest.json();
    const resHighestLowestValues = await resHighestLowest.json();
    const slugsData = await slugsDataRequest.json();
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
            resHighestLowestValues,
            twitterChartData,
            salesData,
            discardData,
            priceAPIData,
            slugsData,
        },
    };
}

export default Collections;
