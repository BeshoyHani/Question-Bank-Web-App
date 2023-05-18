import { IconButton } from "@mui/material";
import  DeleteIcon  from '@mui/icons-material/Delete';

export default function QuestionItem({ name, onDelete }) {
    return (
        <div className='user-item-container'>
            <div>
                <h2>{name}</h2>
            </div>
            <div className='quesion-item-buttons-container'>

                <IconButton aria-label="delete" sx={{ mx: 3 }} onClick={() => onDelete()}>
                    <DeleteIcon />
                </IconButton>
            </div>
        </div>
    );
}