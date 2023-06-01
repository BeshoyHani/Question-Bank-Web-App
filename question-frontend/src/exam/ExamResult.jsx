import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function ExamResult({ score, passingScore }) {
    const navigate = useNavigate();
    const finish = () => {
        return navigate('/', { replace: '/' });
    }
    return (
        <React.Fragment>

            <div className="container row exam-results">
                <p>Your Score is: {score} </p>
                {
                    score >= passingScore ?
                        <p id="passed-exam">Congratulation! You have passed the exam</p>
                        :
                        <p id="failed-exam">Unfortunatily, You did't pass the Exam</p>
                }
            </div>
            <div className="row">
                <Button color="info" variant="contained" onClick={finish}>Finish</Button>
            </div>
        </React.Fragment>
    );
}