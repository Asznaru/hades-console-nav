import React from 'react';

export interface MenuItem {
  id: string;
  label: string;
  description: string;
}

interface NavigationMenuProps {
  items: MenuItem[];
  selectedIndex: number;
  onSelect: (item: MenuItem) => void;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ 
  items, 
  selectedIndex, 
  onSelect 
}) => {
  return (
    <div className="flex-1 p-6">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-xl mb-6 terminal-glow text-accent">
          [MAIN MENU] - Select Module
        </h2>
        
        <div className="space-y-2">
          {items.map((item, index) => (
            <div
              key={item.id}
              className={`menu-item cursor-pointer ${
                index === selectedIndex ? 'focused' : ''
              }`}
              onClick={() => onSelect(item)}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">
                  {index === selectedIndex && '> '}
                  [{item.id.toUpperCase()}] {item.label}
                </span>
                <span className="text-xs opacity-60">
                  {item.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavigationMenu;