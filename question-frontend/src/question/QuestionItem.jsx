import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";


export default function QuestionItem({ name, category, eTime, onDelete }) {
    const [userType, setUserType] = useState (localStorage.getItem('user-type'));
    return (
        <div className='item-container'>
            <div>
                <h2>{name}</h2>
                <div className="d-flex">
                    <p className="question-item-info-p"> category: <em>{category} </em></p>
                    <p className="question-item-info-p">expected time: <em>{eTime} s</em></p>
                </div>
            </div>
            <div className='quesion-item-buttons-container'>

                {
                    userType === 'ADMIN' &&
                    <IconButton aria-label="delete" sx={{ mx: 3 }} onClick={() => onDelete()}>
                        <DeleteIcon />
                    </IconButton>

                }
            </div>
        </div>
    );
}