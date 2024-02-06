import clsx from "clsx";

interface Props {
  title: string;
  href: string;
  invert?: boolean;
  className?: string;
}

export const ButtonLink: React.FC<Props> = ({
  title,
  href,
  invert,
  className,
}) => (
  <a
    href={href}
    target="_blank"
    className={clsx(
      "block cursor-pointer font-switzer font-semibold text-[20px] leading-[20px] border-2 px-[19px] py-[14px] transition-colors duration-200",
      invert
        ? "border-darkest bg-sun text-darkest hover:text-medium hover:border-medium"
        : "border-sun bg-transparent text-sun hover:text-inherit hover:bg-sun",
      className
    )}
  >
    {title}
  </a>
);
