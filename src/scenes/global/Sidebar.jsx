import { useState, useEffect } from 'react';
import { refreshToken } from '../authentication/tokenUtils';  // Import the refreshToken function
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'react-pro-sidebar/dist/css/styles.css';
import { tokens } from '../../theme';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import PieChartOutlineOutlinedIcon from '@mui/icons-material/PieChartOutlineOutlined';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
      <MenuItem
          active={selected === title}
          style={{ color: colors.grey[100] }}
          onClick={() => setSelected(title)}
          icon={icon}
      >
        <Link to={to} style={{ textDecoration: 'none', color: colors.grey[100] }}>
          <Typography>{title}</Typography>
        </Link>
      </MenuItem>
  );
};const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [user, setUser] = useState({ name: "Loading...", profile_picture: "" });

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token'); // Get token from local storage or however it's stored
      try {
        const response = await axios.get('/tokenIsValid', { headers: { Authorization: `Bearer ${token}` } });
        if (response.data) {
          setUser({ name: response.data.user.name, profile_picture: response.data.user.profile_picture });
          console.log(user.name)

        }

      } catch (error) {
        if (error.response && error.response.status === 500) {
          try {
            const newToken = await refreshToken();
            axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
            const response = await axios.get('/tokenIsValid', { headers: { Authorization: `Bearer ${newToken}` } });
            setUser({ name: response.data.user.name, profile_picture: response.data.user.profile_picture });
            console.log(user)
          } catch (refreshError) {
            console.error('Error after refreshing token', refreshError);
          }
        } else {
          console.error('Error fetching user data', error);
        }
      }
    };

    fetchData();
  }, []);

  return (
      <Box sx={{
        '& .pro-sidebar-inner': {
          background: `${colors.primary[400]} !important`,
        },
        '& .pro-icon-wrapper': {
          backgroundColor: 'transparent !important',
        },
        '& .pro-inner-item': {
          padding: '5px 35px 5px 20px !important',
        },
        '& .pro-inner-item:hover': {
          color: '#878FE9 !important',
        },
        '& .pro-menu-item.active': {
          color: '#2837E5 !important',
        },
      }}>
        <ProSidebar collapsed={isCollapsed}>
          <Menu iconShape="square">
            <MenuItem onClick={() => setIsCollapsed(!isCollapsed)} icon={isCollapsed ? <MenuOutlinedIcon /> : undefined} style={{ margin: '10px 0 20px 0', color: colors.grey[100] }}>
              {!isCollapsed && (
                  <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px">
                    <Typography variant="h3" color={colors.grey[100]}>Welcome Back</Typography>
                    <IconButton onClick={() => setIsCollapsed(!isCollapsed)}><MenuOutlinedIcon /></IconButton>
                  </Box>
              )}
            </MenuItem>

            {!isCollapsed && (
                <Box mb="25px">
                  <Box display="flex" justifyContent="center" alignItems="center">
                    <img alt="profile-user" width="100px" height="100px" src={user.profile_picture || '../../assets/user.png'} style={{ cursor: 'pointer', borderRadius: '50%' }} />
                  </Box>
                  <Box textAlign="center">
                    <Typography variant="h2" color={colors.grey[100]} fontWeight="bold" sx={{ m: '10px 0 0 0' }}>{user.name}</Typography>
                    <Typography variant="h5" color={colors.greenAccent[500]}>Ai recruit</Typography>
                  </Box>
                </Box>
            )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data
            </Typography>
            <Item
              title="Jobs"
              to="/team"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Applications"
              to="/Recruitment"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="quizs"
              to="/quizs"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="test quiz"
              to="/testquiz"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Contacts Information"
              to="/contacts"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Invoices Balances"
              to="/invoices"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Pages
            </Typography>
            <Item
              title="Profile Form"
              to="/form"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Calendar"
              to="/calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="FAQ Page"
              to="/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Charts
            </Typography>
            <Item
              title="Bar Chart"
              to="/bar"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Pie Chart"
              to="/pie"
              icon={<PieChartOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Line Chart"
              to="/line"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Geography Chart"
              to="/geography"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
