const supabaseUrl = "https://ulbdbgbfrkzdegaxpsvn.supabase.co";
const supabaseKey = "sb_publishable_4K8mpn4xeOx1DnDJ0t165w_AHlSEzKN";

export const clienteSupabase = window.supabase.createClient(supabaseUrl, supabaseKey);

console.log("conectado a supabase");

export async function obtenerProductos() {
  try {
    // Hacemos la consulta a la tabla 'productos' seleccionando todos los campos (*)
    const { data: productos, error } = await clienteSupabase
      .from("productos")
      .select("*"); // Trae el id, nombre, precio, descripcion e imagen

    if (error) {
      throw new Error("Error al obtener los productos: " + error.message);
    }

    console.log("Lista de productos recibida:", productos);
  
    return productos;
  } catch (error) {
    console.error("Hubo un problema al traer los datos:", error.message);
  }
}
