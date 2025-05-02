import {useState} from "react";

import Button from "../../ui/Button";
import ConfirmDelete from "../../ui/ConfirmDelete";
import useDeleteOrders from "./useDeleteOrders";
import Spinner from "../../ui/Spinner";
import useOrders from "./useOrders";

function DeleteAllOrders() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const {deleteAllOrders, isDeleting} = useDeleteOrders();
  const {orders} = useOrders();

  if (isDeleting) return <Spinner />;

  return (
    <div>
      {orders?.length > 0 && (
        <Button
          variations="primary"
          size="medium"
          onClick={() => setIsOpenModal((open) => !open)}>
          Delete all orders
        </Button>
      )}

      {isOpenModal && (
        <ConfirmDelete
          onCloseModal={() => setIsOpenModal(false)}
          disabled={isDeleting}
          resourceName="All orders"
          onConfirm={deleteAllOrders}
        />
      )}
    </div>
  );
}

export default DeleteAllOrders;
