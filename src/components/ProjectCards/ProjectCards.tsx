import { FC, useState, WheelEvent } from 'react';

import { IProjectsSlice } from '../../store/portfolioSlice';

import {
  DesktopIcon,
  MobileIcon,
  HeartIcon,
  HeartFilledIcon,
  ShevronIcon,
} from '../';

import imgBlank from '../../images/file-image-regular.svg';
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
  const [activeProjectDetailsId, setActiveProjectDetailsId] = useState<string>('');
  const [likesProjectIdList, setLikesProjectIdList] = useState<Set<string>>(new Set());

  const onLikeBtnClickHandler = (projectId: string, isLiked: boolean) => {
    likeHandler(projectId, isLiked);
    const likesProjects = new Set(likesProjectIdList);
    likesProjects.has(projectId) ? likesProjects.delete(projectId) : likesProjects.add(projectId);
    setLikesProjectIdList(likesProjects);
  };
  const openProjectDetailsHandler = (projectId: string) => {
    activeProjectDetailsId === projectId ? setActiveProjectDetailsId('') : setActiveProjectDetailsId(projectId);
  };
  const onMouseWheelHandler = (e: WheelEvent) => {
    const moveDirection = e.deltaY > 0 ? 'left' : 'right';

    if (
      (moveDirection === 'right' && !e.currentTarget.scrollLeft)
      ||
      (moveDirection === 'left' && e.currentTarget.scrollWidth - e.currentTarget.scrollLeft === e.currentTarget.clientWidth)) {
      return;
    }

    const projectCardElement = e.currentTarget.firstChild as HTMLElement;
    const scrollDistance = projectCardElement.clientWidth / 2;

    e.currentTarget.scrollTo({
      left: moveDirection === 'left' ? e.currentTarget.scrollLeft + scrollDistance : e.currentTarget.scrollLeft - scrollDistance,
      behavior: 'smooth',
    });
  };

  return (
    <div className={styles.projectsContainer}>
      <div
        className={styles.projectsWrapper}
        onWheel={e => onMouseWheelHandler(e)}
      >
        {
          projects.map((project) => (
            <div
              key={project.id}
              className={styles.projectCard}
              style={{ background: `url(${project.isMobilePreview ? project.previewMobileImgRef : project.previewImgRef}) ${project.isMobilePreview ? 'top left' : '25%'} / cover no-repeat, var(--clr-ui) url(${imgBlank}) center / 40% no-repeat ` }}
            >
              <div className={styles.projectCategory}>{project.category}</div>
              <div className={styles.iconsContainer}>
                <div className={styles.iconsWrapper}>
                  <div
                    className={styles.likeIconWrapper}
                    data-is-liked={project.isLiked || likesProjectIdList.has(project.id)}
                    onClick={() => onLikeBtnClickHandler(project.id, !project.isLiked)}
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
                    className={styles.likeTooltip}
                  >
                    {project.isLiked ? 'Dislike :(' : 'Like :)'}
                  </div>
                </div>
                <div className={styles.iconsWrapper}>
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
                  <div
                    className={styles.previewTypeTooltip}
                  >
                    {project.isMobilePreview ? 'Switch to desktop preview' : 'Switch to mobile preview'}
                  </div>
                </div>

              </div>
              <div
                className={styles.projectContentControlsWrapper}
                data-is-visible={activeProjectDetailsId === project.id}
              >
                <div
                  className={styles.projectContentTogglerWrapper}
                  data-is-up={activeProjectDetailsId !== project.id}
                >
                  <div
                    className={styles.projectContentTogglerBtn}
                    data-is-up={activeProjectDetailsId !== project.id}
                    onClick={() => openProjectDetailsHandler(project.id)}
                  >
                    <ShevronIcon width={24}/>
                  </div>
                  <div className={styles.openProjectContentBtnTooltip}>{activeProjectDetailsId !== project.id ? 'Open' : 'Close'} project details</div>
                </div>
                <div className={styles.projectContent}>
                  <h2 className={styles.projectTitle}>{project.title}</h2>
                  <p className={styles.projectDescription}>{project.description}</p>
                </div>
                <div className={styles.projectControls}>
                  <div className={styles.projectRaiting}>
                    Likes: {project.raiting}
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
