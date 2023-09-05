import React from "react";
import Header from "../partials/Header";
import Footer from "../components/Footer";
const Pricing = () => {
  const active = false;
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const handleClick = () => {
    console.log("active");
  };
  return (
    <>
      <Header />
      <div className="flex ">
        <div className="relative flex flex-col flex-1 overflow-x-hidden">
          {/*  Site header */}

          <div className="px-4 sm:px-6 lg:px-8 py-8 mt-20 w-full max-w-9xl mx-auto">
            <section className="relative z-20  dark:bg-slate-800 pt-20 px-20 pb-12 lg:pt-[120px] lg:pb-[90px] rounded-lg shadow-2xl">
              <div className="container relative sm:pb-8 lg:pb-0">
                <div className="w-full px-4">
                  <div className="mx-auto mb-[60px] max-w-[510px] text-center lg:mb-20">
                    <span className="block mb-2 text-lg font-semibold text-primary">
                      Pricing Table
                    </span>
                    <h2 className="mb-4 text-3xl font-bold text-dark sm:text-4xl md:text-[40px]">
                      Our Pricing Plan
                    </h2>
                    <p className="text-base text-body-color">
                      There are many variations of passages of Lorem Ipsum
                      available but the majority have suffered alteration in
                      some form.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap justify-center -mx-4">
                  <div className="flex flex-wrap -mx-4">
                    <PricingCard
                      type="Personal"
                      price="$10"
                      subscription="upload"
                      description="Perfect for using in a personal website or a client project."
                      buttonText="Choose Personal"
                      handleClick={handleClick}
                      active={currentUser.sub === "per"}
                    >
                      <List>1 User</List>
                      <List>All UI components</List>
                      <List>Lifetime access</List>
                      <List>Free updates</List>
                      <List>Use on 1 (one) project</List>
                      <List>3 Months support</List>
                    </PricingCard>
                    <PricingCard
                      handleClick={handleClick}
                      type="Business"
                      price="$300"
                      subscription="year"
                      description="Perfect for using in a personal website or a client project."
                      buttonText="Choose Business"
                      active={currentUser.sub === "b"}
                    >
                      <List>5 User</List>
                      <List>All UI components</List>
                      <List>Lifetime access</List>
                      <List>Free updates</List>
                      <List>Use on31 (Three) project</List>
                      <List>4 Months support</List>
                    </PricingCard>
                    <PricingCard
                      handleClick={handleClick}
                      type="Professional"
                      price="$500"
                      subscription="year"
                      description="Perfect for using in a personal website or a client project."
                      buttonText="Choose Professional"
                      active={currentUser.sub === "p"}
                    >
                      <List>Unlimited User</List>
                      <List>All UI components</List>
                      <List>Lifetime access</List>
                      <List>Free updates</List>
                      <List>Unlimited project</List>
                      <List>12 Months support</List>
                    </PricingCard>
                  </div>
                </div>
                <button
                  onClick={handleClick}
                  disabled={active}
                  className={`absolute right-0 ${
                    active
                      ? `cursor-not-allowed block text-base font-semibold text-white bg-blue-600 border border-primary rounded-md text-center p-4 hover:bg-opacity-90 transition`
                      : `block rounded-md border  border-[#D4DEFF] bg-transparent p-4 text-center text-base font-semibold transition hover:border-primary hover:bg-primary hover:text-white`
                  } `}
                >
                  Button
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Pricing;

const PricingCard = ({
  children,
  description,
  price,
  type,
  subscription,
  handleClick,
  buttonText,
  active,
}) => {
  return (
    <>
      <div
        className="w-full px-4 md:w-1/2 lg:w-1/3 cursor-pointer"
        onClick={handleClick}
      >
        <div className="relative z-10 px-8 py-10 mb-10 dark:bg-slate-900 bg-slate-200 border-4 rounded-xl border-blue-600 dark:border-white dark:border-2 border-opacity-20 shadow-pricing sm:p-12 lg:py-10 lg:px-6 xl:p-12">
          <span className="block mb-4 text-lg font-semibold text-primary">
            {type}
          </span>
          <h2 className="mb-5 text-[42px] font-bold text-dark">
            {price}
            <span className="text-base font-medium text-body-color">
              / {subscription}
            </span>
          </h2>
          <p className="mb-8 border-b border-[#F2F2F2] pb-8 text-base text-body-color">
            {description}
          </p>
          <ul className="mb-7">
            <p className="mb-1 text-base leading-loose text-body-color">
              {children}
            </p>
          </ul>

          <div>
            <span className="absolute right-0 top-7 z-[-1]">
              <svg
                width={77}
                height={172}
                viewBox="0 0 77 172"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx={86} cy={86} r={86} fill="url(#paint0_linear)" />
                <defs>
                  <linearGradient
                    id="paint0_linear"
                    x1={86}
                    y1={0}
                    x2={86}
                    y2={172}
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#3056D3" stopOpacity="0.09" />
                    <stop offset={1} stopColor="#C4C4C4" stopOpacity={0} />
                  </linearGradient>
                </defs>
              </svg>
            </span>
            <span className="absolute right-4 top-4 z-[-1]">
              <svg
                width={41}
                height={89}
                viewBox="0 0 41 89"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="38.9138"
                  cy="87.4849"
                  r="1.42021"
                  transform="rotate(180 38.9138 87.4849)"
                  fill="#3056D3"
                />
                <circle
                  cx="38.9138"
                  cy="74.9871"
                  r="1.42021"
                  transform="rotate(180 38.9138 74.9871)"
                  fill="#3056D3"
                />
                <circle
                  cx="38.9138"
                  cy="62.4892"
                  r="1.42021"
                  transform="rotate(180 38.9138 62.4892)"
                  fill="#3056D3"
                />
                <circle
                  cx="38.9138"
                  cy="38.3457"
                  r="1.42021"
                  transform="rotate(180 38.9138 38.3457)"
                  fill="#3056D3"
                />
                <circle
                  cx="38.9138"
                  cy="13.634"
                  r="1.42021"
                  transform="rotate(180 38.9138 13.634)"
                  fill="#3056D3"
                />
                <circle
                  cx="38.9138"
                  cy="50.2754"
                  r="1.42021"
                  transform="rotate(180 38.9138 50.2754)"
                  fill="#3056D3"
                />
                <circle
                  cx="38.9138"
                  cy="26.1319"
                  r="1.42021"
                  transform="rotate(180 38.9138 26.1319)"
                  fill="#3056D3"
                />
                <circle
                  cx="38.9138"
                  cy="1.42021"
                  r="1.42021"
                  transform="rotate(180 38.9138 1.42021)"
                  fill="#3056D3"
                />
                <circle
                  cx="26.4157"
                  cy="87.4849"
                  r="1.42021"
                  transform="rotate(180 26.4157 87.4849)"
                  fill="#3056D3"
                />
                <circle
                  cx="26.4157"
                  cy="74.9871"
                  r="1.42021"
                  transform="rotate(180 26.4157 74.9871)"
                  fill="#3056D3"
                />
                <circle
                  cx="26.4157"
                  cy="62.4892"
                  r="1.42021"
                  transform="rotate(180 26.4157 62.4892)"
                  fill="#3056D3"
                />
                <circle
                  cx="26.4157"
                  cy="38.3457"
                  r="1.42021"
                  transform="rotate(180 26.4157 38.3457)"
                  fill="#3056D3"
                />
                <circle
                  cx="26.4157"
                  cy="13.634"
                  r="1.42021"
                  transform="rotate(180 26.4157 13.634)"
                  fill="#3056D3"
                />
                <circle
                  cx="26.4157"
                  cy="50.2754"
                  r="1.42021"
                  transform="rotate(180 26.4157 50.2754)"
                  fill="#3056D3"
                />
                <circle
                  cx="26.4157"
                  cy="26.1319"
                  r="1.42021"
                  transform="rotate(180 26.4157 26.1319)"
                  fill="#3056D3"
                />
                <circle
                  cx="26.4157"
                  cy="1.4202"
                  r="1.42021"
                  transform="rotate(180 26.4157 1.4202)"
                  fill="#3056D3"
                />
                <circle
                  cx="13.9177"
                  cy="87.4849"
                  r="1.42021"
                  transform="rotate(180 13.9177 87.4849)"
                  fill="#3056D3"
                />
                <circle
                  cx="13.9177"
                  cy="74.9871"
                  r="1.42021"
                  transform="rotate(180 13.9177 74.9871)"
                  fill="#3056D3"
                />
                <circle
                  cx="13.9177"
                  cy="62.4892"
                  r="1.42021"
                  transform="rotate(180 13.9177 62.4892)"
                  fill="#3056D3"
                />
                <circle
                  cx="13.9177"
                  cy="38.3457"
                  r="1.42021"
                  transform="rotate(180 13.9177 38.3457)"
                  fill="#3056D3"
                />
                <circle
                  cx="13.9177"
                  cy="13.634"
                  r="1.42021"
                  transform="rotate(180 13.9177 13.634)"
                  fill="#3056D3"
                />
                <circle
                  cx="13.9177"
                  cy="50.2754"
                  r="1.42021"
                  transform="rotate(180 13.9177 50.2754)"
                  fill="#3056D3"
                />
                <circle
                  cx="13.9177"
                  cy="26.1319"
                  r="1.42021"
                  transform="rotate(180 13.9177 26.1319)"
                  fill="#3056D3"
                />
                <circle
                  cx="13.9177"
                  cy="1.42019"
                  r="1.42021"
                  transform="rotate(180 13.9177 1.42019)"
                  fill="#3056D3"
                />
                <circle
                  cx="1.41963"
                  cy="87.4849"
                  r="1.42021"
                  transform="rotate(180 1.41963 87.4849)"
                  fill="#3056D3"
                />
                <circle
                  cx="1.41963"
                  cy="74.9871"
                  r="1.42021"
                  transform="rotate(180 1.41963 74.9871)"
                  fill="#3056D3"
                />
                <circle
                  cx="1.41963"
                  cy="62.4892"
                  r="1.42021"
                  transform="rotate(180 1.41963 62.4892)"
                  fill="#3056D3"
                />
                <circle
                  cx="1.41963"
                  cy="38.3457"
                  r="1.42021"
                  transform="rotate(180 1.41963 38.3457)"
                  fill="#3056D3"
                />
                <circle
                  cx="1.41963"
                  cy="13.634"
                  r="1.42021"
                  transform="rotate(180 1.41963 13.634)"
                  fill="#3056D3"
                />
                <circle
                  cx="1.41963"
                  cy="50.2754"
                  r="1.42021"
                  transform="rotate(180 1.41963 50.2754)"
                  fill="#3056D3"
                />
                <circle
                  cx="1.41963"
                  cy="26.1319"
                  r="1.42021"
                  transform="rotate(180 1.41963 26.1319)"
                  fill="#3056D3"
                />
                <circle
                  cx="1.41963"
                  cy="1.4202"
                  r="1.42021"
                  transform="rotate(180 1.41963 1.4202)"
                  fill="#3056D3"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

const List = ({ children }) => {
  return (
    <>
      <p className="mb-1 text-base leading-loose text-body-color">{children}</p>
    </>
  );
};
