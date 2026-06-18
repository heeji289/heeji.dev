import Link from 'next/link';
import { contacts } from '@/lib/contact';

export default function ContactLinks() {
  return (
    <section className='space-y-3'>
      <h3 className='text-base font-medium'>contact</h3>
      <ul className='space-y-2 text-sm text-base-600 dark:text-base-300'>
        {contacts.map((contact) => (
          <li key={contact.label} className='flex flex-wrap items-center gap-2'>
            <span className='w-[62px] lowercase text-base-500 dark:text-base-400'>
              {contact.label}
            </span>
            <Link
              href={contact.href}
              target={contact.href.startsWith('http') ? '_blank' : undefined}
              rel={
                contact.href.startsWith('http')
                  ? 'noopener noreferrer'
                  : undefined
              }
              className='underline-offset-4 hover:underline'
            >
              {contact.value}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
