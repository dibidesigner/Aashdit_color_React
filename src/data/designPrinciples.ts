export const designPrinciples = [
  {
    id: 'hierarchy',
    title: 'Visual Hierarchy',
    icon: 'Layers',
    description: 'Guide the user\'s eye through the interface by establishing a clear order of importance.',
    tips: ['Use size to indicate importance', 'Contrast draws attention to key elements', 'Whitespace creates breathing room', 'Color can highlight primary actions'],
  },
  {
    id: 'consistency',
    title: 'Consistency',
    icon: 'Grid',
    description: 'Consistent patterns reduce cognitive load and help users learn the interface faster.',
    tips: ['Reuse component patterns', 'Maintain consistent spacing', 'Keep color usage predictable', 'Use the same icons for the same actions'],
  },
  {
    id: 'accessibility',
    title: 'Accessibility',
    icon: 'Eye',
    description: 'Design for all users, including those with visual, motor, cognitive, and auditory disabilities.',
    tips: ['Maintain 4.5:1 contrast ratio', 'Never rely on color alone', 'Support keyboard navigation', 'Add descriptive alt text to images'],
  },
  {
    id: 'feedback',
    title: 'Feedback & Response',
    icon: 'Zap',
    description: 'Every user action should have a clear, immediate response from the system.',
    tips: ['Show loading states for async operations', 'Confirm successful actions', 'Give clear error messages with recovery paths', 'Use subtle animations for state transitions'],
  },
  {
    id: 'simplicity',
    title: 'Simplicity',
    icon: 'Minimize2',
    description: 'Remove everything that doesn\'t serve the user\'s primary goal.',
    tips: ['Reduce choices to avoid decision fatigue', 'Progressive disclosure for complex forms', 'One primary action per screen', 'Hide secondary actions until needed'],
  },
  {
    id: 'typography',
    title: 'Typography',
    icon: 'Type',
    description: 'Good typography improves readability, establishes hierarchy, and sets the tone.',
    tips: ['Limit to 2 font families', 'Use minimum 16px for body text', 'Line height 1.5-1.7 for paragraphs', 'Maintain adequate letter spacing'],
  },
];
