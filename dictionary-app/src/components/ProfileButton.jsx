import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, CircularProgress, Popover } from '@mui/material';
import { FaUser } from 'react-icons/fa';
import { getMe } from '../api';

const ProfileButton = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleClickOpen = async (event) => {
        setAnchorEl(event.currentTarget);
        setLoading(true);
        try {
            const data = await getMe();
            setProfile(data);
            setError(null);
        } catch (error) {
            setError('Failed to load profile');
            setProfile(null);
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <div>
            <div
                onClick={handleClickOpen}
                style={{
                    backgroundColor: '#FF914D',
                    borderRadius: '50%',
                    padding: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    width: '20px',
                    height: '20px',
                }}
            >
                <FaUser style={{ color: 'white', fontSize: '1.1rem' }} />
            </div>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                PaperProps={{
                    style: {
                        padding: '20px',
                        borderRadius: '8px',
                        boxShadow: '0 1px 5px rgba(0, 0, 0, 0.2)',
                    },
                }}
            >
                <DialogTitle>Profile Information</DialogTitle>
                <DialogContent>
                    {loading && <CircularProgress />}
                    {error && <Typography color="error">{error}</Typography>}
                    {profile && (
                        <div>
                            <Typography variant="h6">Name: {profile.userName}</Typography>
                            <Typography variant="body1">Email: {profile.email}</Typography>
                        </div>
                    )}
                </DialogContent>
            </Popover>
        </div>
    );
};

export default ProfileButton;
