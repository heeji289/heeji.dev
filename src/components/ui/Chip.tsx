import React from 'react';
import { Badge, BadgeProps } from './badge';

type Chip = {
  text: string;
  theme: BadgeProps['variant'];
  onClickCallback: () => void;
};

export default function Chip({ text, theme, onClickCallback }: Chip) {
  return (
    <Badge
      variant={theme}
      onClick={onClickCallback}
      style={{
        cursor: 'pointer',
      }}
    >
      {text}
    </Badge>
  );
}
