import React, { useState, useEffect } from "react";
import SliderMain from "../components/components/SliderCarouselNew";
import CarouselNewRedux from "../components/components/CarouselNewReduxNew";
import styled from "styled-components";
import TopNftCollectionsFiltered from "../components/components/TopNftCollectionsFiltered";
import NFTTable from "../components/components/NFTTable";
import { Axios } from "../components/core/axios";
import { server } from "../components/core/api";
import { createGlobalStyle } from "styled-components";
import Head from "next/head";
import { numFormatter, numberWithCommas } from "../utils/customFunctions";

const Outer = styled.div`
	display: flex;
	justify-content: center;
	align-content: center;
	align-items: center;
	height: 100%;
`;

const GlobalStyles = createGlobalStyle`
	.top-nft-collection-img-small
	{
			max-height: 100px;
			object-fit: contain;
	}

	.top-nft-collection-small-name{
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;white-space: nowrap;
		font-weight: 800;
		font-size: 15px;
	}
`;

const Home = () => {

	const [height, setHeight] = useState(0);
	const [soldNFTs, setSoldNFTs] = useState(0);
	const [volumeNFTs, setVolumeNFTs] = useState(0);
	useEffect(() => {
		const fetchStats = async () => {
			try {


				// const data = await Axios.get(
				//   `${server.baseUrl}${server.collections}/getSevenDayTopCollections`,
				//   {
				//     params: {},
				//     headers: {
				//       [`${server.header.key}`]: `${server.header.value}`,
				//     },
				//   }
				// );

				const data5 = await Axios.get(
					`${server.baseUrl}${server.home}/Stats`,
					{
						params: {},
						headers: {
							[`${server.header.key}`]: `${server.header.value}`,
						},
					}
				)

				setSoldNFTs(data5.data.data.DailySale);
				setVolumeNFTs(numFormatter(data5.data.data.TradingVolume));
				// alert('12123')
				// setNfts(data.data.data.slice(1, 5));
				// setBigNft(data.data.data[0].data);




			} catch (err) {
			}
		};

		fetchStats();
	}, []);
	const onImgLoad = ({ target: img }) => {
		let currentHeight = height;
		if (currentHeight < img.offsetHeight) {
			setHeight(img.offsetHeight);
		}
	};

	return (
		<>
			{
				<main>
					<GlobalStyles />
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
												<div className="w10 tr">
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
								<NFTTable />
							</section>
						</div>
					</section>
				</main>
			}
		</>
	);
};
export default Home;
