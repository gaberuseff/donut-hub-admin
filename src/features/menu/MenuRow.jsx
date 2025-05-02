import {useState} from "react";

import styled, {css} from "styled-components";

import {formatCurrency} from "../../utils/helpers";

import CreateMenuForm from "./CreateMenuForm";
import useDeleteItem from "./useDeleteItem";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import {HiMiniTrash, HiPencil} from "react-icons/hi2";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 1.8fr 2.2fr 1fr 0.8fr 1fr 0.7fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 7rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Name = styled.div`
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
  text-align: center;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  text-align: center;
`;

const CheckSoldOut = styled.div`
  font-family: "Sono";
  font-weight: 500;
  text-align: center;

  ${({isSoldOut}) =>
    isSoldOut &&
    css`
      color: var(--color-red-700);
      font-weight: 600;
    `}
`;

const StyledIcons = styled.div`
  display: flex;
  gap: 1.3rem;

  & button {
    background-color: transparent;
    border: none;
    padding: 0.6rem;
    border-radius: var(--border-radius-rounded);
    color: var(--color-grey-400);

    &:hover {
      background-color: var(--color-grey-200);
    }

    & svg {
      width: 1.8rem;
      height: 1.8rem;
      cursor: pointer;

      background-color: transparent;
    }
  }
`;

function MenuRow({item}) {
  const [ShowEditeForm, setShowEditeForm] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const {
    id: itemId,
    image,
    name,
    ingredients,
    unitPrice,
    discount,
    soldOut,
  } = item;

  const {isDeleting, deleteItem} = useDeleteItem();

  return (
    <>
      <TableRow>
        <Img src={image} alt={item.name} />
        <Name>{name}</Name>
        <div>{ingredients}</div>
        <Price>{formatCurrency(unitPrice)}</Price>
        <Discount>
          {discount ? formatCurrency(discount) : <span>&mdash;</span>}
        </Discount>
        <CheckSoldOut isSoldOut={soldOut}>
          {soldOut ? "SOLD OUT" : "AVAILABLE"}
        </CheckSoldOut>

        <StyledIcons>
          <button
            colorType="edit"
            onClick={() => setShowEditeForm((show) => !show)}>
            <HiPencil />
          </button>
          <button
            colorType="delete"
            disabled={isDeleting}
            onClick={() => setConfirmDelete(true)}>
            <HiMiniTrash />
          </button>
        </StyledIcons>
      </TableRow>

      {confirmDelete && (
        <ConfirmDelete
          resourceName="menu item"
          disabled={isDeleting}
          onCloseModal={() => setConfirmDelete(false)}
          onConfirm={() => deleteItem(itemId)}
        />
      )}

      {ShowEditeForm && (
        <Modal type="modal" onClose={() => setShowEditeForm(false)}>
          <CreateMenuForm
            itemToEdit={item}
            onCloseModal={() => setShowEditeForm(false)}
          />
        </Modal>
      )}
    </>
  );
}

export default MenuRow;
