import countryMap from '@/src/shared/constants/countries';
import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props {
  name: string;
  defaultValue: string;
  text: string;
  children: ReactNode;
}

function findInitialValue(name: string, collection: Record<string, string>) {
  return Object.keys(collection).find((key) => collection[key] === name);
}

export default function Autocomplete({
  name,
  text,
  defaultValue = '',
  children,
}: Props) {
  const [query, setQuery] = useState(
    () => findInitialValue(defaultValue, countryMap) || ''
  );
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const countries = useMemo(() => Object.keys(countryMap), []);

  const filteredCountries = countries.filter((country) =>
    country.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (country: string) => {
    setQuery(country);
    setIsOpen(false);
  };

  return (
    <div
      className={twMerge(
        'relative mb-6 w-full last-of-type:mb-3',
        children && 'mb-1'
      )}
    >
      <div className='relative'>
        <label className='flex flex-col text-center text-current'>
          {text && text}
          <input
            ref={inputRef}
            type='text'
            value={query}
            name={name}
            autoComplete='nope'
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            className='form-input capitalize'
          />
        </label>
        {children}
      </div>

      {isOpen && filteredCountries.length > 0 && (
        <div
          ref={dropdownRef}
          className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-orange-500 bg-neutral-800 shadow-lg'
        >
          {filteredCountries.map((country) => (
            <button
              key={country}
              onClick={() => handleSelect(country)}
              className='w-full px-4 py-2 text-left hover:bg-neutral-700 focus:bg-neutral-600 focus:outline-none'
            >
              <div className='flex items-center'>
                <span className='text-sm text-orange-500'>{country}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
