import useSettings from "./useSettings";
import useUpdateSetting from "./useUpdateSetting";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";

function UpdateSettingsForm() {
  const {settings: {deliveryPrice, isOpen} = {}, isLoading} = useSettings();
  const {isUpadating, updateSetting} = useUpdateSetting();

  if (isLoading) return <Spinner />;

  function handelUpdate(e, field) {
    const value = field === "isOpen" ? e.target.checked : e.target.value;
    updateSetting({[field]: value});
  }

  return (
    <Form>
      <FormRow label="Delivery fee">
        <Input
          type="number"
          id="deliveryFee"
          disabled={isUpadating}
          defaultValue={deliveryPrice}
          onBlur={(e) => handelUpdate(e, "deliveryPrice")}
        />
      </FormRow>

      <FormRow label="Is Open">
        <Input
          type="checkbox"
          defaultChecked={isOpen}
          id="isopen"
          onBlur={(e) => handelUpdate(e, "isOpen")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
