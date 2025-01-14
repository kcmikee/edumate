import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~~/components/ui/dialog";
import { cn } from "~~/lib/utils";

type TProps = {
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
  title?: string;
  description?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  pattern?: boolean | undefined;
};

export const CustomModal = ({ isOpen, onClose, title, description, footer, children, className }: TProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose} modal={true}>
      <DialogContent className={cn(`sm:max-w-lg`, className)}>
        {/* <Image alt='pattern' src={Pattern} className='absolute -top-0 h-30' /> */}

        <DialogHeader>
          <DialogTitle className=" dark:text-black">{title}</DialogTitle>

          {/* Description */}
          {!!description && <DialogDescription className=" dark:text-black">{description}</DialogDescription>}
        </DialogHeader>

        {children}

        {/* Footer */}
        {!!footer && <DialogFooter className="sm:justify-start">{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
};
