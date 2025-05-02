import supabase, { supabaseUrl } from "./supabase";



export async function getMenu() {
    let { data, error } = await supabase
        .from('menu')
        .select('*')

    if (error) {
        console.log(error);
        throw new Error('Menu could not be loaded')
    }

    return data;
}

export async function createEditItem(newItem, id) {
    const hasImagePath = newItem.image?.startsWith?.(supabaseUrl);

    const imageName = `${Math.random()}-${newItem.image.name}`.replaceAll('/', '');
    const imagePath = hasImagePath ? newItem.image : `${supabaseUrl}/storage/v1/object/public/items-images/${imageName}`;

    // 1. create / edit the item
    let query = supabase.from('menu')

    // Create 
    if (!id)
        query = query.insert([{ ...newItem, image: imagePath }])

    // Edit
    if (id)
        query = query.update({ ...newItem, image: imagePath }).eq('id', id)


    const { data, error } = await query.select().single();

    if (error) {
        console.log(error);
        throw new Error('Menu item could not be created')
    }

    // 2. upload the image

    const { error: storageError } = await supabase
        .storage
        .from('items-images')
        .upload(imageName, newItem.image)

    // 3. delete item if image upload fails

    if (storageError) {
        await supabase
            .from('menu')
            .delete()
            .eq('id', data.id);
        console.log(storageError);
        throw new Error('Image could not be uploaded and item was not created')
    }

    return data;
}

export async function deleteItem(id) {
    const { data, error } = await supabase.from('menu').delete().eq('id', id);

    if (error) {
        console.log(error);
        throw new Error('Menu item could not be deleted')
    }

    return data;
}