import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Requests from './screens/Requests';
import Myrequests from './screens/Myrequests';
import PendingRequests from './screens/PendingRequests';
import AssignedToMe from './screens/AssignedToMe';
import { useContext } from 'react';
import { UserContext } from '../App';    
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  
  return (
    <div
      role="tabpanel"
      style={{height:'100vh'}}
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
  const {state} = useContext(UserContext)
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (   <>        
   <div style={{ width:'100%',marginTop:'30px', textAlign:'center',border:'none'}}>
  <h1 style={{fontFamily:'monospace'}}>Requests</h1> 
  </div>

    { state &&
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
        <Tab label="Assigned" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>    
      {state.accountType === 'Artist' &&  <Requests/>}
      {state.accountType === 'Customer' &&  <Myrequests/>}

      </TabPanel>
      <TabPanel value={value} index={1}>    
        <PendingRequests/>
      </TabPanel>
      <TabPanel value={value} index={2}>    
        <AssignedToMe/>
      </TabPanel>
    </Box>  
        }</>
  );
}
