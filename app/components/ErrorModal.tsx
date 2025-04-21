'use client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/app/components/ui/dialog';

interface ErrorModalProps {
  open: boolean;
  onClose: () => void;
  errorMessage: string;
  title?: string;
}

export const ErrorModal = ({ open, onClose, errorMessage, title = 'Error' }: ErrorModalProps) => (
  <Dialog open={open} onOpenChange={onClose}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-red-600">{title}</DialogTitle>
        <DialogDescription>{errorMessage}</DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
);
