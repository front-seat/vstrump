import clsx from "clsx";

/** The primary headline font and metrics. */
export const PLEIN_HEADLINE =
  "font-plein font-bold text-[90px] leading-[81px] md:text-[150px] md:leading-[135px]";

export type TypographicComponent = React.FC<
  React.PropsWithChildren<{ className?: string }>
>;

export type TypographicLink = React.FC<
  React.PropsWithChildren<{
    className?: string;
    href?: string;
    onClick?: () => void;
  }>
>;

export const H1: TypographicComponent = ({ children, className }) => (
  <h1 className={clsx(PLEIN_HEADLINE, className)}>{children}</h1>
);

export const PHeadline: TypographicComponent = ({ children, className }) => (
  <p className={clsx(PLEIN_HEADLINE, className)}>{children}</p>
);

/** Desktop-only headline metrics. */
// export const PLEIN_REGULAR_180 =
//   "font-plein text-[180px] leading-[167.4px] font-normal";

/** Mobile-only headline metrics. */
// export const PLEIN_REGULAR_100 =
//   "font-plein text-[100px] leading-[93px] font-normal";

/** The secondary heading and metrics. */
export const PLEIN_SECONDARY_HEADLINE =
  "font-plein font-bold text-[64px] leading-[76.8px]";

export const H2: TypographicComponent = ({ children, className }) => (
  <h2 className={clsx(PLEIN_SECONDARY_HEADLINE, className)}>{children}</h2>
);

export const PSecondaryHeadline: TypographicComponent = ({
  children,
  className,
}) => <p className={clsx(PLEIN_SECONDARY_HEADLINE, className)}>{children}</p>;

/** The primary subhead font and metrics. */
export const SWITZER_SUBHEAD =
  "font-switzer font-light text-[40px] leading-[48px] md:text-[50px] md:leading-[65px]";

/** Desktop-only subhead metrics. */
// export const SWITZER_LIGHT_50 =
//   "font-switzer text-[50px] leading-[65px] font-light";

/** Mobile-only subhead metrics. */
// export const SWITZER_LIGHT_40 =
//   "font-switzer text-[40px] leading-[48px] font-light";

export const H3: TypographicComponent = ({ children, className }) => (
  <h3 className={clsx(SWITZER_SUBHEAD, className)}>{children}</h3>
);

// smaller body fonts...

export const SWITZER_BOLD_28 =
  "font-switzer font-bold text-[28px] leading-[36.4px]";

export const Em28: TypographicComponent = ({ children, className }) => (
  <em className={clsx(SWITZER_BOLD_28, "not-italic", className)}>{children}</em>
);

export const SWITZER_REGULAR_28 =
  "font-switzer font-normal text-[28px] leading-[36.4px]";

export const P28: TypographicComponent = ({ children, className }) => (
  <p className={clsx(SWITZER_REGULAR_28, className)}>{children}</p>
);

export const SWITZER_REGULAR_24 =
  "font-switzer font-normal text-[24px] leading-[31.2px]";

export const P24: TypographicComponent = ({ children, className }) => (
  <p className={clsx(SWITZER_REGULAR_24, className)}>{children}</p>
);

export const SWITZER_BOLD_24 =
  "font-switzer font-bold text-[24px] leading-[36px]";

export const Em24: TypographicComponent = ({ children, className }) => (
  <em className={clsx(SWITZER_BOLD_24, "not-italic", className)}>{children}</em>
);

export const SWITZER_REGULAR_21 =
  "font-switzer font-normal text-[21px] leading-[31.5px]";

export const P21: TypographicComponent = ({ children, className }) => (
  <p className={clsx(SWITZER_REGULAR_21, className)}>{children}</p>
);

export const SWITZER_BOLD_21 =
  "font-switzer font-bold text-[21px] leading-[31.5px]";

export const Em21: TypographicComponent = ({ children, className }) => (
  <em className={clsx(SWITZER_BOLD_21, "not-italic", className)}>{children}</em>
);

// Another callout font

/** Desktop font metrics. */
// export const SWITZER_MEDIUM_32 =
//   "font-switzer font-medium text-[32px] leading-[36.4px]";

/** Mobile font metrics. */
// export const SWITZER_MEDIUM_28 =
//   "font-switzer font-medium text-[28px] leading-[32px]";

export const SWITZER_MEDIUM =
  "font-switzer font-medium text-[28px] leading-[32px] md:text-[32px] md:leading-[36.4px]";

export const PMedium: TypographicComponent = ({ children, className }) => (
  <p className={clsx(SWITZER_MEDIUM, className)}>{children}</p>
);

export const AMedium: TypographicLink = ({
  children,
  className,
  href,
  onClick,
}) => (
  <a
    href={href}
    onClick={onClick}
    className={clsx(
      SWITZER_MEDIUM,
      "cursor-pointer underline !leading-[44.8px]",
      className
    )}
  >
    {children}
  </a>
);
