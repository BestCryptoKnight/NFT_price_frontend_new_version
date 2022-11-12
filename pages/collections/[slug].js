import React, { useEffect, useState } from "react";
import CarouselCollectionRecent from "../../components/components/CarouselCollectionRecent";
import CarouselCollectionNftTop from "../../components/components/CarouselCollectionNftTop";
import { createGlobalStyle } from "styled-components";
import SalesChart from "../../components/components/Charts/SalesChart";
import TwitterChart from "../../components/components/Charts/TwitterChart";
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

const GlobalStyles = createGlobalStyle`

    .main-stat-card{
      border-radius: 13.1647px;
      box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    }

    .stat-detail-card{
      border-radius: 10px;
      box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    }

    .stat-detail-heading{
      color: #00AC4F;
      font-size: 20px;
      font-weight: 700;
    }

    .stat-detail-text{
      font-size: 14px;
      font-weight: 700;
    }

    .stat-detail-time{
      font-size: 10px;
      color: #636363;
    }

    .stat-detail-heading-l{
      color: #00AC4F;
      font-size: 50px;
    }

    .stat-detail-text-l{
      font-size: 28px;
      font-weight: 700;
    }

    .stat-detail-time-l{
      font-size: 18px;
      color: #636363;
    }

    .coll-main-title{
        font-size: 20px;
        font-weight: 900;
    }
`;

const SmallStat = (props) => {
    return (
        <div className={`p-2 ${props.className}`}>
            <div
                className={` w-100 card d-flex flex-column justify-content-center align-items-center stat-detail-card`}
            >
                <div className="stat-detail-heading m-0">
                    {props.icon}
                    {props.heading}
                </div>
                <div className="stat-detail-text m-0">{props.text}</div>
                <div className="stat-detail-time">{props.time}</div>
            </div>
        </div>
    );
};

const SocialIcon = (props) => {
    return (
        <a
            className="d-flex align-items-center justify-content-center"
            href={props.link}
            target="_blank"
            rel="noreferrer"
        >
            <i className={`${props.icon} fa-lg mr-2`} />
            <p className="p-0 m-0">{props.title}</p>
        </a>
    );
};

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


    return (
        <div>
            <GlobalStyles />
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
            <section className="container no-bottom">
                <div className="row">
                    <div className="col-lg-12">
                        <span>
                            <span className="timestamp">Collections/</span>
                            {collection && <span>{collectionName}</span>}
                        </span>
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
