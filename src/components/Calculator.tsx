import { useEffect, useState, useCallback } from "react";
import type { ReactNode, MouseEvent } from "react";

import { P21, P28, Em28, H2 } from "./Typeography";

/** Format dollars as dollars, with commas. */
export const formatUSD = (
  usd: number,
  showCents: boolean = true,
  showDollarSign: boolean = true
) => {
  const formatted = usd.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: showCents ? 2 : 0,
    maximumFractionDigits: showCents ? 2 : 0,
  });
  return showDollarSign ? formatted : formatted.slice(1);
};

/** Format a percentage (from 0.0 to 1.0) in human-readable form. */
export const formatPerc = (perc: number) => `${Math.round(perc * 100)}%`;

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
          We’ve chosen the{" "}
          <a
            href="https://movement.vote/"
            className="underline hover:text-white transition-colors duration-200"
            target="_blank"
          >
            Movement Voter Project
          </a>{" "}
          and{" "}
          <a
            href="https://www.workingamerica.org/"
            className="underline hover:text-white transition-colors duration-200"
            target="_blank"
          >
            Working America
          </a>
          .
        </P21>
      </>
    ),
    perc: 0.4,
    url: (usd: number) =>
      `https://secure.actblue.com/donate/voter-turnout-vs-trump?amount=${usd}`,
  },
  {
    name: "Community Specific",
    description: (
      <>
        <P21 className="text-medium">
          These organizations build long-term relationships with specific
          communities and demographics. They are trusted messengers in critical
          battleground states.
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
          , the{" "}
          <a
            href="https://newgeorgiaproject.org/"
            className="underline hover:text-white transition-colors duration-200"
            target="_blank"
          >
            New Georgia Project
          </a>
          , and{" "}
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
    url: (usd: number) =>
      `https://secure.actblue.com/donate/community-specific-vs-trump?amount=${usd}`,
  },
  {
    name: "Biden Campaign",
    description: (
      <P21 className="text-medium">
        Donating to the Biden campaign is impactful because they know the most
        important voters to target with get-out-the-vote and advertising.
      </P21>
    ),
    perc: 0.2,
    url: (usd: number) =>
      `https://secure.actblue.com/donate/biden-vs-trump?amount=${usd}`,
  },
  {
    name: "Competitive House Races",
    description: (
      <>
        <P21 className="text-medium">
          Good house candidates help turn out votes for Biden. Winning the house
          a good strategy in case Trump wins.
        </P21>
        <P21 className="text-medium">
          We've chosen the 10 most impactful house races according to{" "}
          <a
            href="https://swingleft.org/"
            className="underline hover:text-white transition-colors duration-200"
            target="_blank"
          >
            Swing Left
          </a>
          .
        </P21>
      </>
    ),
    perc: 0.2,
    url: (usd: number) =>
      `https://secure.actblue.com/donate/competitive-house-races-vs-trump?amount=${usd}`,
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
  const handleDonateClick = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();

      window.gtag("event", "click_donate", {
        event_category: "donation",
        event_label: "Clicked a donation link",
        allocation: allocation.name,
        usd: usd,
        url: allocation.url(usd),
      });

      // ideally we'd wait a moment for the gtag event to fire, or even
      // use the `event_callback` parameter to wait for it to fire, but
      // given the constraints of making it work no matter the condition
      // of the gtag scripts, let's just do this instead for now?

      window.open(allocation.url(usd), "_blank");
    },
    [allocation, usd]
  );

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
        <a
          href={allocation.url(usd)}
          target="_blank"
          onClick={handleDonateClick}
          className="block text-center cursor-pointer font-plein font-medium border border-sun uppercase bg-transparent px-4 text-sun hover:text-inherit hover:bg-sun transition-colors duration-200 w-full text-[20px] leading-[28px] py-4"
        >
          Donate {formatUSD(usd, false, true)}
        </a>
      </div>
    </div>
  );
};

/** Compute a dollar-rounded amount for each allocation in a distribtion. */
export const computeEvenDollarAmounts = (
  percs: number[],
  usd: number
): number[] => {
  // Compute the *total* number of USD we want to distribute over
  // our allocations.
  const totalUSD = Math.floor(usd);

  // Assert that our percentages are ordered from greatest to least.
  // Also assert that they sum to 1.
  let lastPerc = 1;
  let sum = 0;
  for (const perc of percs) {
    if (perc > lastPerc) {
      throw new Error(
        "Allocation percentages must be in reverse order (greatest to least)"
      );
    }
    lastPerc = perc;
    sum += perc;
  }
  if (sum !== 1) {
    throw new Error("Allocation percentages must sum to 1");
  }

  // Distribute the USD over our allocations, rounding each allocation
  // to the nearest dollar.
  const evenDollarAmounts: number[] = [];
  let remainingUSD = totalUSD;
  for (const perc of percs) {
    const roundedUSD = Math.round(perc * totalUSD);
    evenDollarAmounts.push(roundedUSD);
    remainingUSD -= roundedUSD;
  }

  // Now, check to make sure the total dollar amount we've distributed
  // matches the total USD we wanted to distribute. If it's off, we need
  // to adjust the allocations. Start by adjusting the larger allocations
  // up/down by one dollar, then the smaller allocations, etc.
  let i = 0;
  while (remainingUSD !== 0) {
    const roundedUSD = evenDollarAmounts[i];
    const delta = remainingUSD > 0 ? 1 : -1;
    evenDollarAmounts[i] = roundedUSD + delta;
    remainingUSD -= delta;
    i++;
  }

  // Assert that we've distributed the correct amount of USD by explicitly
  // summing the rounded amounts.
  const actualUSD = evenDollarAmounts.reduce(
    (sum, roundedUSD) => sum + roundedUSD,
    0
  );
  if (actualUSD !== totalUSD) {
    throw new Error(
      `Expected to distribute ${totalUSD} USD, but actually distributed ${actualUSD} USD`
    );
  }

  // Return the final dollar amounts.
  return evenDollarAmounts;
};

/** React component that displays a full Distribution. */
const DistributionComponent = ({
  distribution,
  usd,
}: {
  distribution: Distribution;
  usd: number;
}) => {
  const dollarAmounts = computeEvenDollarAmounts(
    distribution.map((allocation) => allocation.perc),
    usd
  );

  return (
    <div className="flex flex-col py-8 space-y-8">
      {distribution.map((allocation, i) => (
        <AllocationComponent
          key={allocation.name}
          index={i + 1}
          allocation={allocation}
          usd={dollarAmounts[i]}
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
  const [text, setText] = useState<string>(formatUSD(usd, false, false));

  useEffect(() => {
    // Copy the text for us to process
    let decimalPlaces = 0;

    // is there a decimal point?
    const hasDecimal = text.indexOf(".") !== -1;

    // if there *is* a decimal point, make sure there are exactly two digits after it
    if (hasDecimal) {
      const parts = text.split(".");
      if (parts.length !== 2) {
        return;
      }

      decimalPlaces = parts[1].length;
    }

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
    const cents = (parsed / Math.pow(10, decimalPlaces)) * 100;
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
      <P28 className="text-white">Enter the amount you’d like to donate:</P28>
      <DonationAmountBox usd={usd} setUSD={setUSD} />
      <DistributionComponent distribution={DISTRIBUTION} usd={usd} />
    </div>
  );
};

/** Export the Calculator component. */
export default Calculator;
