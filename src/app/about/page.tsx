import Link from 'next/link';
import React from 'react';
import { FaGithubSquare, FaLinkedin } from 'react-icons/fa';

type Experience = {
  period: string;
  items: {
    title: string;
    descriptions: string[];
  }[];
};

const experienceData: Experience[] = [
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

const GITHUB_LINK = 'https://github.com/heeji289';
const LINKEDIN_LINK = 'https://www.linkedin.com/in/heeji289';

export default function AboutPage() {
  return (
    <div className='flex flex-col items-center pt-6 gap-4'>
      <div className='flex flex-col items-center'>
        <h1 className='text-4xl'>임희지</h1>
        <p>Frontend Engineer</p>
      </div>

      <div className='flex gap-4'>
        <Link href={GITHUB_LINK} target={'_blank'}>
          <FaGithubSquare size={40} />
        </Link>

        <Link href={LINKEDIN_LINK} target={'_blank'}>
          <FaLinkedin size={40} />
        </Link>
      </div>

      <div className='w-full flex flex-col gap-6'>
        {experienceData.map((data) => (
          <div
            key={data.period}
            className='flex divide-x-2 divide-stone-900 dark:divide-zinc-100'
          >
            <p className='w-32'>{data.period}</p>

            <div className='pl-4'>
              <div className='flex flex-col gap-4'>
                {data.items.map((item) => (
                  <div key={item.title}>
                    <p>{item.title}</p>

                    {item.descriptions.map((description) => (
                      <li key={description}>{description}</li>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
