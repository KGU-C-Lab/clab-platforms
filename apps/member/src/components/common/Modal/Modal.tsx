import { PropsWithChildren } from 'react';
import useModal from '@hooks/common/useModal';
import classNames from 'classnames';

interface ModalProps extends PropsWithChildren {
  className?: string;
}

interface ModalButtonProps extends ModalProps {
  color: 'gray' | 'red' | 'sky' | 'orange';
  onClick?: () => void;
}

const Modal = ({ children }: PropsWithChildren) => {
  const { closeModal } = useModal();

  return (
    <div
      className="fixed inset-0 z-40"
      aria-labelledby="modalTitle"
      aria-modal="true"
      role="dialog"
    >
      <div className="flex items-center justify-center min-h-screen px-5">
        <div className="fixed inset-0">
          <div
            className="absolute inset-0 bg-gray-600/50"
            onClick={closeModal}
          />
        </div>
        <div className="inline-block w-full p-4 space-y-4 overflow-hidden text-center transform bg-white rounded-lg shadow-lg sm:text-left sm:max-w-lg">
          {children}
        </div>
      </div>
    </div>
  );
};

Modal.Header = ({ className, children }: ModalProps) => {
  return (
    <header>
      <h3 className={classNames('text-xl font-semibold leading-6', className)}>
        {children}
      </h3>
    </header>
  );
};

Modal.Body = ({ className, children }: ModalProps) => {
  return (
    <main
      className={classNames(
        'text-sm text-gray-500 whitespace-pre-wrap break-keep min-h-20',
        className,
      )}
    >
      {children}
    </main>
  );
};

Modal.Footer = ({ className, children }: ModalProps) => {
  return (
    <footer
      className={classNames(
        'flex justify-end gap-2 text-sm font-semibold',
        className,
      )}
    >
      {children}
    </footer>
  );
};

Modal.Button = ({ color, onClick, className, children }: ModalButtonProps) => {
  const colorStyle = {
    red: 'border-red-300 bg-red-100 text-red-500 hover:bg-red-200',
    sky: 'border-sky-300 bg-sky-100 text-sky-500 hover:bg-sky-200',
    gray: 'border-gray-300 bg-gray-100 text-gray-500 hover:bg-gray-200',
    orange:
      'border-orange-300 bg-orange-100 text-orange-500 hover:bg-orange-200',
  } as const;

  return (
    <button
      type="button"
      className={classNames(
        'rounded-lg border py-1 w-full transition-colors',
        colorStyle[color],
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Modal;
