import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Sideabar from "./Sidebar/Sideabar";
import Typography from "@mui/material/Typography";
import React, {useEffect, UseEffect} from "react";
import Button from "@mui/material/Button";
import MenuItem from '@mui/material/MenuItem';
import { useDispatch } from "react-redux";
// import { create } from "../../redux/channel/operation";
import { createPayment, loadPayments } from "../../redux/payment/operation";
import { useAllUserChannels } from "../../redux/channel/selectors";
import { loadAllChannels, loadChannels } from "../../redux/channel/operation";
import {useChannels } from "../../redux/channel/selectors";

const theme = createTheme();

export default function CreatePayment() {
    const dispatch = useDispatch()
    const userChannels = useChannels();
    const allChannels = useAllUserChannels();
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        console.log('payment', {
          amount: data.get('amount'),
          send_channel: data.get('send_channel'),
          receive_channel: data.get('receive_channel'),
          reason: data.get('reason'),
        })
        dispatch(createPayment({
          amount: data.get('amount'),
          send_channel: data.get('send_channel'),
          receive_channel: data.get('receive_channel'),
          reason: data.get('reason'),
        }));
      };

    useEffect(() => {
        if (userChannels.length === 0 || allChannels.length === 0) {
            dispatch(loadAllChannels());
            dispatch(loadChannels());
        }
    }, [])

  return (
      <Sideabar active='/create-payment'>
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            {/*<CssBaseline />*/}
            <Typography component="h1" variant="h5">
                Create a new payment
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
                  id="amount"
                  label="Amount"
                  name="amount"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="send_channel"
                  label="Choose Payment Channel"
                  name="send_channel"
                  select
                >
                   {userChannels.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                            {option.name}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="receive_channel"
                  label="Send To"
                  name="receive_channel"
                  select
                >
                   {allChannels.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                            {option.user.email} {option.name}
                        </MenuItem>
                    ))}
                </TextField>
                 <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="reason"
                  label="Reason"
                  name="reason"
                  multiline
                  rows="5"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Create New Payment
                </Button>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </Sideabar>
  );
}