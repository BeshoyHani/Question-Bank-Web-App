import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';

export default function QuestionListItem({ question, index, onCheck }) {
    const [checked, setChecked] = useState([1]);


    return (
        <ListItem
            secondaryAction={
                <Checkbox
                    edge="end"
                    onChange={()=>onCheck(question)}
                    checked={question.isChecked === true}
                    inputProps={{ 'aria-labelledby': index }}
                />
            }
            disablePadding
        >
            <ListItemButton onClick={() => onCheck(question)}>
                <div className='exam-question-item-info'>
                    <h3>{question.name}</h3>
                    <div>
                        {
                            question.answers.map((answer, index) => {
                                return <p key={index}><strong>{answer.name}</strong></p>
                            })
                        }
                    </div>
                </div>
                <div>
                    <p>{question.category}</p>
                    <p>{question.mark} Mark</p>
                    <p>{question.expectedTime > 59 && question.expectedTime / 60 + 'm'} {question.expectedTime % 60}s </p>
                </div>
            </ListItemButton>
        </ListItem>
    );
}