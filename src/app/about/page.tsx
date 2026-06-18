import { Metadata } from 'next';
import ContactLinks from '@/components/ContactLinks';

export const metadata: Metadata = {
  title: 'About | heeji.dev',
};

type Experience = {
  period: string;
  items: {
    title: string;
    descriptions: string[];
  }[];
};

const experiences: Experience[] = [
  {
    period: '2022~2023',
    items: [
      {
        title: 'Looko',
        descriptions: [
          '의류 판매 관리 SaaS, Looko-AI 개발',
          'AI 데이터 라벨링 백오피스 개발',
          '디지털 옷장 앱 (크로스플랫폼), Acloset 개발',
        ],
      },
    ],
  },
  {
    period: '2021~2022',
    items: [
      {
        title: 'NEXT-STEP Clean Code JavaScript 1기',
        descriptions: ['JavaScript'],
      },
      {
        title: '엘리스 AI 서비스 기획 및 개발 트랙 2기',
        descriptions: [
          'OTT 플랫폼 추천 웹 서비스 프론트엔드 개발',
          'AI 예술 웹 사이트 프론트엔드 개발',
        ],
      },
    ],
  },
  {
    period: '2015~2021',
    items: [
      {
        title: '아주대학교 전자공학과, 임베디드 SW 트랙 졸업',
        descriptions: [
          '자동차 번호판 인식 안드로이드 앱 개발 프로젝트 경험',
          '위성 영상에서 딥러닝 기법을 활용한 도로 검출 개선 프로젝트 경험',
        ],
      },
    ],
  },
];

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

      <section className='space-y-6'>
        <h3 className='text-base font-medium'>experience</h3>
        <div className='space-y-8'>
          {experiences.map((experience) => (
            <div
              key={experience.period}
              className='grid grid-cols-[5.5rem_1fr] gap-x-4 gap-y-3'
            >
              <span className='pt-0.5 font-mono text-xs text-base-500 dark:text-base-400'>
                {experience.period}
              </span>
              <div className='space-y-4'>
                {experience.items.map((item) => (
                  <div key={item.title} className='space-y-1'>
                    <p className='text-sm font-medium text-base-900 dark:text-base-50'>
                      {item.title}
                    </p>
                    <ul className='space-y-1 text-sm text-base-600 dark:text-base-300'>
                      {item.descriptions.map((description) => (
                        <li key={description} className='flex gap-2'>
                          <span className='text-base-400 dark:text-base-500'>
                            ·
                          </span>
                          <span>{description}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <ContactLinks />
    </div>
  );
}
