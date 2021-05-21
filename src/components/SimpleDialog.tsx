import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

export type SimpleDialogProps = {
  header: string;
  body: React.ReactNode;
  primaryAction: Function;
  primaryActionText: string;
  secondaryAction?: Function;
  secondaryActionText?: string;
  open: boolean;
  handleClose: () => void;
};

export default function SimpleDialog({
  header,
  body,
  primaryAction,
  primaryActionText,
  secondaryAction,
  secondaryActionText,
  open,
  handleClose,
}: SimpleDialogProps): JSX.Element {
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{header}</DialogTitle>
        <DialogContent>{body}</DialogContent>
        <DialogActions>
          {!!secondaryAction && !!secondaryActionText && (
            <Button
              onClick={() => {
                secondaryAction();
                handleClose();
              }}
              color="secondary"
            >
              {secondaryActionText}
            </Button>
          )}
          <Button
            onClick={() => {
              primaryAction();
              handleClose();
            }}
            color="primary"
            autoFocus
          >
            {primaryActionText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
