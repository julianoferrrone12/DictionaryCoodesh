import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Tabs, Tab, Box } from '@mui/material';
import ProfileButton from '../components/ProfileButton';

const MainLayout = () => {
    const location = useLocation();
    const path = location.pathname;

    const getTabValue = (path) => {
        switch (path) {
            case '/favorites':
                return 1;
            case '/history':
                return 2;
            default:
                return 0;
        }
    };

    const [value, setValue] = React.useState(getTabValue(path));

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    React.useEffect(() => {
        setValue(getTabValue(location.pathname));
    }, [location.pathname]);

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}>
                    Online  <span style={styles.highlight}> Dictionary</span>
                </h1>
                <ProfileButton style={styles.profileButton} />
            </div>
            <Box sx={{ width: '100%' }}>
                <div style={styles.tabsContainer}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="tabs"
                        TabIndicatorProps={{
                            style: {
                                backgroundColor: '#FF914D',
                            },
                        }}
                        textColor="inherit"
                        sx={{
                            '& .MuiTab-root': {
                                color: '#FF914D',
                            },
                        }}
                    >
                        <Tab label="Words" component={Link} to="/" />
                        <Tab label="Favorites" component={Link} to="/favorites" />
                        <Tab label="History" component={Link} to="/history" />
                    </Tabs>
                </div>
            </Box>
            <div style={styles.content}>
                <Outlet />
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    header: {
        padding: '10px 20px 20px 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        marginBottom: '20px',
    },
    title: {
        fontSize: '2.5rem',
        margin: 0,
        textAlign: 'center',
        flex: 1,
    },
    highlight: {
        color: '#FF914D',
        fontStyle: 'italic',
    },
    tabsContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        padding: '50px 50px 20px',
        flex: 1,
    },
};

export default MainLayout;
