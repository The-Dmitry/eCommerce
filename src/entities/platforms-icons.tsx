import { IconType } from 'react-icons';
import { BsNintendoSwitch } from 'react-icons/bs';
import { FaWindows, FaXbox } from 'react-icons/fa';
import { SiPlaystation4, SiPlaystation5 } from 'react-icons/si';

export const platformsIcons: Record<string, IconType> = {
  'Xbox One': FaXbox,
  'Xbox 360': FaXbox,
  'PlayStation 4': SiPlaystation4,
  'PlayStation 5': SiPlaystation5,
  PC: FaWindows,
  Nintendo: BsNintendoSwitch,
};
