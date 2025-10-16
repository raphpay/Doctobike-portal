import { Button } from "@/shared/components/ui/button";
import { ButtonWithIcon } from "@/shared/components/ui/button-with-icon";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";

type DialogProps = {
  isOpen: boolean;
  title: string;
  description?: string;
  confirmTitle?: string;
  cancelTitle?: string;
  isConfirmDisabled?: boolean;
  isConfirmAvailable?: boolean;
  isCancelAvailable?: boolean;
  descriptionChildren?: React.ReactNode;
  children?: React.ReactNode;
  extraConfirmButtonTitle?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  extraConfirmButtonAction?: () => void;
};

const Dialog: React.FC<DialogProps> = (props) => {
  const {
    isOpen,
    title,
    description,
    confirmTitle,
    cancelTitle,
    isConfirmDisabled,
    isConfirmAvailable = true,
    isCancelAvailable,
    descriptionChildren,
    children,
    extraConfirmButtonTitle,
    onConfirm,
    onCancel,
    extraConfirmButtonAction,
  } = props;

  const handleOverlayClick = () => {
    if (onCancel) {
      onCancel();
    }
  };

  const handleDialogClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          key="dialog-backdrop"
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={handleOverlayClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            key="dialog-box"
            className="bg-white rounded-2xl shadow-xl p-12 w-full max-w-4xl"
            onClick={handleDialogClick}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
              {title}
            </h2>
            {descriptionChildren ? (
              descriptionChildren
            ) : (
              <p className="text-gray-600 mb-6 text-center">{description}</p>
            )}

            {children}

            <div className="flex justify-between">
              {isCancelAvailable ? (
                <ButtonWithIcon
                  leftIcon={<IconChevronLeft />}
                  title={cancelTitle ?? "Annuler"}
                  onClick={() => onCancel && onCancel()}
                />
              ) : (
                <div className="flex-1" />
              )}
              {isConfirmAvailable === true ||
              isConfirmAvailable === undefined ? (
                <div className="flex flex-row-reverse items-center gap-2">
                  <ButtonWithIcon
                    disabled={isConfirmDisabled}
                    rightIcon={<IconChevronRight />}
                    title={confirmTitle ?? "OK"}
                    onClick={onConfirm}
                  />

                  {extraConfirmButtonTitle && extraConfirmButtonAction && (
                    <Button onClick={extraConfirmButtonAction}>
                      {extraConfirmButtonTitle}
                    </Button>
                  )}
                </div>
              ) : null}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Dialog;
