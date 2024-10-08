'use client';

import {
  PropsWithChildren,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { ChevronDownOutline, CloseOutline } from '@clab-platforms/icon';
import { cn } from '@clab-platforms/utils';

import { MAX_SIZE_VALUE } from '@/shared/constants';
import { useOutsideClick } from '@/shared/hooks';
import { MaxSize } from '@/shared/types';

interface ModalProps extends PropsWithChildren {
  title: string;
  close: () => void;
  size?: MaxSize;
}

interface ModalFilterProps extends PropsWithChildren {
  title: string;
}

interface ModalFilterItemProps extends PropsWithChildren {
  onClick: () => void;
  selected: boolean;
}

interface ModalDropdownProps extends PropsWithChildren {
  title: string;
  value: string | ReactNode;
}

interface ModalDropdownItemProps extends PropsWithChildren {
  onClick: () => void;
  selected: boolean;
  closeOnClick?: boolean;
}

interface ModalItemProps extends PropsWithChildren {
  title: string;
}

interface ModalDropdownContextType {
  action: {
    closeAction: () => void;
  };
}

const ModalDropdownContext = createContext<ModalDropdownContextType>({
  action: {
    closeAction: () => {},
  },
});

function ModalFilter({ title, children }: ModalFilterProps) {
  return (
    <div className="flex items-center gap-x-4 py-1 text-sm">
      <p className="w-20 shrink-0 break-keep">{title}</p>
      <ul className="flex divide-x divide-gray-400 overflow-hidden rounded-md border border-gray-400">
        {children}
      </ul>
    </div>
  );
}

function ModalFilterItem({
  selected,
  onClick,
  children,
}: ModalFilterItemProps) {
  return (
    <button type="button" onClick={onClick}>
      <li
        className={cn(
          'cursor-pointer px-5 py-1.5 text-sm transition-colors',
          selected
            ? 'bg-blue-500 text-white hover:bg-blue-600'
            : 'hover:bg-blue-500 hover:text-white',
        )}
      >
        {children}
      </li>
    </button>
  );
}

function ModalDropdown({ title, value, children }: ModalDropdownProps) {
  const [open, setOpen] = useState<boolean>(false);

  const closeAction = useCallback(() => {
    setOpen(() => false);
  }, [setOpen]);

  const dropdownRef = useOutsideClick({ callback: closeAction });

  const defaultModalDropdownContext: ModalDropdownContextType = {
    action: {
      closeAction,
    },
  };

  return (
    <div className="flex items-center gap-x-4 py-1 text-sm" ref={dropdownRef}>
      <p className="w-20 shrink-0 break-keep">{title}</p>
      <div className="relative grow" onClick={() => setOpen((prev) => !prev)}>
        <ModalDropdownContext.Provider value={defaultModalDropdownContext}>
          <div className="flex items-center justify-between rounded-md border border-gray-400 px-1 py-1.5">
            <div className={cn('flex text-gray-500')}>{value}</div>
            <ChevronDownOutline
              className={cn(
                'mr-2 shrink-0 transition-all',
                open ? 'rotate-0' : 'rotate-180',
              )}
            />
          </div>
          {open && (
            <div className="absolute z-40 mt-4 max-h-60 min-h-fit w-full overflow-hidden overflow-y-scroll rounded-md border border-gray-400 bg-white p-2 drop-shadow-md">
              {children}
            </div>
          )}
        </ModalDropdownContext.Provider>
      </div>
    </div>
  );
}

function ModalDropdownItem({
  selected,
  onClick,
  children,
  closeOnClick = false,
}: ModalDropdownItemProps) {
  const { action } = useContext(ModalDropdownContext);

  return (
    <button
      className={cn(
        'w-full rounded-md px-2 py-3 text-start transition-colors hover:bg-gray-100',
        selected ? 'text-blue-400' : 'text-black',
      )}
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        onClick();
        if (closeOnClick) {
          action.closeAction();
        }
      }}
    >
      {children}
    </button>
  );
}

function ModalItem({ title, children }: ModalItemProps) {
  return (
    <div className="flex items-center gap-x-4 py-1 text-sm">
      <p className="w-20 shrink-0 break-keep">{title}</p>
      <div className="w-full">{children}</div>
    </div>
  );
}

function ModalContent({ children }: PropsWithChildren) {
  return (
    <div className="flex grow flex-col gap-y-3 overflow-hidden">{children}</div>
  );
}

export default function Modal({ title, close, size, children }: ModalProps) {
  const modalRef = useOutsideClick({ callback: close });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
      }
    };

    document.body.classList.add('overflow-hidden');
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.classList.remove('overflow-hidden');
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [close]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-colors">
      <div
        ref={modalRef}
        className={cn(
          'flex max-h-[90vh] w-11/12 flex-col overflow-hidden rounded-lg bg-white p-0 shadow-xl',
          !size ? 'container' : MAX_SIZE_VALUE[size],
        )}
      >
        <div className="sticky top-0 flex w-full justify-between bg-white p-6">
          <p className="font-bold">{title ?? ''}</p>
          <button type="button" onClick={close}>
            <CloseOutline width={24} height={24} />
          </button>
        </div>
        <div className="scrollbar-hidden flex grow flex-col px-6 pb-6">
          {children}
        </div>
      </div>
    </div>
  );
}

Modal.Content = ModalContent;
Modal.Filter = ModalFilter;
Modal.FilterItem = ModalFilterItem;
Modal.Dropdown = ModalDropdown;
Modal.DropdownItem = ModalDropdownItem;
Modal.Item = ModalItem;

Modal.displayName = 'Modal';
ModalContent.displayName = 'ModalContent';
ModalFilter.displayName = 'ModalFilter';
ModalFilterItem.displayName = 'ModalFilterItem';
ModalDropdown.displayName = 'ModalDropdown';
ModalDropdownItem.displayName = 'ModalDropdownItem';
ModalItem.displayName = 'ModalItem';
