interface Props {
  title: string;
  onClick: () => void;
}

const Button: React.FC<Props> = ({ title, onClick }) => (
  <button
    className="font-plein font-medium text-[18px] leading-[25.2px] border border-sun uppercase bg-transparent px-4 py-2 text-sun hover:text-inherit hover:bg-sun transition-colors duration-200"
    onClick={onClick}
  >
    {title}
  </button>
);

export const DonateNowButton: React.FC = () => (
  <Button
    title="Donate Now"
    onClick={() => document.getElementById("donateNow")?.scrollIntoView()}
  />
);

export default Button;
