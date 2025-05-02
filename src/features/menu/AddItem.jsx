import {useState} from "react";

import Button from "../../ui/Button";
import CreateMenuForm from "./CreateMenuForm";
import Modal from "../../ui/Modal";

function AddItem() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <div>
      <Button
        variations="primary"
        size="medium"
        onClick={() => setIsOpenModal((open) => !open)}>
        Add new item
      </Button>

      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <CreateMenuForm onCloseModal={() => setIsOpenModal(false)} />
        </Modal>
      )}
    </div>
  );
}

export default AddItem;
