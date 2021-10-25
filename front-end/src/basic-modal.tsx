import { Box, Button, Modal, Typography } from "@mui/material";
import React from "react";
import parse from 'html-react-parser';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

// @ts-ignore
export default function BasicModal(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    return (
      <div>
        <Button onClick={handleOpen} variant="contained" style={{ marginBottom: "4px" }}>Open Description</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography component="p">
              <div>{ parse(props.value) }</div>
            </Typography>
          </Box>
        </Modal>
      </div>
    );
  }