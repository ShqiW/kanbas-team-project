import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setQuestion } from "../reducer";
import { FaPlus } from "react-icons/fa";

export default function FillIn() {
    const dispatch = useDispatch();
    const question = useSelector((state: any) => state.quizzesReducer.question);

    const addCorrectAnswer = () => {
        dispatch(setQuestion({
            ...question,
            fillInAnswer: [...question.fillInAnswer, { text: "", caseInsensitive: false }]
        }));
    };

    const removeCorrectAnswer = (index: number) => {
        dispatch(setQuestion({
            ...question,
            fillInAnswer: question.fillInAnswer.filter((_: any, i: number) => i !== index)
        }));
    };

    const updateCorrectAnswer = (index: number, updatedAnswer: any) => {
        const newfillInAnswer = question.fillInAnswer.map((answer: any, i: number) => i === index ? updatedAnswer : answer);
        dispatch(setQuestion({ ...question, fillInAnswer: newfillInAnswer }));
    };

    return (
        <div className="col-12 p-3">
            <div className="col-12 mb-3">
                <label>Question:</label>
                <textarea
                    value={question.questionText}
                    className="form-control mb-2"
                    onChange={(e) => dispatch(setQuestion({ ...question, questionText: e.target.value }))}
                />
            </div>

            <div className="col-12 mb-3">
                <label>Correct Answers:</label>
                {question.fillInAnswer.map((answer: any, index: number) => (
                    <div key={index} className="row mb-2">
                        <div className="col-8">
                            <input
                                type="text"
                                value={answer.text}
                                className="form-control mb-2"
                                onChange={(e) => updateCorrectAnswer(index, { ...answer, text: e.target.value })}
                            />
                        </div>
                        <div className="col-2 d-flex align-items-center">
                            <label className="me-2">Case Insensitive:</label>
                            <input
                                type="checkbox"
                                checked={answer.caseInsensitive}
                                onChange={(e) => updateCorrectAnswer(index, { ...answer, caseInsensitive: e.target.checked })}
                            />
                        </div>
                        <div className="col-2 text-end">
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => removeCorrectAnswer(index)}
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
                <div className="text-end">
                    <span
                        className="text-danger"
                        style={{ cursor: 'pointer' }}
                        onClick={addCorrectAnswer}
                    >
                        <FaPlus /> Add Another Correct Answer
                    </span>
                </div>


            </div>


        </div>
    );
}