import ProviderComponent from "@/store/provider";
import "../styles/globals.css";
import { Titillium_Web } from "next/font/google";
import Region from "@/components/Region";
import Wrapper from "@/components/Wrapper";
import Header from "@/components/Header/Header";

const titilium = Titillium_Web({
	weight: ["300", "400", "700"],
	subsets: ["latin"],
	display: "swap",
});

export const metadata = {
	title: "We Know Shifts",
	description: "We Know Shift Manager",
	icons: [
		{
			rel: "icon",
			type: "image/png",
			sizes: "32x32",
			url: "./favicon.ico",
		},
	],
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<ProviderComponent>
				<body className={titilium.className}>
					<Header></Header>
					<Region>
						<Wrapper>
							<main>{children}</main>
						</Wrapper>
					</Region>
				</body>
			</ProviderComponent>
		</html>
	);
}
