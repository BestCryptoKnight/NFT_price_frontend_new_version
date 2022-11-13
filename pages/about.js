// function createMarkup(element) {
//   return { __html: element };
// }

const About = ({ about }) => {

	return (
		<section className="container">
			<div className="about-container">

				<div className="row">
					<div className="col-lg-8 col-md-12">
						<div className="image-hide">
							<img src="/img/Group 37845.png" alt="" className="image-size" />
						</div>
						<div className="color-title">
							About Us
						</div>
						<div className="title-font">
							NFTPrice.Zone Aimes To Become <br />
							The Number 1 Provider For Non-<br />
							Fungible Token(NFT)States
						</div>
						<div className="content-font mt-4">
							We do it in real-time and update our figures every 24 hours. It doesn’t matter if it’s
							single NFTs or entire collections; you can get the low-down on trading values, rarity,
							and even information on upcoming NFT launches!
							<br />
							Having access to these figures can help avid NFT supporters make the ideal moves,
							supplement their independent research, and learn more about NFTs. Our platform is
							a great place for beginners to expand their knowledge in this fast-growing space.
							<br />
							For those already familiar with the NFT space, listing your projects with us can give
							exposure to your projects and help put you in touch with potential buyers.
							<br />
							We’re paving the way to becoming one of the largest and most trustworthy digital
							marketplaces for crypto-collectibles and NFTs. As our platform grows, we will
							introduce new features, perks, and insights into the NFT industry.
						</div>
					</div>
					<div className="col-lg-4 mt-4 image-show">
						<img src="/img/Group 37845.png" alt="" className="image-size" />
					</div>
				</div>
				<div className="row mt-5">
					<div className="col-lg-4 col-md-12">
						<img src="/img/Group 37846.png" alt="" className="image-size" />
					</div>
					<div className="col-lg-8 col-md-12 lap-pl-5 mt-4">
						<div className="title-font">
							Tim Robinson
						</div>
						<div className="content-font mt-2" >
							Tim Robinson is a passionate NFT enthusiast that keeps his finger on the pulse of new
							developments in the blockchain space. Web 3.0 is a new conceptualization of the
							interweb in its early stages. Tim has found his calling to educate and inform visitors
							about a subject where he sees great potential. With the help of a dedicated team
							behind him, Tim aims to create the leading source for NFT information.
						</div>

					</div>
				</div>
			</div>
		</section>
	)
}

// export async function getStaticProps() {
//   const res = await fetch(`https://blog.nftsales.net/wp-json/wp/v2/pages?slug=about`)
//   let about = await res.json()
//   about = JSON.stringify(about);
//   about = about.replace("NFTSales.net", "NFTPrice.zone");
//   about = JSON.parse(about);
//   return {
//     props: {
//       about,
//     },
//   }
// }

export default About;