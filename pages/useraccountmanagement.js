import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import {
  Avatar,
  Button,
  CssBaseline,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
  Container,
  Divider,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IconButton from "@mui/material/IconButton";
import ArrowBack from "@mui/icons-material/ArrowBack";


const defaultTheme = createTheme();

export default function UserAccountManagement() {
  const [users, setUsers] = useState([]);
  const router = useRouter(); // Access the router


  useEffect(() => {
    // Fetch users on component mount
    axios.get('http://localhost:3001/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:3001/users/${userId}`);

      // Filter out the deleted user from the list
      const updatedUsers = users.filter(user => user.id !== userId);
      setUsers(updatedUsers);

      console.log('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleGoBack = () => {
    router.push("/admin"); // Redirect to the homepage
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div
          style={{
            marginTop: '8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <IconButton onClick={handleGoBack} sx={{ position: "absolute", top: 20, left: 20 }}>
            <ArrowBack />
          </IconButton>
          <Avatar style={{ margin: '8px', backgroundColor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            User Account Management
          </Typography>
          <Divider style={{ width: '100%', marginTop: '16px' }} />
          <List style={{ width: '100%', marginTop: '16px' }}>
            {users.map((user) => (
              <ListItem key={user.id}>
                <ListItemText
                  primary={`ID: ${user.id}`}
                  secondary={`Name: ${user.firstName} ${user.lastName}`}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDelete(user.id)}
                  style={{ marginLeft: '8px' }}
                >
                  Delete
                </Button>
              </ListItem>
            ))}
          </List>
        </div>
      </Container>
    </ThemeProvider>
  );
}
