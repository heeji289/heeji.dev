import React from 'react';

type Chip = {
  text: string;
  theme: 'default' | 'info';
  onClickCallback: () => void;
};

type ChipColorSet = {
  [key in Chip['theme']]: {
    backgroundColor: string;
    borderColor: string;
  };
};

const colors: ChipColorSet = {
  default: {
    backgroundColor: 'gray-900/10',
    borderColor: 'gray-300',
  },
  info: {
    backgroundColor: 'blue-500',
    borderColor: 'blue-300',
  },
};

export default function Chip({ text, theme, onClickCallback }: Chip) {
  return (
    <button
      onClick={onClickCallback}
      className={`relative  grid select-none items-center whitespace-nowrap rounded-sm bg-${colors[theme].backgroundColor} py-1 px-2 text-xs font-semi-bold uppercase text-gray-900 dark:text-white border-2 border-${colors[theme].borderColor}`}
    >
      {text}
    </button>
  );
}
