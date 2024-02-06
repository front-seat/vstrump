import clsx from "clsx";

interface Props {
  title: string;
  invert?: boolean;
  className?: string;
  onClick: () => void;
}

const Button: React.FC<Props> = ({ title, invert, className, onClick }) => (
  <button
    className={clsx(
      "cursor-pointer font-switzer font-semibold text-[20px] leading-[20px] border-2 px-[19px] py-[14px] transition-colors duration-200",
      invert
        ? "border-darkest bg-sun text-darkest hover:text-medium hover:border-medium"
        : "border-sun bg-transparent text-sun hover:text-inherit hover:bg-sun",
      className
    )}
    onClick={onClick}
  >
    {title}
  </button>
);

export const DonateNowButton: React.FC<{
  invert?: boolean;
  className?: string;
}> = ({ invert, className }) => (
  <Button
    title="Donate Now"
    invert={invert}
    className={className}
    onClick={() => {
      // document.getElementById("donation-amount")?.scrollIntoView();
      const donationAmountInput = document.getElementById(
        "donation-amount"
      ) as HTMLInputElement;
      donationAmountInput?.focus();
      // select all text in the input
      donationAmountInput?.setSelectionRange(
        0,
        donationAmountInput.value.length
      );
    }}
  />
);

export default Button;
