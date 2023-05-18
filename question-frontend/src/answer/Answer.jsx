import InputField from "../common/InputField";

export default function Answer({ index, answer, onAnswerChange }) {
    return (
        <div className='d-flex'>
            <InputField
                id={`ans${index}ID`}
                type="text"
                name={`id`}
                label="Answer ID"
                placeholder={index + 1}
                value={index + 1}
                isDisabled={true}
                onChange={(event) => { onAnswerChange(event, index) }} />
            <InputField
                id={`ans${index}Name`}
                type="text"
                name={`name`}
                label="Answer Name"
                placeholder="Ball"
                value={answer.ansName}
                onChange={(event) => { onAnswerChange(event, index) }} />
            <InputField
                id={`ans${index}Description`}
                type="text"
                name={`description`}
                label="Answer Description"
                placeholder="description..."
                value={answer.ansDescription}
                onChange={(event) => { onAnswerChange(event, index) }} />
        </div>
    );
}