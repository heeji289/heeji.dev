import { Metadata } from 'next';
import ContactLinks from '@/components/ContactLinks';

export const metadata: Metadata = {
  title: 'About | heeji.dev',
};

export default function AboutPage() {
  return (
    <div className='space-y-10'>
      <section className='space-y-2'>
        <h2 className='text-2xl font-semibold'>about</h2>
      </section>

      <section className='space-y-3 text-sm leading-relaxed text-base-700 dark:text-base-200'>
        <p>개발을 하면서 구현 과정, 문제 해결, 학습 내용을 기록합니다.</p>
        <p>
          이 블로그는 완성된 답을 보여주기보다 생각과 시행착오를 기록하는 데
          목적이 있습니다.
        </p>
      </section>

      <ContactLinks />
    </div>
  );
}
