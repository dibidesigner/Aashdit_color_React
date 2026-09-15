export const componentsData = [
  {
    category: 'Actions',
    components: [
      { id: 'button', name: 'Button', variants: ['Primary', 'Secondary', 'Outline', 'Ghost', 'Destructive', 'Link'] },
      { id: 'icon-button', name: 'Icon Button', variants: ['Default', 'Outline', 'Ghost'] },
      { id: 'toggle', name: 'Toggle Switch', variants: ['On', 'Off', 'Disabled'] },
    ],
  },
  {
    category: 'Inputs',
    components: [
      { id: 'input', name: 'Text Input', variants: ['Default', 'Focus', 'Error', 'Success', 'Disabled'] },
      { id: 'select', name: 'Select Dropdown', variants: ['Default', 'Open', 'Disabled'] },
      { id: 'checkbox', name: 'Checkbox', variants: ['Unchecked', 'Checked', 'Indeterminate', 'Disabled'] },
      { id: 'radio', name: 'Radio Button', variants: ['Unselected', 'Selected', 'Disabled'] },
      { id: 'textarea', name: 'Text Area', variants: ['Default', 'Focus', 'Error'] },
    ],
  },
  {
    category: 'Data Display',
    components: [
      { id: 'badge', name: 'Badge', variants: ['Default', 'Success', 'Warning', 'Error', 'Info'] },
      { id: 'card', name: 'Card', variants: ['Default', 'Elevated', 'Interactive', 'Media'] },
      { id: 'table', name: 'Data Table', variants: ['Default', 'Striped', 'Bordered', 'Compact'] },
      { id: 'list', name: 'List', variants: ['Simple', 'Divided', 'Interactive'] },
      { id: 'avatar', name: 'Avatar', variants: ['Image', 'Initials', 'Icon', 'Group'] },
    ],
  },
  {
    category: 'Feedback',
    components: [
      { id: 'alert', name: 'Alert', variants: ['Info', 'Success', 'Warning', 'Error'] },
      { id: 'toast', name: 'Toast', variants: ['Default', 'Success', 'Error', 'Loading'] },
      { id: 'progress', name: 'Progress Bar', variants: ['Linear', 'Circular', 'Indeterminate'] },
      { id: 'skeleton', name: 'Skeleton', variants: ['Text', 'Card', 'Table'] },
    ],
  },
  {
    category: 'Navigation',
    components: [
      { id: 'tabs', name: 'Tabs', variants: ['Default', 'Pills', 'Underline', 'Vertical'] },
      { id: 'breadcrumb', name: 'Breadcrumb', variants: ['Default', 'With Icons', 'Collapsed'] },
      { id: 'pagination', name: 'Pagination', variants: ['Simple', 'With First/Last', 'Compact'] },
      { id: 'sidebar', name: 'Sidebar', variants: ['Expanded', 'Collapsed', 'Mobile Drawer'] },
    ],
  },
  {
    category: 'Overlays',
    components: [
      { id: 'modal', name: 'Modal', variants: ['Default', 'Large', 'Full Screen', 'Drawer'] },
      { id: 'tooltip', name: 'Tooltip', variants: ['Top', 'Bottom', 'Left', 'Right'] },
      { id: 'popover', name: 'Popover', variants: ['Default', 'With Arrow', 'Rich Content'] },
      { id: 'dropdown', name: 'Dropdown Menu', variants: ['Default', 'With Icons', 'With Checkboxes'] },
    ],
  },
];
