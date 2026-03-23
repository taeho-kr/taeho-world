interface SpacingProps {
  size: number;
}

const Spacing = ({ size }: SpacingProps) => {
  return <div style={{ height: size }} />;
};

export default Spacing;
