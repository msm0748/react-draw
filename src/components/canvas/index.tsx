import { Box } from '@chakra-ui/react';
import React, { useState, useRef } from 'react';
import { Stage, Layer, Line } from 'react-konva';

const DrawingApp: React.FC = () => {
  const [lines, setLines] = useState<
    Array<{ points: number[]; color: string }>
  >([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const stageRef = useRef<any>(null); // Stage 참조

  const getRelativePointerPosition = (stage: any) => {
    const transform = stage.getAbsoluteTransform().copy();
    transform.invert();
    const pointer = stage.getPointerPosition();
    return transform.point(pointer);
  };

  const handleMouseDown = (event: any) => {
    event.evt.preventDefault(); // 기본 동작 방지
    setIsDrawing(true);
    const stage = stageRef.current;
    const pointerPosition = getRelativePointerPosition(stage);

    if (pointerPosition) {
      setLines([
        ...lines,
        { points: [pointerPosition.x, pointerPosition.y], color: 'black' },
      ]);
    }
  };

  const handleMouseMove = (event: any) => {
    event.evt.preventDefault(); // 기본 동작 방지
    if (!isDrawing) return;

    const stage = stageRef.current;
    const pointerPosition = getRelativePointerPosition(stage);

    if (pointerPosition) {
      const updatedLines = [...lines];
      const lastLine = updatedLines[updatedLines.length - 1];
      lastLine.points = lastLine.points.concat([
        pointerPosition.x,
        pointerPosition.y,
      ]);
      setLines(updatedLines);
    }
  };

  const handleMouseUp = (event: any) => {
    event.evt.preventDefault(); // 기본 동작 방지
    setIsDrawing(false);
  };

  const handleWheel = (event: any) => {
    event.evt.preventDefault();

    const stage = stageRef.current;
    const scaleBy = 1.1; // 확대/축소 비율
    const oldScale = stage.scaleX();

    // 마우스 위치 기반으로 새로운 스케일 계산
    const pointer = stage.getPointerPosition();
    const mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale,
    };

    const newScale = Math.max(
      0.5,
      Math.min(
        5,
        event.evt.deltaY > 0 ? oldScale / scaleBy : oldScale * scaleBy
      )
    );

    stage.scale({ x: newScale, y: newScale });

    const newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    };

    stage.position(newPos);
    stage.batchDraw();
  };

  const handleTouchStart = (event: any) => {
    event.evt.preventDefault();
    handleMouseDown(event);
  };

  const handleTouchMove = (event: any) => {
    event.evt.preventDefault();
    handleMouseMove(event);
  };

  const handleTouchEnd = (event: any) => {
    event.evt.preventDefault();
    handleMouseUp(event);
  };

  return (
    <Box position="absolute" top="0" left="0" width="full" height="full">
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        ref={stageRef}
        // draggable // 드래그로 이동 가능
      >
        <Layer>
          {lines.map((line, index) => (
            <Line
              key={index}
              points={line.points}
              stroke={line.color}
              strokeWidth={1}
              tension={0.5}
              lineCap="round"
              lineJoin="round"
            />
          ))}
        </Layer>
      </Stage>
    </Box>
  );
};

export default DrawingApp;
