import { Avatar, Box, Button, Container, TextField, Typography } from '@mui/material';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import React, { useState } from 'react';
import { SecurityBreach } from './models/securityBreach';
import BasicModal from './basic-modal';

function App() {
  const [breaches, setBreaches] = React.useState<SecurityBreach[]>([]);
  const [email, setEmail] = useState('');

  const fetchSecurityBreaches = async () => {
    const response = await fetch(`http://localhost:8080/breaches?email=${ email }`, {
      method: 'GET'
    });

    const data: SecurityBreach[] = await response.json();
    setBreaches(data);
  }

  const logoCellRenderer = (params: any) => {
    return `<img src="${params.value}" style="height: 90%; max-width: 150px"></img>`;
  };
  const nameCellRenderer = (params: any) => {
    return `<a href="https://www.${params.data.domain}" target="_blank">${ params.data.name }</a>`;
  };

  return (
    <Container component="main" maxWidth="md">
      <Box sx={{
            marginY: 6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Avatar sx={{ m: 1, bgcolor: 'black' }}>
            <p>BT</p>
          </Avatar>
          <Typography component="h1" variant="h5">
            Security Breaches
          </Typography>
      </Box>

      <TextField
        fullWidth
        label="Email Address"
        autoComplete="email"
        autoFocus
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={fetchSecurityBreaches}>
        Verify
      </Button>
      <div className="ag-theme-alpine-dark" style={{ width: '100%', height: '400px' }}>
        <div style={{ width: "100%", height: "100%" }}>
          <AgGridReact
            rowData={breaches}
            frameworkComponents={{
              descriptionCellRenderer: BasicModal,
            }}
            defaultColDef={{
              editable: true,
              filter: 'agTextColumnFilter',
              sortable: true
          }}>
              <AgGridColumn field="logo"  cellRenderer={ logoCellRenderer }></AgGridColumn>
              <AgGridColumn field="name"   cellRenderer={ nameCellRenderer }></AgGridColumn>
              <AgGridColumn field="description" cellRenderer="descriptionCellRenderer"></AgGridColumn>
              <AgGridColumn field="date" filter="agDateColumnFilter"></AgGridColumn>
          </AgGridReact>
          </div>
      </div>
    </Container>
  );  
}

export default App;
