import { render, screen } from '@testing-library/react';
import { Nav } from './nav';
import { LucideIcon } from 'lucide-react';
import '@testing-library/jest-dom';
import { expect } from 'vitest';

describe('Nav Component', () => {
  const mockLinks = [
    {
      title: 'Home',
      icon: LucideIcon,
      variant: 'default',
    },
    {
      title: 'About',
      icon: LucideIcon,
      variant: 'ghost',
    },
  ];

  it('renders collapsed nav with tooltips', () => {
    // render(<Nav links={mockLinks} isCollapsed={true} />);
    
    // mockLinks.forEach(link => {
    //   expect(screen.getByText(link.title)).toBeInTheDocument();
    // });

    render(<Nav> links={mockLinks} isCollapsed={true}</Nav>);

    mockLinks.forEach((link)=>{
      expect(screen.getByText(link.title)).toBeInTheDocument();
    })
  });

  it('renders expanded nav with titles', () => {
    render(<Nav links={mockLinks} isCollapsed={false} />);
    
    mockLinks.forEach(link => {
      expect(screen.getByText(link.title)).toBeInTheDocument();
    });
  });
});