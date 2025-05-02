import supabase from "./supabase";

export async function getSettings() {
  let { data, error } = await supabase
    .from('staticVar')
    .select('*').single()

  if (error) {
    throw new Error("Settings could not be loaded");
  }

  return data;
}

// We expect a newSetting object that looks like {setting: newValue}
export async function updateSetting(newSetting) {
  const { error } = await supabase
    .from('staticVar')
    .update(newSetting)
    .eq("id", 1)
    .select()

  if (error) {
    throw new Error("Settings could not be updated");
  }
}
