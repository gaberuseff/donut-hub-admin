import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Settings() {
  return (
    <Row type="vertical">
      <Heading as="h1">Settings</Heading>
      <UpdateSettingsForm />
    </Row>
  );
}

export default Settings;
