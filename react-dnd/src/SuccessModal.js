import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
};

export default function BasicModal({ open, setOpen, files, parentSetOpen }) {
    const handleClose = () => {
        setOpen(false);
        parentSetOpen(false);
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <h3>You uploaded:</h3>
                    {Object.entries(files).map((file) => (
                        <p key={file[1].name}>{file[1].name}</p>
                    ))}
                </Box>
            </Modal>
        </div>
    );
}
