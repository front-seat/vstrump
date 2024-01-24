import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import Button from "./Button";

import { P21, P28, Em28, H2 } from "./Typeography";

/** Format dollars as dollars, with commas. */
const formatUSD = (
  usd: number,
  showCents: boolean = true,
  showDollarSign: boolean = true
) => {
  const formatted = usd.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: showCents ? 2 : 0,
  });
  return showDollarSign ? formatted : formatted.slice(1);
};

/** Format a percentage (from 0.0 to 1.0) in human-readable form. */
const formatPerc = (perc: number) => `${Math.round(perc * 100)}%`;

/** A partial allocation of a total election-cycle donation. */
interface Allocation {
  name: string;
  description: ReactNode;
  perc: number;
  url: (usd: number) => string;
}

/** The type of a distribution. */
type Distribution = Allocation[];

/** The suggested distribution of donations for the 2024 election cycle. */
const DISTRIBUTION: Distribution = [
  {
    name: "Voter Turnout",
    description: (
      <>
        <P21 className="text-medium">
          The most quantitatively measurable and cost-effective tactics for
          voter registration, persuasion, and turnout. These are 501(c)3
          tax-deductible donations.
        </P21>
        <P21 className="text-medium">
          We’ve chosen the {" "}
          <a 
          href="https://movement.vote/"
          className="underline hover:text-white transition-colors duration-200"
          target="_blank"
        >
            Movement Voter Project
          </a>
           {" "} and {" "}
         <a 
          href="https://www.workingamerica.org/"
          className="underline hover:text-white transition-colors duration-200"
          target="_blank"
        >
            Working America
          </a>{" "}
          because of their low cost per voter.
        </P21>
      </>
    ),
    perc: 0.4,
    url: () => "https://secure.actblue.com/donate/voter-turnout-vs-trump",
  },
  {
    name: "Community Specific",
    description: (
      <>
        <P21 className="text-medium">
          These organizations build long-term relationships with specific
          communities and demographics. They are trusted messengers in 
          critical battleground states.
        </P21>
        <P21 className="text-medium">
          We’ve chosen{" "}
          <a 
          href="https://www.somosvotantes.com/"
          className="underline hover:text-white transition-colors duration-200"
          target="_blank"
        >
            Somos Votantes
          </a>
          ,{" "}
          <a 
          href="https://www.blocbybloc.org/"
          className="underline hover:text-white transition-colors duration-200"
          target="_blank"
        >
            Black Leaders Organizing Communities
          </a>
           , the {" "}
           <a 
          href="https://newgeorgiaproject.org/"
          className="underline hover:text-white transition-colors duration-200"
          target="_blank"
        >
            New Georgia Project
          </a>
          , and {" "}
           <a 
          href="https://www.luchaaz.org/"
          className="underline hover:text-white transition-colors duration-200"
          target="_blank"
        >
            LUCHA Arizona
          </a>
          .
        </P21>
      </>
    ),
    perc: 0.2,
    url: () => "https://secure.actblue.com/donate/community-specific-vs-trump",
  },
  {
    name: "Biden Campaign",
    description: (
      <P21 className="text-medium">
        Donating to the Biden campaign is impactful because their analysts know
        the most important voters to target with get-out-the-vote and
        advertising.
      </P21>
    ),
    perc: 0.2,
    url: () => "https://secure.actblue.com/donate/biden-vs-trump",
  },
  {
    name: "Competitive House Races",
    description: (
      <P21 className="text-medium">
        Good house candidates help turn out votes for Biden. 
        Winning the house is also a good strategy in case Trump wins. We've chosen
        the 10 most impactful house races according to 
         <a 
          href="https://swingleft.org/"
          className="underline hover:text-white transition-colors duration-200"
          target="_blank"
        >
            Swing Left
          </a>. 
      </P21>
    ),
    perc: 0.2,
    url: () => "https://secure.actblue.com/donate/competitive-house-races-vs-trump",
  },
];

/** React component that displays a single Allocation. */
const AllocationComponent = ({
  allocation,
  usd,
  index,
}: {
  allocation: Allocation;
  usd: number;
  index: number;
}) => {
  return (
    <div className="flex flex-row md:space-x-8 items-start flex-wrap md:flex-nowrap">
      <P28>
        <Em28 className="text-white">{index}.</Em28>
      </P28>
      <div className="flex flex-col flex-shrink pt-4 md:pt-0">
        <P28>
          <Em28 className="text-white">
            {allocation.name} &mdash; {formatPerc(allocation.perc)}
          </Em28>
        </P28>
        <div className="allocation-description space-y-8 mt-2">
          {allocation.description}
        </div>
      </div>
      <div className="min-w-[21%] pt-6 md:pt-0">
        <Button
          title={`Donate ${formatUSD(usd, true, true)}`}
          onClick={() => {
            window.open(allocation.url(usd), "_blank");
          }}
          className="w-full text-[20px] leading-[28px] py-4"
        />
      </div>
    </div>
  );
};

/** React component that displays a full Distribution. */
const DistributionComponent = ({
  distribution,
  usd,
}: {
  distribution: Distribution;
  usd: number;
}) => {
  return (
    <div className="flex flex-col py-8 space-y-8">
      {distribution.map((allocation, i) => (
        <AllocationComponent
          key={allocation.name}
          index={i + 1}
          allocation={allocation}
          usd={usd * allocation.perc}
        />
      ))}
    </div>
  );
};

/** Donation amount react box. */
const DonationAmountBox = ({
  usd,
  setUSD,
}: {
  usd: number;
  setUSD: (usd: number) => void;
}) => {
  const [text, setText] = useState<string>(formatUSD(usd, true, false));

  useEffect(() => {
    // is there a decimal point?
    const hasDecimal = text.indexOf(".") !== -1;

    // remove all non-numeric characters
    const cleaned = text.replace(/[^0-9]/g, "");

    // if it's empty, bail
    if (cleaned === "") {
      return;
    }

    // parse an integer
    const parsed = parseInt(cleaned);

    // if it's not a number, bail
    if (isNaN(parsed)) {
      return;
    }

    // convert to USD (using hasDecimal)
    const cents = hasDecimal ? parsed : parsed * 100;
    const newUSD = cents / 100;
    setUSD(newUSD);
  }, [text]);

  return (
    <div>
      <p className="font-switzer font-bold uppercase text-[15px] leading-[22.5px] text-white">
        Your donation amount
      </p>
      <div className="flex flex-row items-center max-w-[364px] border border-medium focus-within:border-sun transition-colors duration-200 bg-transparent text-white font-switzer font-normal text-[56px] leading-[56px]">
        <div className="text-white pl-4 flex-grow leading-10">$</div>
        <div className="max-w-[100%] flex-shrink leading-10">
          <input
            id="donation-amount"
            type="text"
            inputMode="decimal"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="text-right caret-sun bg-transparent pr-4 outline-none transition-colors duration-200 leading-10 focus:bg-dark w-[100%] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>
      </div>
    </div>
  );
};

/** React component that displays a calculator. */
const Calculator = () => {
  const [usd, setUSD] = useState(5000);
  return (
    <div className="flex flex-col space-y-6">
      <H2 className="text-white">Make your donation</H2>
      <P28 className="text-white">
        Enter the amount you’d like to donate and we’ll
        create donation links:
      </P28>
      <DonationAmountBox usd={usd} setUSD={setUSD} />
      <DistributionComponent distribution={DISTRIBUTION} usd={usd} />
    </div>
  );
};

/** Export the Calculator component. */
export default Calculator;
