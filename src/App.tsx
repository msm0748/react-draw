import { Stage, Layer, Line, Transformer } from 'react-konva';
import { useState, useRef } from 'react';

function DrawingCanvas() {
  const [lines, setLines] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [strokeColor, setStrokeColor] = useState('#000000');
  const [selectedId, setSelectedId] = useState(null);
  const [mode, setMode] = useState('draw'); // 'draw' or 'select'
  const transformerRef = useRef();

  const handleMouseDown = (e) => {
    if (mode === 'select') return;

    setIsDrawing(true);
    const pos = e.target.getStage().getPointerPosition();
    setLines([
      ...lines,
      {
        id: `line_${Date.now()}`, // 각 선에 고유 ID 추가
        points: [pos.x, pos.y],
        color: strokeColor,
        width: strokeWidth,
      },
    ]);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing || mode === 'select') return;

    const stage = e.target.getStage();
    const point = stage.getPointerPosition();

    const lastLine = lines[lines.length - 1];
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    lines.splice(lines.length - 1, 1, lastLine);
    setLines([...lines]);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  // 선택 처리
  const handleSelect = (lineId) => {
    if (mode !== 'select') return;
    setSelectedId(lineId);
  };

  // 선택 해제
  const handleDeselect = (e) => {
    if (e.target === e.target.getStage()) {
      setSelectedId(null);
    }
  };

  const handleUndo = () => {
    setLines(lines.slice(0, -1));
    setSelectedId(null);
  };

  const handleClear = () => {
    setLines([]);
    setSelectedId(null);
  };

  // 선택된 선 삭제
  const handleDelete = () => {
    if (selectedId) {
      setLines(lines.filter((line) => line.id !== selectedId));
      setSelectedId(null);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 10 }}>
        <button
          onClick={() => {
            setMode('draw');
            setSelectedId(null);
          }}
          style={{ backgroundColor: mode === 'draw' ? '#ddd' : 'white' }}
        >
          그리기 모드
        </button>
        <button
          onClick={() => setMode('select')}
          style={{ backgroundColor: mode === 'select' ? '#ddd' : 'white' }}
        >
          선택 모드
        </button>
        <input
          type="color"
          value={strokeColor}
          onChange={(e) => setStrokeColor(e.target.value)}
        />
        <input
          type="range"
          min={1}
          max={20}
          value={strokeWidth}
          onChange={(e) => setStrokeWidth(parseInt(e.target.value))}
        />
        <button onClick={handleUndo}>실행 취소</button>
        <button onClick={handleClear}>전체 지우기</button>
        {mode === 'select' && <button onClick={handleDelete}>선택 삭제</button>}
      </div>

      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
        onClick={handleDeselect}
      >
        <Layer>
          {lines.map((line) => (
            <Line
              key={line.id}
              id={line.id}
              points={line.points}
              stroke={line.color}
              strokeWidth={line.width}
              tension={0.5}
              lineCap="round"
              lineJoin="round"
              globalCompositeOperation="source-over"
              onClick={() => handleSelect(line.id)}
              onTap={() => handleSelect(line.id)}
              draggable={mode === 'select'}
              // 선택된 선 강조
              strokeScaleEnabled={false}
              hitStrokeWidth={line.id === selectedId ? 20 : 10}
            />
          ))}
          {/* 선택된 선에 대한 Transformer */}
          {selectedId && mode === 'select' && (
            <Transformer
              ref={transformerRef}
              boundBoxFunc={(oldBox, newBox) => {
                // 크기 조절 제한을 추가할 수 있습니다
                return newBox;
              }}
              rotateEnabled={false}
              flipEnabled={false}
            />
          )}
        </Layer>
      </Stage>
    </div>
  );
}

export default DrawingCanvas;
