import { Box } from '@chakra-ui/react';
import Tools from './components/tools';
import { useEffect, useState } from 'react';
import { useTool } from './store/useTool';
import Canvas from './components/canvas';

function App() {
  const [cursor, setCursor] = useState('default');
  const { tool } = useTool();
  useEffect(() => {
    switch (tool) {
      case 'move':
        setCursor('grab');
        break;
      case 'select':
        setCursor('default');
        break;
      case 'draw':
        setCursor('crosshair');
        break;
      case 'highlight':
        setCursor('crosshair');
        break;
      case 'text':
        setCursor('text');
        break;
      case 'ellipse':
        setCursor(
          'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAUpJREFUOE9jZKAyYKSyeQzDw0AHGRkZjg8fPth++fJlNwMDwwF8wYTTy7Kysu6MjIyThYWFhTk5OblsbW1/7tq16+/bt2/f/v//P/fx48c7sRmM1UCQYY8fP96xf/9+BgcHBxR9jY2NDA0NDQyysrIe2AzFaqCcnNytpKQk1fr6eqy+O3DgAEN8fPztR48eqaErwGagg6Gh4dpz584J4QsrIyOjd+fPnw9GD1MMA3l4eFqzs7OzOzo6+PEZaG1t/ePRo0eBT5482YGsDsNAGRkZDzk5ufVHjx7lwGdgRUXFx6lTp0798uVLNV4DgV6grpdBtoEiZeHCharoMQxzCSim582bR3SkgJIEONmAkgd6TINi2NHRkbRkA3IJcsJ2c3NjPnz4MPv379+/kZWw0SLDgYeHx1VAQODwkydPfpCd9cgt1oZH8UWS7wHGeI4Vsr6iRwAAAABJRU5ErkJggg==") 10 10, auto'
        );
        break;
      default:
        setCursor('default');
        break;
    }
  }, [tool]);
  return (
    <Box width="dvw" height="dvh" style={{ cursor }} position="relative">
      <Tools />
      <Canvas />
    </Box>
  );
}

export default App;
