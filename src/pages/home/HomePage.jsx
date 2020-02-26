import React from 'react';
import { Container, Typography, Grid, Box, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { format } from 'date-fns';

import { FirebaseContext } from '../../firebase';
import serviceList from '../../service-list/serviceList';

import CreateTicketModal from '../../components/create-ticket-modal/CreateTicketModal';

const serviceListA = serviceList.filter(({ category }) => category === 'A');
const serviceListB = serviceList.filter(({ category }) => category === 'B');
const serviceListC = serviceList.filter(({ category }) => category === 'C');

const useStyles = makeStyles(theme => ({
  tickets: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: '12px',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(38)
    }
  },
  ticketGrid: {
    padding: 0
  }
}));

// COMPONENT
const HomePage = () => {
  const { currentUser } = React.useContext(FirebaseContext);

  const classes = useStyles();

  const renderDate = () => (
    <Box fontWeight="fontWeightRegular" letterSpacing={6} fontSize={24}>
      {format(new Date(), 'do MMMM yyyy')}
    </Box>
  );

  const renderGreeting = () => {
    const currentHour = Number(format(new Date(), 'H'));
    let greetingMessage = '';

    if (currentHour >= 2 && currentHour < 12) greetingMessage = 'Good Morning';
    else if (currentHour >= 12 && currentHour < 6)
      greetingMessage = 'Good Afternoon';
    else greetingMessage = 'Good Evening';

    if (currentUser && !currentUser.displayName.includes('Display')) {
      const name = currentUser.displayName.split(' ')[0];
      return (
        <Box fontWeight="fontWeightLight" letterSpacing={3} fontSize={48}>
          {greetingMessage + ', ' + name}
        </Box>
      );
    }

    return (
      <Box fontWeight="fontWeightLight" letterSpacing={3} fontSize={48}>
        {greetingMessage}
      </Box>
    );
  };

  const renderHeading = () => (
    <Grid
      container
      direction="row"
      justify="center"
      style={{ paddingBottom: '24px' }}
    >
      <Grid item xs={12} md={8}>
        <Typography align="left" component="div">
          {renderDate()}
          {renderGreeting()}
        </Typography>
        <Typography variant="h6" align="left">
          <Box fontWeight="fontWeightRegular" letterSpacing={2} fontSize={14}>
            {!currentUser &&
              'Sign in or Register to save your information for your next visit.'}
            <div style={{ margin: '12px 0' }}>
              <Divider />
            </div>
            Get started by selecting one of the three ticket categories below.
            <br />
            Each ticket category covers a different set of services.
          </Box>
        </Typography>
      </Grid>
      <Grid item xs={12} md={4}>
        {currentUser && (
          <Typography align="right" component="div">
            Your ticket:
          </Typography>
        )}
      </Grid>
    </Grid>
  );

  const renderTickets = () => (
    <>
      <Grid>
        <Typography variant="h6">
          <Box fontWeight="fontWeightLight" letterSpacing={2} fontSize={32}>
            - Currently Serving -
          </Box>
        </Typography>
      </Grid>
      <Grid container className={classes.tickets}>
        {/* Ticket A */}
        <Grid
          display="flex"
          flexdirection="column"
          className={classes.ticketGrid}
        >
          <CreateTicketModal currentTicket={{ category: 'A', id: 64 }} />
          <Typography
            align="left"
            component="div"
            style={{
              padding: '12px 4px',
              marginBottom: '12px'
            }}
          >
            <Box fontWeight="fontWeightRegular" letterSpacing={1} fontSize={16}>
              Services include:
            </Box>
            <Box
              fontWeight="fontWeightRegular"
              letterSpacing={1}
              fontSize={14}
              style={{ paddingLeft: '8px', paddingRight: '8px' }}
            >
              {serviceListA.map(service => (
                <div key={service.id}>
                  <p style={{ marginBottom: '2px' }}>
                    {service.name} - {service.price}sr ~ {service.duration} mins
                  </p>
                  <Divider />
                </div>
              ))}
            </Box>
          </Typography>
        </Grid>

        {/* Ticket B */}
        <Grid
          display="flex"
          flexdirection="column"
          className={classes.ticketGrid}
        >
          <CreateTicketModal currentTicket={{ category: 'B', id: 26 }} />
          <Typography
            align="left"
            component="div"
            style={{
              padding: '12px 4px',
              marginBottom: '12px'
            }}
          >
            <Box fontWeight="fontWeightRegular" letterSpacing={1} fontSize={16}>
              Services include:
            </Box>
            <Box
              fontWeight="fontWeightRegular"
              letterSpacing={1}
              fontSize={14}
              style={{ paddingLeft: '8px', paddingRight: '8px' }}
            >
              {serviceListB.map(service => (
                <div key={service.id}>
                  <p style={{ marginBottom: '2px' }}>
                    {service.name} - {service.price}sr ~ {service.duration} mins
                  </p>
                  <Divider />
                </div>
              ))}
            </Box>
          </Typography>
        </Grid>

        {/* Ticket C */}
        <Grid
          display="flex"
          flexdirection="column"
          className={classes.ticketGrid}
        >
          <CreateTicketModal currentTicket={{ category: 'C', id: 6 }} />
          <Typography
            align="left"
            component="div"
            style={{
              padding: '12px 4px',
              marginBottom: '12px'
            }}
          >
            <Box fontWeight="fontWeightRegular" letterSpacing={1} fontSize={16}>
              Services include:
            </Box>
            <Box
              fontWeight="fontWeightRegular"
              letterSpacing={1}
              fontSize={14}
              style={{ paddingLeft: '8px', paddingRight: '8px' }}
            >
              {serviceListC.map(service => (
                <div key={service.id}>
                  <p style={{ marginBottom: '2px' }}>
                    {service.name} - {service.price}sr ~ {service.duration} mins
                  </p>
                  <Divider />
                </div>
              ))}
            </Box>
          </Typography>
        </Grid>
      </Grid>
    </>
  );

  return (
    <Container style={{ padding: '24px' }}>
      {/* Heading */}
      {renderHeading()}

      {/* Tickets */}
      {renderTickets()}
    </Container>
  );
};

export default HomePage;
