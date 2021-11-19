import { FC } from 'react';

import { LinkedInIcon, GitHubIcon, CodeWarsIcon } from '..';

import styles from './SocialsNavigation.module.css';

interface SocialsNavigationProps {}

const SocialsNavigation: FC<SocialsNavigationProps> = () => {
  return (
    <nav className={styles.socialsNavListWrapper}>
      <ul className={styles.socialsNavList}>
        <li>
          <a
            className={styles.socialsNavLink}
            href="https://www.linkedin.com/in/serj-l"
            target="_blank"
            rel="noreferrer"
          >
            <LinkedInIcon
              width={30}
            />
          </a>
        </li>
        <li>
          <a
            className={styles.socialsNavLink}
            href="https://github.com/Serj-L"
            target="_blank"
            rel="noreferrer"
          >
            <GitHubIcon
              width={30}
            />
          </a>
        </li>
        <li>
          <a
            className={styles.socialsNavLink}
            href="https://www.codewars.com/users/Serj-L"
            target="_blank"
            rel="noreferrer"
          >
            <CodeWarsIcon
              width={29}
            />
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default SocialsNavigation;
