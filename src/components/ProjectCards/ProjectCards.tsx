import { FC } from 'react';

import { IProjectsSlice } from '../../store/portfolioSlice';

import {
  DesktopIcon,
  MobileIcon,
  HeartIcon,
  HeartFilledIcon,
  ShevronIcon,
} from '../';

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

  const openProjectDetailsHandler = (node: HTMLDivElement) => {
    const projectDetailsCard = node.closest('div[data-is-visible]');
    if (projectDetailsCard) {
      const isProjectDetailsVisible = projectDetailsCard.getAttribute('data-is-visible') === 'true' ? true : false;

      projectDetailsCard.setAttribute('data-is-visible', `${!isProjectDetailsVisible}`);
      node.setAttribute('data-is-up', `${isProjectDetailsVisible}`);
    }
  };

  return (
    <div className={styles.projectsContainer}>
      <div
        className={styles.projectsWrapper}
      >
        {
          projects.map((project) => (
            <div
              key={project.id}
              className={styles.projectCard}
              style={{ background: `var(--clr-ui) url(${project.isMobilePreview ? project.previewMobileImgRef : project.previewImgRef}) ${project.isMobilePreview ? 'left' : '25%'} / cover no-repeat` }}
            >
              <div className={styles.projectCategory}>{project.category}</div>
              <div className={styles.iconsWrapper}>
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
                <div
                  className={styles.previewTypeIconWrapper}
                  data-is-mobile-preview={project.isMobilePreview}
                  onClick={() => changePreviewTypeHandler(project.id)}
                >
                  {
                    project.isMobilePreview
                      ?
                      <MobileIcon width={24}/>
                      :
                      <DesktopIcon width={24}/>
                  }
                </div>
              </div>
              <div
                className={styles.projectContentControlsWrapper}
                data-is-visible='false'
              >
                <div
                  className={styles.openProjectContentBtn}
                  data-is-up={true}
                  onClick={(event) => openProjectDetailsHandler(event.currentTarget)}
                >
                  <ShevronIcon
                    width={24}
                  />
                </div>
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
    </div>
  );
};

export default ProjectCards;
