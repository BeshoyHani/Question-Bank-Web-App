import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

export default function TimedModal({ time, modalTitle, modalMessage }) {

    const [canShow, setCanShow] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setCanShow(false), time);
        return () => clearTimeout(timer);
    })
    return (
        <div>
            {
                <Modal
                    open={canShow}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            {modalTitle}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            {modalMessage}
                        </Typography>
                    </Box>
                </Modal>
            }
        </div>
    );
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};