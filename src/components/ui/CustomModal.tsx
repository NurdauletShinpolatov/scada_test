import { type ReactNode } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  Heading,
} from "@chakra-ui/react";

type CustomModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  tools?: ReactNode;
  mode?: "normal" | "delete" | "confirm";
  children?: ReactNode;
  fullScreen?: boolean;
  contentsx?: Record<string, any>;
  onConfirm?: () => void;
  disabled?: boolean;
};

export default function CustomModal({
  open,
  onClose,
  title,
  mode = "normal",
  children,
  fullScreen = false,
  contentsx,
  onConfirm,
  disabled = false,
}: CustomModalProps) {
  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      size={fullScreen ? "full" : "md"}
      isCentered
    >
      <ModalOverlay />
      <ModalContent p={4} {...contentsx}>
        {(title || mode === 'delete') && (
          <ModalHeader p={0}>
            <Heading size="md">
              {mode === "delete" ? "Are you sure you want to delete?" : title}
            </Heading>
          </ModalHeader>
        )}
        <ModalCloseButton hidden={mode === "delete"} />

        <ModalBody p={0} mt={5}>
          {mode === "delete" ? (
            <Box display="flex" gap={2}>
              <Button
                size="md"
                width="100%"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                size="md"
                width="100%"
                onClick={onConfirm}
                isDisabled={disabled}
              >
                Delete
              </Button>
            </Box>
          ) : mode === "confirm" ? (
            <Box display="flex" gap={2}>
              <Button
                size="md"
                variant="outline"
                width="100%"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="md"
                width="100%"
                onClick={onConfirm}
                isDisabled={disabled}
              >
                Confirm
              </Button>
            </Box>
          ) : (
            children
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
