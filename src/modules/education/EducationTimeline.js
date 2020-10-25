import React from 'react';
import { Typography } from '@material-ui/core';
import SchoolOutlinedIcon from '@material-ui/icons/SchoolOutlined';
import { Timeline, TimelineItem } from '../shared/Timeline';

function EducationTimeline({ items }) {
  return (
    <Timeline>
      {items.map((item) => {
        const dateRange = `${item.startYear} - ${item.endYear}`;
        return (
          <TimelineItem
            key={dateRange}
            date={dateRange}
            icon={<SchoolOutlinedIcon />}
            title={item.school}
            subtitle={item.fieldOfStudy}
            location={item.location}
            content={
              <Typography variant="subtitle2" color="textSecondary">
                {item.grade}
              </Typography>
            }
          />
        );
      })}
    </Timeline>
  );
}

export default EducationTimeline;
