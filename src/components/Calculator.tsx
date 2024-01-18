import { useState } from "react";

/** Format dollars as dollars, with commas. */
const formatUSD = (usd: number, showCents: boolean = false) =>
  usd.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: showCents ? 2 : 0,
  });

/** Format cents as dollars, with commas. */
const formatCents = (cents: number, showCents: boolean = false) =>
  formatUSD(cents / 100);

/** Format a percentage (from 0.0 to 1.0) in human-readable form. */
const formatPerc = (perc: number) => `${Math.round(perc * 100)}%`;

/** A partial allocation of a total election-cycle donation. */
interface Allocation {
  name: string;
  description: string;
  perc: number;
  url: (usd: number) => string;
  linkText: (usd: number) => string;
}

/** The type of a distribution. */
type Distribution = Allocation[];

/** The suggested distribution of donations for the 2024 election cycle. */
const DISTRIBUTION: Distribution = [
  {
    name: "Biden campaign",
    description:
      "Donating to the Biden campaign is impactful because their analysts know the most important voters to target with get-out-the-vote and advertising.",
    perc: 0.2,
    url: () => "https://secure.joebiden.com/a/west-bvf-2?attr=115663298",
    linkText: (usd) =>
      `Click here to make your ${formatUSD(
        usd
      )} donation directly to the Biden campaign`,
  },
  {
    name: "Competitive house races",
    description:
      "Winning the house is an important backup in case Trump wins, but a good local candidate can also help turn out votes for Biden.",
    perc: 0.15,
    url: () => "https://secure.actblue.com/donate/swingleft_house_2024/",
    linkText: (usd) =>
      `Click here to donate ${formatUSD(
        usd
      )} to competitive house races through ActBlue`,
  },
  {
    name: "Voter turnout",
    description:
      "The most quantitatively measurable and cost-effective tactics for voter registration, persuasion, and turnout. These are 501(c)3 tax-deductible donations.",
    perc: 0.3,
    url: () => "https://secure.actblue.com/donate/dsdefeattrump1",
    linkText: (usd) =>
      `Click here to donate ${formatUSD(usd)} to voter turnout through ActBlue`,
  },
  {
    name: "Community specific",
    description:
      "These organizations build long-term relationships with specific communities and demographics. These organizations focus on being trusted messengers for getting out the vote. These are 501(c)3 tax-deductible donations.",
    perc: 0.25,
    url: () => "https://secure.actblue.com/donate/dsdefeattrump1",
    linkText: (usd) =>
      `Click here to donate ${formatUSD(
        usd
      )} to these community-specific organizations`,
  },
  {
    name: "Infrastructure and innovation",
    description:
      "These organizations work on innovative approaches to voter turnout such as social media or important Democratic infrastructure.",
    perc: 0.1,
    url: () => "https://secure.actblue.com/donate/dsdefeattrump1",
    linkText: (usd) =>
      `Click here to donate ${formatUSD(usd)} to infrastructure and innovation`,
  },
];

/** React component that displays a single Allocation. */
const AllocationComponent = ({
  allocation,
  usd,
}: {
  allocation: Allocation;
  usd: number;
}) => {
  return (
    <div className="allocation mb-8">
      <div className="allocation-name text-4xl mb-4">
        {formatUSD(usd)} {allocation.name}
      </div>
      <div className="allocation-description">{allocation.description}</div>
      {/* <div className="allocation-perc">{formatPerc(allocation.perc)}</div> */}
      <div className="allocation-link mt-4 underline hovere:bg-gray-200">
        <a href={allocation.url(usd)}>{allocation.linkText(usd)}</a>
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
    <div className="distribution pt-8">
      {distribution.map((allocation) => (
        <AllocationComponent
          key={allocation.name}
          allocation={allocation}
          usd={usd * allocation.perc}
        />
      ))}
    </div>
  );
};

/** React component that displays a calculator. */
const Calculator = () => {
  const [usd, setUSD] = useState(5000);
  return (
    <div className="calculator">
      <div className="calculator-header">
        <div className="calculator-header-title text-6xl mb-4">
          Where should I donate to defeat Trump?
        </div>
        <div className="calculator-header-subtitle mb-4">
          Enter the amount you want to donate, and we'll suggest how to allocate
          it.
        </div>
      </div>
      <div className="calculator-input ">
        {/* <div className="calculator-input-label">Donation amount</div> */}
        <div className="calculator-input-usd">
          <span className="mr-2">Donate $</span>
          <input
            type="number"
            value={usd}
            onChange={(e) => setUSD(parseInt(e.target.value))}
            className="border rounded-md border-gray-200 p-2"
          />
        </div>
      </div>
      <DistributionComponent distribution={DISTRIBUTION} usd={usd} />
    </div>
  );
};

/** Export the Calculator component. */
export default Calculator;
