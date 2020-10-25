import React from 'react';
import GridCardList from '../shared/GridCardList';
import ProjectCard from './ProjectCard';

const ProjectCardList = ({ projects }) => {
  return (
    <section>
      <GridCardList
        data={projects}
        getItemKey={(project) => project.title}
        renderItem={(project) => <ProjectCard data={project} />}
      />
    </section>
  );
};

export default ProjectCardList;
