import ModalWindow from "@/components/common/ModalWindow";

export type Props = {
  activeModal: 'notification' | 'help' | 'setting' | 'user' | null;
  closeModal: () => void;
};

export default function MenuModalWindows({ activeModal, closeModal }: Props) {
  return (
    <>
      <ModalWindow isOpen={activeModal === "notification"} close={closeModal}>
        <h2>通知モーダル</h2>
        <p>ここに通知内容。</p>
      </ModalWindow>

      <ModalWindow isOpen={activeModal === "help"} close={closeModal}>
        <h2>ヘルプ</h2>
        <p>ここにヘルプ内容。</p>
      </ModalWindow>

      <ModalWindow isOpen={activeModal === "setting"} close={closeModal}>
        <h2>設定</h2>
        <p>設定項目を表示。</p>
      </ModalWindow>

      <ModalWindow isOpen={activeModal === "user"} close={closeModal}>
        <h2>ユーザー情報</h2>
        <p>ユーザーの情報を表示。</p>
      </ModalWindow>
    </>
  );
}
