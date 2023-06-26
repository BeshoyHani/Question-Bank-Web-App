import { Checkbox, Fab, Tooltip } from "@mui/material";
import InputField from "../common/InputField";
import RemoveIcon from '@mui/icons-material/Remove';

export default function Answer({ index, answer, onDelete, onAnswerChange }) {
    return (
        <div className='d-flex'>
            <InputField
                id={`ans${index}ID`}
                type="text"
                name={`id`}
                label="Answer ID"
                placeholder={index + 1}
                value={`${answer.id}`||`${(index + 1)}`}
                isDisabled={true}
                onChange={(event) => { onAnswerChange(event, index) }} />
            <InputField
                id={`ans${index}Name`}
                type="text"
                name={`name`}
                label="Answer Name"
                placeholder="Ball"
                value={answer.name}
                onChange={(event) => { onAnswerChange(event, index) }} />
            <InputField
                id={`ans${index}Description`}
                type="text"
                name={`description`}
                label="Answer Description"
                placeholder="description..."
                value={answer.description}
                onChange={(event) => { onAnswerChange(event, index) }} />

            <Tooltip title= {answer.isCorrect? "Correct" : "Not Correct"}>
                <Checkbox name="isCorrect"
                    onChange={(event) => {onAnswerChange(event, index)}}
                    checked={answer.isCorrect} />

            </Tooltip>


            <Fab color='warning' aria-label="add" size='medium' onClick={() => onDelete(index)}
                sx={{
                    padding: 3,
                    mx: 3,
                    visibility: index > 1 ? 'visible' : 'hidden'
                }}>
                <RemoveIcon />
            </Fab>
        </div>
    );
}