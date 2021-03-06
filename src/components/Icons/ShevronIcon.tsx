import { FC } from 'react';

interface ShevronIconProps {
  width?: number,
  color?: string,
  rotate?: number,
}

const ShevronIcon: FC<ShevronIconProps> = ({
  width = 20,
  color = 'currentColor',
  rotate = 0,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
      width={width}
      height={width}
      viewBox="0 0 448 512"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <path
        d="M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z"
        fill={color}
      />
    </svg>
  );
};

export default ShevronIcon;
