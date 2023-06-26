import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";
import { Link } from "react-router-dom";
import Roles from './../common/Roles';


export default function QuestionItem({ name, category, eTime, onDelete, questionID }) {
    const [userType, setUserType] = useState(localStorage.getItem('user-type'));
    return (
        <li className='question-list-item'>
            <Link className='link-text' to={userType === Roles.TEACHER? `/questions/update/${questionID}`: null}>
                <div className="question-item-info">
                    <h2>{name}</h2>
                    <div >
                        <p className="question-item-info-p"> category: <em>{category} </em></p>
                        <p className="question-item-info-p">expected time: <em>{eTime} s</em></p>
                    </div>

                </div>
            </Link>
            <div className='quesion-item-buttons-container'>

                {
                    userType === Roles.ADMIN &&
                    <IconButton aria-label="delete" sx={{ mx: 6, my: 4, color: 'red' }} onClick={() => onDelete()}>
                        <DeleteIcon />
                    </IconButton>

                }
            </div>
        </li>
    );
}