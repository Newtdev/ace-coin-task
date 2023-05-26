import React, { useState } from "react";
import Logo from "../assets/img/Logo.svg";
import EditIcon from "../assets/img/edit-pencil.svg";
import MasterCard from "../assets/img/mastercard-2.svg";
import VerificationCard from "../assets/img/verified-badge.svg";
import Wifi from "../assets/img/wifi.png";
import Chip from "../assets/img/chip.png";
import Dot from "../assets/img/dot.svg";
import Line from "../assets/img/line.svg";
import Receipt from "../assets/img/receipt.svg";
import Apple from "../assets/img/apple-13.svg";

const Close = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		strokeWidth={1.5}
		stroke="currentColor"
		className="w-6 h-6">
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M6 18L18 6M6 6l12 12"
		/>
	</svg>
);

// SPLIT CARD NUMBER TO 4 EACH
function splitValueBy4(str = "1234567890123456") {
	if (!str) return;
	var results = str.match(/\d{4}/g).join("   -   ");
	return results;
}

// DISPLAY OTHER INPUT FOR COLLECTING MASTER CARD INFORMATION
export default function MainPage() {
	const [value, setValue] = useState({
		cardDetail: "1234567890123456",
		month: "12",
		year: "20",
		cvv: "123",
		password: "12345678909876",
	});
	const [showModal, setShowModal] = useState(false);
	const [readOnly, setReadonly] = useState(true);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setValue((prevState) => {
			return { ...prevState, [name]: value };
		});
	};

	const date = new Date();
	let hours = date.getHours().toString();
	let mins = date.getMinutes().toString();

	hours = hours < 10 ? "0" + hours : hours;
	mins = mins < 10 ? "0" + mins : mins;

	return (
		<section className=" h-screen w-screen">
			<article className="w-full h-full px-4 lg:bg-hero-bg bg-inherit bg-no-repeat lg:bg-left lg:flex justify-center items-center bg-white">
				<div className="w-full lg:w-[80%] lg:h-[85%]  bg-white">
					{/* CLOSE MODAL */}
					<div className="w-fit p-4 ml-auto bg-[#F9FBFC]">
						<Close />
					</div>
					<div className="flex flex-row md:justify-center h-full w-full ">
						<div className="-900 lg:basis-[65%] h-16 items-center lg:px-10">
							{/* LOGO AND TIME*/}
							<div className="w-full flex justify-center lg:justify-between items-center flex-wrap ">
								<LogoComp />
								<div className="flex items-center ">
									<TimeCard time={hours} />
									<span className="font-bold text-xl inline-block px-1">:</span>
									<TimeCard time={mins} />
								</div>
							</div>

							{/* EDIT AND CARD INPUT*/}
							<div className="w-full flex flex-col justify-center lg:flex-row lg:justify-between lg:items-center flex-wrap mt-4 lg:mt-10">
								<InputLabel
									name="Card Number"
									label="Enter the 16-digit card number on the card"
								/>

								<button
									className="w-fit h-16 flex items-center font-bold text-[#276BDD]"
									onClick={() => setReadonly((prevState) => !prevState)}>
									<ImageComp
										image={EditIcon}
										width={16}
										height={16}
										styles="mr-2 text-red-900"
									/>
									<p>Edit</p>
								</button>
							</div>

							{/* CARD 16 DIGITS NUMBER */}
							<div className="h-14 rounded-lg w-full flex justify-between lg:px-4 border border-[#D9D9D9] bg-[#FAFAFC] mt-4 mb-6 lg:mb-0 px-2 ">
								<ImageComp image={MasterCard} width={20} height={30} />

								<Input
									name="cardDetail"
									onChange={handleChange}
									maxLength={"16"}
									readOnly={readOnly}
									onBlur={() =>
										setValue((prevState) => {
											return {
												...prevState,
												cardDetail: splitValueBy4(prevState.cardDetail),
											};
										})
									}
									onFocus={() =>
										setValue((prevState) => {
											return {
												...prevState,
												cardDetail: "",
											};
										})
									}
									type={"text"}
									value={value.cardDetail}
									styles="w-[90%] h-full px-4 focus:bg-none bg-[#FAFAFC] text-[#BDC3CF]"
								/>
								<ImageComp image={VerificationCard} width={20} height={30} />
							</div>
							<div>
								{/* OTHER CARD DETAILS INCLUDING CVV AND EXPIRATION DATE */}
								{
									<OtherCardInfo
										handleChange={handleChange}
										value={value}
										readOnly={readOnly}
									/>
								}
							</div>
							<div className="mt-8 py-5 bg-[#025EFE] lg:block hidden w-full font-bold rounded-lg text-white">
								<Button name="Pay Now" />
							</div>
							<div className="mt-8 py-5 bg-[#025EFE] lg:hidden w-full font-bold rounded-lg text-white">
								<Button
									name="Pay Now"
									onClick={() => setShowModal((prevState) => !prevState)}
								/>
							</div>
						</div>
						<div className="mx-auto basis-[45%] h-[85%] hidden lg:block ">
							{/* RECEIPT CARD */}
							<OverviewCard cardInfo={value} />
						</div>
					</div>
				</div>
				{showModal ? (
					<ReceiptModal
						closeModal={(prevState) => setShowModal(!prevState)}
						cardInfo={value}
					/>
				) : null}
			</article>
		</section>
	);
}

//IMAGE COMPONENT
export function ImageComp({ image, width, height, styles }) {
	return (
		<img
			src={image}
			alt="sample"
			width={width}
			height={height}
			className={styles}
		/>
	);
}

// Logo
export function LogoComp() {
	return (
		<div className="w-fit h-16 flex items-center p-4 ">
			<ImageComp image={Logo} width={40} height={40} />
			<h2 className="font-bold text-[20px] text-[#1F2B50] ml-4">AceCoin</h2>
			<p className="text-thinner text-[20px] text-[#62677B]">Pay</p>
		</div>
	);
}

//TIME CARD
export function TimeCard({ time }) {
	return (
		<>
			{time.split("").map((_v, i) => (
				<div
					key={i}
					className="h-10 w-7 mx-[0.5px]  rounded flex justify-center items-center font-bold text-white bg-[#1E2A53]">
					{_v}
				</div>
			))}
		</>
	);
}
//
//LABLE
const InputLabel = (props) => (
	<div className="text-start">
		<h2 className="font-extrabold  text-base text-[#1E2A53]">{props.name}</h2>
		<p className="text-xs font-bold text-[#939BB1] mt-2">{props.label}</p>
	</div>
);

// INPUT COMPONENT
const Input = ({
	name,
	onChange,
	onBlur,
	onFocus,
	value,
	styles,
	type,
	maxLength,
	readOnly,
}) => {
	return (
		<div className="w-full">
			<input
				name={name}
				onChange={onChange}
				onFocus={onFocus}
				onBlur={onBlur}
				value={value}
				type={type}
				maxLength={maxLength}
				className={styles}
				readOnly={readOnly}
			/>
			{/* <p></p> */}
		</div>
	);
};

// OTHER CARD DETAILS LIKE CVV
const OtherCardInfo = ({ handleChange, value, readOnly }) => {
	const CardData = [
		{
			id: 0,
			name: "CVV Number",
			inputName: "cvv",
			label: "Enter the 3 or 4 digit number on the your card",
			onChange: handleChange,
			type: "text",
			maxLength: "4",
			value: value.cvv,
			styles:
				"w-1/2 text-center h-full px-4 focus:bg-none bg-[#FAFAFC] text-[#62677B] focus:bg-[#ECF3FE] focus:text-[#276BDD]",
		},
		{
			id: 1,
			name: "Expire Date",
			label: "Enter the expiration date of the card",

			month: {
				name: "month",
				onChange: handleChange,
				value: value.month,
			},
			year: {
				name: "year",
				onChange: handleChange,
				value: value.year,
			},
			styles:
				"w-full text-center h-full px-4 focus:bg-none bg-[#FAFAFC] text-[#62677B] px-2 border border-[#D9D9D9] bg-[#FAFAFC] rounded-lg focus:bg-[#ECF3FE] focus:text-[#276BDD] font-bold",
		},
		{
			id: 2,
			name: "Password",
			inputName: "password",
			label: "Enter your Dynamic password",
			onChange: handleChange,
			type: "password",
			value: value.password,
			styles:
				"w-full text-center h-full px-4 focus:bg-none bg-[#FAFAFC] text-[#62677B] px-2 rounded-lg focus:bg-[#ECF3FE] focus:text-[#276BDD]",
		},
	];
	return CardData.map((_v, i) => {
		return (
			<>
				{_v.id !== 1 ? (
					<div
						key={_v.id}
						className="w-full grid grid-cols-1 lg:grid-cols-2 lg:mt-6">
						<InputLabel name={_v.name} label={_v.label} />

						<div className="h-14 rounded-lg w-full flex mt-2 lg:mt-0 justify-between border border-[#D9D9D9] bg-[#FAFAFC]">
							<Input
								name={_v.inputName}
								onChange={_v.onChange}
								maxLength={_v.maxLength}
								type={_v.type}
								value={_v.value}
								styles={_v.styles}
								readOnly={readOnly}
							/>
							<ImageComp image={Dot} width={20} height={30} styles="mx-3" />
						</div>
					</div>
				) : null}

				{_v.id === 1 ? (
					<div
						key={_v.id}
						className="w-full grid grid-cols-1 lg:grid-cols-2 my-6 lg:mt-10 ">
						<InputLabel name={_v.name} label={_v.label} />
						<div className="flex items-center justify-evenly lg:mt-0">
							<div className="h-14 rounded-lg w-1/2 mt-2 lg:mt-0 flex justify-between ">
								<Input
									name={"month"}
									onChange={_v.month.onChange}
									type="text"
									maxLength="2"
									value={_v.month.value}
									styles={_v.styles}
									readOnly={readOnly}
								/>
							</div>
							<span className="font-extrabold text-center  px-4">/</span>
							<div
								key={_v.id}
								className="h-14 rounded-lg w-1/2 flex justify-between ">
								<Input
									name={"year"}
									onChange={_v.year.onChange}
									type="text"
									maxLength="2"
									value={_v.year.value}
									styles={_v.styles}
									readOnly={readOnly}
								/>
							</div>
						</div>
					</div>
				) : null}
			</>
		);
	});
};

// BUTTON COMPONENT
const Button = ({ name, onClick }) => (
	<button onClick={onClick} className="w-full">
		{name}
	</button>
);

// OVERVIEW CARD FOR THE RECIPT
const OverviewCard = ({ closeModal, cardInfo }) => {
	const last4CardDetails = cardInfo.cardDetail?.split(" - ")[3];
	const expirationMonth = cardInfo.month;
	const expirationYear = cardInfo.year;

	const infoList = [
		{ id: 0, key: "Company", value: "Apple", image: Apple },
		{ id: 1, key: "Order Number", value: "1266201" },
		{ id: 2, key: "Product", value: "MacAirBook Air" },
		{ id: 3, key: "Vat (20%)", value: "$100.00" },
	];

	function RenderInfoList() {
		return infoList.map((_v, i) => {
			return (
				<div key={_v.id} className="w-full">
					<div className="flex w-full justify-between font-bold">
						<p className="text-[#8790A5] my-1.5 text-sm">{_v.key}</p>

						<p className="text-[#1E2A53] text-sm flex items-center">
							{_v.image ? (
								<ImageComp
									image={_v.image}
									width={20}
									height={20}
									styles=" mr-2 "
								/>
							) : null}
							{_v.value}
						</p>
					</div>
				</div>
			);
		});
	}
	return (
		<div className="md:w-1/2 lg:w-[90%] h-full mx-auto py-2 flex flex-col justify-between relative">
			<div className=" py-1 bg-[#025EFE] w-16 font-bold rounded mx-auto mt-2 text-white">
				<Button />
			</div>
			<div
				className="w-fit ml-auto bg-[#F9FBFC] absolute top-2  lg:hidden right-0"
				onClick={closeModal}>
				<Close />
			</div>

			<div className="h-[85%] mt-10 rounded-xl w-full lg:w-[75%] mx-auto bg-[#E8ECEF]">
				{/* MASTER CARD INFORMATION OVERVIEW */}
				<div className="h-[16.5rem] rounded-2xl w-48 lg:-mt-[4.5rem] -mt-[5rem] shadow-lg px-3 py-8 bg-gradient-to-b z-10 from-[#ecf3fee7] backdrop-blur-sm to-white mx-auto">
					{/* TOP IMAGE */}
					<div className="flex justify-between">
						<ImageComp
							image={Chip}
							width={26}
							height={23}
							styles="mx-3 object-contain"
						/>
						<ImageComp
							image={Wifi}
							width={23}
							height={23}
							styles="mx-3 object-contain"
						/>
					</div>
					<div className=" h-full mt-auto flex flex-col justify-end px-2">
						<div className="mb-4">
							<h3 className="text-start text-[#585E71] font-bold">
								Jonathan Michael
							</h3>
							<div className="flex items-center w-full">
								<div>
									{new Array(4).fill("").map((_, i) => (
										<span
											key={i}
											className="inline-block font-bold text-xl bg-[#1E2A53] h-2 w-2 mx-1 rounded-full"></span>
									))}
								</div>
								<p className="font-bold text-lg text-[#1E2A53] ml-4 mt-2">
									{last4CardDetails || "0000"}
								</p>
							</div>
						</div>

						{/*  */}
						<div className="flex justify-between items-center h-16 px-1.5">
							<div>
								<p className="font-bold text-lg text-[#1E2A53]">
									{expirationMonth}/{expirationYear}
								</p>
							</div>
							<ImageComp
								image={MasterCard}
								width={35}
								height={23}
								styles="object-contain"
							/>
						</div>
					</div>
				</div>

				<div className=" rounded-2xl w-[90%] px-3 py-10 bg-gradient-to-b flex flex-col justify-end  mx-auto relative">
					<div>{RenderInfoList()}</div>
					<span className="block h-10 w-10 bg-white rounded-full mt-auto absolute -left-9 -bottom-1 z-[4]"></span>
					<ImageComp
						image={Line}
						width={50}
						height={50}
						styles="absolute right-1 bottom-3.5 z-[4] w-[95%] "
					/>
					<span className="block h-10 w-10 rounded-full bg-white mt-auto absolute -right-9 -bottom-1 z-[4]"></span>
				</div>
				<div className="h-[25%] lg:h-[15%] w-[90%] px-3 bg-gradient-to-b rounded-b-xl mx-auto flex items-center justify-between">
					<div className="font-bold text-sm text-start text-[#8790A5]">
						<h5>You have to Pay</h5>
						<span className="flex items-end mt-1">
							<h2 className="text-2xl font-bold text-[#1E2A53]">549</h2>
							<h5 className="text-lg font-bold text-[#1E2A53]">.99</h5>
							<h5 className="text-lg font-bold ml-2">USD</h5>
						</span>
					</div>
					<div>
						<ImageComp image={Receipt} width={30} height={30} styles=" " />
					</div>
				</div>
				<div className="py-2 bg-[#025EFE] lg:hidden w-[90%] mx-auto font-bold rounded-lg text-white">
					<Button name="Pay" />
				</div>
			</div>
		</div>
	);
};

// MODAL FOR MOBILE AND TABS
const ReceiptModal = ({ closeModal, cardInfo }) => {
	return (
		<div className="fixed top-0 right-0 w-full px-4 h-full bg-white">
			<OverviewCard closeModal={closeModal} cardInfo={cardInfo} />
		</div>
	);
};
