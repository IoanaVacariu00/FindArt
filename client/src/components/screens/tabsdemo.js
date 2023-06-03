import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Requests from './Requests';
import PendingRequests from './PendingRequests';
import AssignedToMe from './AssignedToMe';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
        <div>{children}</div> 
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        style={{ 
          position:'fixed', zIndex:2, background:"white",
        bottom:'auto',
        left: 0,  top: 70 }}
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }} 
      >
        <Tab label="All" {...a11yProps(0)} />
        <Tab label="Pending" {...a11yProps(1)} />
        <Tab label="Assigned to Me" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>    
        <Requests/>
      </TabPanel>
      <TabPanel value={value} index={1}>    
        <PendingRequests/>
        
      </TabPanel>
      <TabPanel value={value} index={2}>    
        <AssignedToMe/>
        
      </TabPanel>
    </Box>
  );
}
