import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Sideabar from "./Sidebar/Sideabar";
import Typography from "@mui/material/Typography";
import React from "react";
import Button from "@mui/material/Button";
import MenuItem from '@mui/material/MenuItem';
import { useDispatch } from "react-redux";
import {createChannel} from "../../redux/channel/operation";

const theme = createTheme();

export default function CreateChannel() {
    const dispatch = useDispatch()
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        dispatch(createChannel({
          type: data.get('type'),
          currency: data.get('currency'),
          name: data.get('name'),
        }));
      };

  return (
      <Sideabar active='/create-channel'>
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            {/*<CssBaseline />*/}
            <Typography component="h1" variant="h5">
                Create a new payment channel
            </Typography>
            <Box
              sx={{
                // marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="type"
                  label="Type"
                  name="type"
                  autoFocus
                  select
                >
                    {['MM', 'BANK'].map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="currency"
                  label="Currency"
                  name="currency"
                  select
                >
                   {['UGX', 'USD'].map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                    ))}
                </TextField>
                 <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Create New Channel
                </Button>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </Sideabar>
  );
}