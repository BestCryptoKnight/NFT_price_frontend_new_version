import React, { useState, useEffect } from "react";
import NFTTable from "../components/components/NFTTable";
import { Axios } from "../components/core/axios";
import { server } from "../components/core/api";
import Head from "next/head";
import { numFormatter, numberWithCommas } from "../utils/customFunctions";


const Home = ({ datas, priceAPIData, dataChain }) => {
	const [tableDatas, setTableDatas] = useState([]);
	useEffect(() => {
		const fetchCollection = async () => {
			const collectionsRequest = await fetch(
				`${server.baseUrl}${server.collections}/getCollections/1d`,
				{
					method: "GET", // or 'PUT'
					headers: {
						[`${server.header.key}`]: `${server.header.value}`,
					},
				}
			);
			const collections = await collectionsRequest.json();
			console.log("collections", collections);
			setTableDatas(collections.data.map((backendData, index) => {
				return {
					id: index,
					img: backendData.data.image_url,
					collectible: backendData.data.name,
					pricefloor: backendData.data.stats.floor_price ? backendData.data.stats.floor_price : 0,
					percentage: backendData.data.stats.one_day_change * 100,
					percentage_7: backendData.data.stats.seven_day_change * 100,
					percentage_30: backendData.data.stats.thirty_day_change * 100,
					volumn: backendData.data.stats.one_day_volume,
					volumn_7: backendData.data.stats.seven_day_volume,
					volumn_30: backendData.data.stats.thirty_day_volume,
					sales: backendData.data.stats.one_day_sales,
					sales_7: backendData.data.stats.seven_day_sales,
					sales_30: backendData.data.stats.thirty_day_sales,
					ratio_pecentage: backendData.data.stats.supply_ratio_ratio,
					ratio: backendData.data.stats.supply_ratio_pecentage,
					marketcap: backendData.data.stats.market_capture,
					slug: backendData.data.slug,
					chain: (backendData.chain.symbol == "ETH")
						? "ETHEREUM"
						: (backendData.chain.symbol == "SOL")
							? "SOLANA"
							: "MATIC"
				}
			}));
		};
		fetchCollection();
	}, []);

	return (
		<>
			{
				<main>
					<Head>
						<title>Get all NFT Sales stats for every project</title>
						<meta
							name="title"
							content="Get all NFT Sales stats for every project"
						></meta>
					</Head>
					<section
						className="container "
					>
						<div className="home-container">
							<section className="get-all-section">
								<div className="">
									Get All NFT <img src="/img/get-all1.png" alt="" className="" /> Sales
								</div>
								<div className="">
									<img src="/img/get-all2.png" alt="" className="" /> Stats For Every
								</div>
								<div className="">
									Project
								</div>
							</section>
							<br />
							<br />
							<section className="">
								<div className="row">
									<div className="mt-5 col-sm-12 col-md-3">
										<div className="dis-f jc-se fd-c ai-s h10 ">
											<div className="grey-color">
												Get every possible NFT Sales stats you will ever need for any NFT Project and Collections, including Trading values, Rarity and more.
											</div>
											<div className="dis-f jc-c w10">
												<img src="/img/get-all-down.png" width={'120px'} alt="" className="" />
											</div>
										</div>
									</div>

									<div className="mt-5 col-sm-12 col-md-6">
										<img className="" src="/img/landing-home.png" width={'100%'} alt="" />
									</div>
									<div className="mt-5 col-sm-12 col-md-3">
										<div className="home-info">
											<div className="home-info_">
												<div className="w10">
													<h2 className="secondary-color">
														85K+
													</h2>
													<span className="grey-color">
														NFT Sold
													</span>
												</div>
												<div className="w10 tar">
													<h2 className="secondary-color">
														95K+
													</h2>
													<span className="grey-color">
														Rare NFTs
													</span>
												</div>

											</div>
											<div className="home-info__ w10">
												<h2 className="secondary-color">
													65M+
												</h2>
												<span className="grey-color">
													Trading
												</span>
											</div>
										</div>
									</div>
								</div>
							</section>
							<br />
							<br />
							<br />
							<section className="top-collection-section">
								<h1 className="gradient-font tac w10">
									Top Collections
								</h1>
								{(tableDatas.length > 0)
									? <NFTTable tabledata={tableDatas} priceUSD={priceAPIData.data.USD} dataChain={dataChain.data} />
									: <div className="loader">
										<div className="outer"></div>
										<div className="middle"></div>
										<div className="inner"></div>
									</div>
								}
							</section>
						</div>
					</section>
				</main>
			}
		</>
	);
};

export async function getStaticProps() {
	// Call an external API endpoint to get posts.
	// You can use any data fetching library

	// const res = await fetch(
	// 	`${server.baseUrl}${server.collections}/getCollections/1d`,
	// 	{
	// 		method: "GET", // or 'PUT'
	// 		headers: {
	// 			[`${server.header.key}`]: `${server.header.value}`,
	// 		},
	// 	}
	// );

	const priceAPIRequest = await fetch(
		`${server.baseUrl}/get-eth-stats`,
		{
			method: "GET", // or 'PUT'
			headers: {
				[`${server.header.key}`]: `${server.header.value}`,
			},
		}
	);

	const dataChainRequest = await fetch(
		`${server.baseUrl}/collection/getChains`, {
		method: "GET",
		headers: {
			[`${server.header.key}`]: `${server.header.value}`,
		},
	}
	);

	// const datas = await res.json();
	const priceAPIData = await priceAPIRequest.json();
	const dataChain = await dataChainRequest.json();

	// By returning { props: { datas } }, the Blog component
	// will receive `datas` as a prop at build time
	return {
		props: {
			// datas,
			priceAPIData,
			dataChain
		},
	}
}

export default Home;