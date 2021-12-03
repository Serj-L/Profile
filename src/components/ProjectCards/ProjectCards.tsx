import { FC, useRef, MouseEvent } from 'react';

import { IProjectsSlice } from '../../store/portfolioSlice';

import { DesktopIcon, MobileIcon, HeartIcon, HeartFilledIcon } from '../';

import styles from './ProjectCards.module.css';

interface ProjectCardsProps {
  projects: IProjectsSlice[],
  changePreviewTypeHandler: (id: string) => void,
  likeHandler: (id: string, isLiked: boolean) => void,
}

const ProjectCards: FC<ProjectCardsProps> = ({
  projects,
  changePreviewTypeHandler,
  likeHandler,
}) => {
  const cardsParentRef = useRef<HTMLDivElement>(null);

  const changePreviewHandler = (projectId: string, isMobilePreview: boolean, event: MouseEvent) => {
    const parentCard: HTMLDivElement | null = event.currentTarget.closest('div[data-card]');
    //const parentImg: Element | null = event.currentTarget.previousElementSibling;

    if (parentCard) {
      const currentHeight = parentCard.clientHeight;
      if (isMobilePreview) {
        parentCard.style.maxHeight = `${currentHeight}px`;
        changePreviewTypeHandler(projectId);
      } else {
        changePreviewTypeHandler(projectId);
        setTimeout(() => parentCard.style.maxHeight = 'unset', 1000);
      }
    }
  };

  return (
    <div
      className={styles.projectsWrapper}
      ref={cardsParentRef}
    >
      {
        projects.map((project) => (
          <div
            key={project.id}
            className={styles.projectCard}
            data-card={true}
          >
            <div className={styles.projectPreviewWrapper}>
              <img
                className={styles.projectPreview}
                src={project.isMobilePreview ? project.previewMobileImgRef : project.previewImgRef}
                alt="project preview"
              />
              <div
                className={styles.previewTypeIconWrapper}
                data-is-mobile-preview={project.isMobilePreview}
                onClick={(event) => changePreviewHandler(project.id, !project.isMobilePreview, event)}
              >
                {
                  project.isMobilePreview
                    ?
                    <MobileIcon width={24}/>
                    :
                    <DesktopIcon width={24}/>
                }
              </div>
              <div
                className={styles.likeIconWrapper}
                data-is-liked={project.isLiked}
                onClick={() => likeHandler(project.id, !project.isLiked)}
              >
                {
                  project.isLiked
                    ?
                    <HeartFilledIcon width={24}/>
                    :
                    <HeartIcon width={24}/>
                }
              </div>
            </div>
            <div
              className={styles.projectContentControlsWrapper}
            >
              <div className={styles.projectContent}>
                <h2 className={styles.projectTitle}>{project.title}</h2>
                <p className={styles.projectDescription}>{project.description}</p>
              </div>
              <div className={styles.projectControls}>
                <div className={styles.projectRaiting}>
                  Raitng: {project.raiting < 0 ? 0 : project.raiting} {project.raiting === 1 ? 'heart' : 'hearts'}
                </div>
                <div className={styles.projectLinksWrapper}>
                  <a
                    className={styles.projectLink}
                    href={project.sourceCodeRef}
                    target="_blank"
                    rel="noreferrer"
                  >
                  Source code
                  </a>
                  <a
                    className={styles.projectLink}
                    href={project.demoRef}
                    target="_blank"
                    rel="noreferrer"
                  >
                  Demo
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default ProjectCards;
