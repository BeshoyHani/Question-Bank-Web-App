import Answer from "./Answer";
import React from "react";
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function AnswerList({ answers, setAnswers, onAddAnswer, handleAnswerChange }) {

    const removeAnswer = (index) => {
        setAnswers(answers.filter((answer, idx) => idx !== index));
    }
    return (
        answers.map((answer, index) => {
            return <div className='d-flex' key={index} style={{ justifyContent: 'end' }}>
                {
                    index === answers.length - 1 &&
                    <div style={{ width: '5%', }}>
                        <Fab onClick={onAddAnswer} color='default' aria-label="add" size='medium' sx={{ml: 4}}>
                            <AddIcon />
                        </Fab>
                    </div>
                }

                <div style={{ width: '95%', }}>
                    <Answer index={index} answer={answer} onDelete={removeAnswer} onAnswerChange={handleAnswerChange} />
                </div>

            </div>
        })
    );
}