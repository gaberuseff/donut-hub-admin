import {useForm} from "react-hook-form";

import useCreateItem from "./useCreateItem";
import useUpdateItem from "./useUpdateItem";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

function CreateMenuForm({itemToEdit = {}, onCloseModal}) {
  const {id: editId, ...editValues} = itemToEdit;
  const isEditing = Boolean(editId);

  const {register, handleSubmit, reset, getValues, formState} = useForm({
    defaultValues: isEditing ? editValues : {},
  });
  const {errors} = formState;

  const {CreateItem, isCreating} = useCreateItem();

  const {UpdateItem, isUpdating} = useUpdateItem();

  const isWorking = isCreating || isUpdating;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditing)
      UpdateItem(
        {newItem: {...data, image: image}, id: editId},
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      CreateItem(
        {...data, image: image},
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
  }

  function onError(error) {
    // console.log(error);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}>
      <FormRow label="name" error={errors?.name}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {required: "This field is required"})}
        />
      </FormRow>

      <FormRow label="Unit Price" error={errors?.unitPrice}>
        <Input
          type="number"
          id="unitPrice"
          disabled={isWorking}
          {...register("unitPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Price must be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register("discount", {
            required: isEditing ? false : "This field is required",
            validate: (value) =>
              value <= getValues().unitPrice ||
              "Discount must be less than unit price",
          })}
        />
      </FormRow>

      <FormRow label="Ingredients" error={errors?.ingredients}>
        <Textarea
          type="text"
          id="ingredients"
          disabled={isWorking}
          {...register("ingredients", {required: "This field is required"})}
        />
      </FormRow>

      <FormRow label="Sold out">
        <Input
          type="checkbox"
          id="soldOut"
          {...register("soldOut")}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Image" error={errors?.image}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditing ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variations="secondary"
          size="medium"
          type="reset"
          onClick={() => onCloseModal?.()}>
          Cancel
        </Button>
        <Button size="medium" variations="primary" disabled={isWorking}>
          {isEditing ? "Update item" : "Add new item"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateMenuForm;
