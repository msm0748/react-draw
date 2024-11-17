import { Tool } from '@/types/Tool';
import { create } from 'zustand';

interface ToolState {
  tool: Tool;
  setTool: (newTool: Tool) => void;
  resetTool: () => void;
}

export const useTool = create<ToolState>((set) => ({
  tool: 'move',
  setTool: (newTool) => set({ tool: newTool }),
  resetTool: () => set({ tool: 'move' }),
}));
