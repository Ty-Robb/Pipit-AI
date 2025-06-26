export type Workflow = {
  id: string;
  name: string;
  category: string;
  description: string;
  steps: string[];
};

export type MessageAction = {
  label: string;
  value: string;
};

export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  actions?: MessageAction[];
};

export type PanelView = 
  | 'welcome' 
  | 'workflow' 
  | 'website_assessment' 
  | 'document_insights' 
  | 'content_generation';
