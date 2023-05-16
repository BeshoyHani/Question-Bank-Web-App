import Answer from "./Answer";
import React from "react";
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function AnswerList({ answers, onAddAnswer, handleAnswerChange }) {
    return (
        answers.map((answer, index) => {
            return <div key={index} style={{ justifyContent: 'end' }}>
                {
                    index === answers.length - 1 &&
                    <div style={{ width: '5%', }}>
                        <Fab onClick={onAddAnswer} color='default' aria-label="add" size='medium'>
                            <AddIcon />
                        </Fab>
                    </div>
                }

                <div style={{ width: '95%', }}>
                    <Answer index={index} answer={answer} onAnswerChange={handleAnswerChange} />
                </div>

            </div>
        })
    );
}