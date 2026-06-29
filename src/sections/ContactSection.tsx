import { useTranslation } from 'react-i18next';
import { Reveal } from '@/components/Reveal';

const contacts = [
  {
    no: 'CH.01',
    label: 'LinkedIn',
    handle: 'in/taeho-kim',
    href: 'https://www.linkedin.com/in/taeho-kim-0a504a335/',
  },
  {
    no: 'CH.02',
    label: 'Instagram',
    handle: '@taeho._.world',
    href: 'https://www.instagram.com/taeho._.world/',
  },
  {
    no: 'CH.03',
    label: 'Email',
    handle: 'domybestatleastonceaweek@gmail.com',
    href: 'mailto:domybestatleastonceaweek@gmail.com',
  },
];

const ContactSection = () => {
  const { t } = useTranslation();

  return (
    <section id="contact" aria-labelledby="contact-t">
      <div className="sec-head">
        <h2 className="sec-title" id="contact-t">
          <span className="ord">09</span> {t('Contact')}
        </h2>
        <div className="sec-meta">{t('ui.openToTalk')}</div>
      </div>
      <Reveal variant="up">
        <div className="contact-grid">
          {contacts.map((c) => {
            const external = !c.href.startsWith('mailto');
            return (
              <a
                key={c.label}
                className="contact-cell"
                href={c.href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
              >
                <span className="cc-no">{c.no}</span>
                <span className="cc-name">{c.label}</span>
                <span className="cc-handle">
                  {c.handle} <span aria-hidden="true">↗</span>
                </span>
              </a>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
};

export default ContactSection;
