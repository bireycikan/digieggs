export interface ModalProps {
  show: boolean;
  onHide: () => void;
  onFilter: (filter: string) => void;
}
