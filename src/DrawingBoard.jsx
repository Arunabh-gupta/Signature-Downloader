import { ReactSketchCanvas } from "react-sketch-canvas";
import { useRef, useState } from "react";
import "./App.css";
import { saveAs } from 'file-saver';

export default function App() {
    const canvasRef = useRef(null);

    // change stroke width and enable and disable eraser and pen
    const [eraseMode, setEraseMode] = useState(false);
    const [strokeWidth, setStrokeWidth] = useState(5);
    const [eraserWidth, setEraserWidth] = useState(10);

    const handleEraserClick = () => {
        setEraseMode(true);
        canvasRef.current?.eraseMode(true);
    };

    const handlePenClick = () => {
        setEraseMode(false);
        canvasRef.current?.eraseMode(false);
    };

    const handleStrokeWidthChange = (event) => {
        setStrokeWidth(+event.target.value);
    };

    const handleEraserWidthChange = (event) => {
        setEraserWidth(+event.target.value);
    };

    // Change Color of Stroke and background
    const [strokeColor, setStrokeColor] = useState("#000000");
    const [canvasColor, setCanvasColor] = useState("#ffffff");

    const handleStrokeColorChange = (event) => {
        setStrokeColor(event.target.value);
    };

    const handleCanvasColorChange = (event) => {
        setCanvasColor(event.target.value);
    };

    // Handling other functions
    const handleUndoClick = () => {
        canvasRef.current?.undo();
    };

    const handleRedoClick = () => {
        canvasRef.current?.redo();
    };

    const handleClearClick = () => {
        canvasRef.current?.clearCanvas();
    };

    const handleResetClick = () => {
        canvasRef.current?.resetCanvas();
    };

    return (
        <div className="container">
            <h1> Tools</h1 >
            <div className="tool-options">
                <div className="toggle-options">
                    <button
                        type="button"
                        className="tool-button"
                        disabled={!eraseMode}
                        onClick={handlePenClick}
                    >
                        Pen
                    </button>
                    <button
                        type="button"
                        className="tool-button"
                        disabled={eraseMode}
                        onClick={handleEraserClick}
                    >
                        Eraser
                    </button>
                </div>
                <div className="width-options">
                    <label htmlFor="strokeWidth" className="form-label">
                        Stroke width
                    </label>
                    <input
                        disabled={eraseMode}
                        type="range"
                        className="form-range"
                        min="1"
                        max="20"
                        step="1"
                        id="strokeWidth"
                        value={strokeWidth}
                        onChange={handleStrokeWidthChange}
                    />
                    <label htmlFor="eraserWidth" className="form-label">
                        Eraser width
                    </label>
                    <input
                        disabled={!eraseMode}
                        type="range"
                        className="form-range"
                        min="1"
                        max="20"
                        step="1"
                        id="eraserWidth"
                        value={eraserWidth}
                        onChange={handleEraserWidthChange}
                    />
                </div>
            </div>
            <div className="vr">
                <button
                    type="button"
                    className="tool-button"
                    onClick={handleUndoClick}
                >
                    Undo
                </button>
                <button
                    type="button"
                    className="tool-button"
                    onClick={handleRedoClick}
                >
                    Redo
                </button>
                <button
                    type="button"
                    className="tool-button"
                    onClick={handleClearClick}
                >
                    Clear
                </button>
                <button
                    type="button"
                    className="tool-button"
                    onClick={handleResetClick}
                >
                    Reset
                </button>
            </div>

            <div className="color-options">
                <label htmlFor="strokeColor">Stroke color</label>
                <input
                    type="color"
                    id="strokeColor"
                    value={strokeColor}
                    onChange={handleStrokeColorChange}
                />
                <label htmlFor="canvasColor">Canvas color</label>
                <input
                    type="color"
                    id="canvasColor"
                    value={canvasColor}
                    onChange={handleCanvasColorChange}
                />
            </div>
            <h1>Canvas</h1>
            <ReactSketchCanvas
                width="800px"
                height="300px"
                ref={canvasRef}
                strokeWidth={strokeWidth}
                eraserWidth={eraserWidth}
                strokeColor={strokeColor}
                canvasColor={canvasColor}
                className="canvas"
            />
            <button
                onClick={() => {
                    canvasRef.current
                    .exportImage("png")
                    .then((data) => {
                        console.log(data);
                        saveAs(data, 'signature.png');
                    })
                    .catch((e) => {
                        console.log(e);
                    });
                }}
                >
            Get Image
            </button>
        </div >
    );
}
