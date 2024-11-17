import { Box, Center, IconButton } from '@chakra-ui/react';
import {
  TbEraser,
  TbPencil,
  TbPointer,
  TbHandStop,
  TbTextSize,
  TbPencilMinus,
} from 'react-icons/tb';
import { AiOutlinePicture } from 'react-icons/ai';
import { useTool } from '@/store/useTool';

export default function Tools() {
  const { tool, setTool } = useTool();
  return (
    <Center position="absolute" width="100%" top="4">
      <Box
        borderRadius="lg"
        shadow="sm"
        borderWidth="1px"
        padding="1"
        display="flex"
        gap="1"
      >
        <IconButton
          size="sm"
          variant={tool === 'move' ? 'subtle' : 'ghost'}
          onClick={() => setTool('move')}
        >
          <TbHandStop />
        </IconButton>
        <IconButton
          size="sm"
          variant={tool === 'select' ? 'subtle' : 'ghost'}
          onClick={() => setTool('select')}
        >
          <TbPointer />
        </IconButton>
        <IconButton
          size="sm"
          variant={tool === 'draw' ? 'subtle' : 'ghost'}
          onClick={() => setTool('draw')}
        >
          <TbPencil />
        </IconButton>
        <IconButton
          size="sm"
          variant={tool === 'highlight' ? 'subtle' : 'ghost'}
          onClick={() => setTool('highlight')}
        >
          <TbPencilMinus />
        </IconButton>
        <IconButton
          size="sm"
          variant={tool === 'text' ? 'subtle' : 'ghost'}
          onClick={() => setTool('text')}
        >
          <TbTextSize />
        </IconButton>
        <IconButton
          size="sm"
          variant={tool === 'image' ? 'subtle' : 'ghost'}
          onClick={() => setTool('image')}
        >
          <AiOutlinePicture />
        </IconButton>
        <IconButton
          size="sm"
          variant={tool === 'ellipse' ? 'subtle' : 'ghost'}
          onClick={() => setTool('ellipse')}
        >
          <TbEraser />
        </IconButton>
      </Box>
    </Center>
  );
}
