'use client';

import { MDXContent } from '@content-collections/mdx/react';
import { ReactNode } from 'react';
import ContentSection from './ContentSection';

// TODO: Next Image로 변경

type Props = {
  code: string;
};

type HeadingProps = {
  id?: string;
  children?: ReactNode;
};

const heading = (As: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6') => {
  const Heading = ({ id, children }: HeadingProps) => (
    <div>
      <As id={id}>{children}</As>
    </div>
  );
  Heading.displayName = As;
  return Heading;
};

const Markdown = ({ code }: Props) => {
  return (
    <ContentSection>
      <MDXContent
        code={code}
        components={{
          h1: heading('h1'),
          h2: heading('h2'),
          h3: heading('h3'),
          h4: heading('h4'),
          h5: heading('h5'),
          h6: heading('h6'),
        }}
      />
    </ContentSection>
  );
};

export default Markdown;
