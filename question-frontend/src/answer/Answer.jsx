import InputField from "../common/InputField";

export default function Answer({ index, answer, onAnswerChange }) {
    return (
        <div>
            <InputField
                id={`ans${index}ID`}
                type="text"
                name={`ansID`}
                label="Answer ID"
                placeholder="1"
                value={answer.ansID}
                onChange={(event) => { onAnswerChange(event, index) }} />
            <InputField
                id={`ans${index}Name`}
                type="text"
                name={`ansName`}
                label="Answer Name"
                placeholder="Ball"
                value={answer.ansName}
                onChange={(event) => { onAnswerChange(event, index) }} />
            <InputField
                id={`ans${index}Description`}
                type="text"
                name={`ansDescription`}
                label="Answer Description"
                placeholder="description..."
                value={answer.ansDescription}
                onChange={(event) => { onAnswerChange(event, index) }} />
        </div>
    );
}