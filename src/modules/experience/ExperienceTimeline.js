import React from 'react';
import { Box, Typography } from '@material-ui/core';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';
import { Timeline, TimelineItem } from '../shared/Timeline';

function ExperienceTimeline({ items }) {
  return (
    <Timeline>
      {items.map((item) => {
        return (
          <TimelineItem
            key={item.dateRange}
            date={item.dateRange}
            icon={<WorkOutlineIcon />}
            title={item.jobTitle}
            subtitle={item.company}
            location={item.location}
            content={
              <Box marginTop={1}>
                <Typography variant="subtitle2">{item.description}</Typography>
              </Box>
            }
          />
        );
      })}
    </Timeline>
  );
}

export default ExperienceTimeline;
