import { clienteSupabase } from "./supa.js";

/*if (sessionStorage.getItem("admin") !== "true") {
    window.location.href = "security.html";
    } */

const botonGuardar = document.getElementById("guardar");
if (botonGuardar) {
    botonGuardar.addEventListener("click", guardarProducto);
    }

// 2. IMPORTANTE: Recibimos el evento "e" como parámetro en la función
async function guardarProducto(e) {
  // 3. ¡ESTA LÍNEA ES LA MAGIA! Detiene la recarga automática del 'submit'

    const nombre = document.getElementById("nombre").value;
    const precio = document.getElementById("precio").value;
    const descripcion = document.getElementById("descripcion").value;

    const inputImagen = document.getElementById("imagen");
    const archivo = inputImagen.files[0];

  // Validación: verificar que el usuario haya seleccionado una imagen
    if (!archivo) {
    alert("Por favor, selecciona una imagen para el producto.");
    return;
    }

    try {
    // 2. Generar un nombre único para el archivo para que no se sobrescriba si suben otra foto llamada igual
    // Ejemplo: "1718462940123-foto.jpg"
    const nombreUnicoArchivo = `${Date.now()}-${archivo.name}`;

    // 3. SUBIR LA IMAGEN AL STORAGE
    // (.from("tu-nombre-de-bucket").upload("ruta/del/archivo", archivo))
    const { data: storageData, error: storageError } =
        await clienteSupabase.storage
        .from("imagenes-productos") // El nombre del bucket que creaste en el Paso 1
        .upload(nombreUnicoArchivo, archivo);

    if (storageError) {
        throw new Error("Error al subir la imagen: " + storageError.message);
    }

    // 4. OBTENER LA URL PÚBLICA DE LA IMAGEN SUBIDA
    const { data: urlData } = clienteSupabase.storage
        .from("imagenes-productos")
        .getPublicUrl(nombreUnicoArchivo);

    const urlImagenFinal = urlData.publicUrl; // Aquí tienes la URL (https://.../imagen.jpg)

    // 5. GUARDAR EN LA BASE DE DATOS (Incluyendo la URL de la imagen)
    const { error: dbError } = await clienteSupabase.from("productos").insert([
        {
        nombre: nombre,
        precio: precio,
        descripcion: descripcion,
        imagen: urlImagenFinal, // Guardamos la URL de texto en la columna 'imagen'
        },
    ]);

    if (dbError) {
        throw new Error(
        "Error al guardar los datos del producto: " + dbError.message
        );
    }

    // Si todo sale bien:
    alert("Producto guardado exitosamente con su imagen.");

    // Opcional: Limpiar el formulario
    document.getElementById("nombre").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("descripcion").value = "";
    inputImagen.value = ""; // Limpia el selector de archivos
    } catch (error) {
    console.error("Hubo un problema:", error.message);
    alert(error.message);
    }
}