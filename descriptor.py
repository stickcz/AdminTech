import os
import time
from pathlib import Path

def combine_project_files(output_file="combined_project.txt", root_dir="."):
    """
    Combina archivos relevantes de un proyecto Node.js en un solo archivo de texto,
    omitiendo bases de datos, librerías y archivos innecesarios.
    
    Parameters:
    - output_file: Nombre del archivo de salida
    - root_dir: Directorio raíz del proyecto (por defecto, directorio actual)
    """
    # Extensiones de archivo que queremos incluir
    valid_extensions = ('.js', '.html', '.css', '.ejs')

    # Directorios a ignorar
    ignore_dirs = {'node_modules', 'dist', '.git', '__pycache__', 'public'}  # Excluyo 'public' ya que contiene imágenes estáticas

    # Archivos a ignorar
    ignore_files = {'package-lock.json', 'cotizaciones.db', output_file, '.env', 'README.md'}

    # Patrones de archivos a omitir (bases de datos, logs, backups)
    ignore_patterns = ('db', 'data', 'backup', 'log', 'tmp')

    # Rutas relevantes del proyecto para documentación
    relevant_paths = {
        'app.js': 'Archivo principal de la aplicación Express',
        'config/database.js': 'Configuración de la base de datos SQLite',
        'config/passport.js': 'Configuración de autenticación con Passport',
        'routes/public.js': 'Rutas públicas (ej. /shop, /)',
        'routes/dashboard.js': 'Rutas del dashboard (ej. /dashboard/products)',
        'controllers/publicController.js': 'Controladores para rutas públicas',
        'controllers/productController.js': 'Controladores para gestión de productos',
        'views/index.ejs': 'Vista principal (home)',
        'views/shop.ejs': 'Vista de la tienda',
        'views/dashboard.ejs': 'Vista del dashboard',
        'views/dashboard_products.ejs': 'Vista de lista de productos',
        'views/add_product.ejs': 'Vista para agregar productos',
        'views/edit_product.ejs': 'Vista para editar productos',
        'package.json': 'Configuración de dependencias y scripts'
    }

    try:
        with open(output_file, 'w', encoding='utf-8') as outfile:
            # Escribir encabezado
            outfile.write(f"# Proyecto Completo - Generado el {time.ctime(time.time())}\n")
            outfile.write("# Estructura y contenido de archivos clave del proyecto (sin bases de datos ni node_modules)\n\n")
            outfile.write("# Descripción de rutas y archivos relevantes:\n")
            for path, description in relevant_paths.items():
                outfile.write(f"- {path}: {description}\n")
            outfile.write("\n")

            # Verificar si los archivos relevantes existen
            missing_files = []
            for path in relevant_paths:
                full_path = os.path.join(root_dir, path)
                if not os.path.exists(full_path):
                    missing_files.append(path)
            if missing_files:
                outfile.write("# Archivos relevantes faltantes:\n")
                for missing in missing_files:
                    outfile.write(f"- {missing}: No se encontró en el directorio\n")
                outfile.write("\n")

            # Recorrer el directorio raíz
            for root, dirs, files in os.walk(root_dir):
                # Filtrar directorios ignorados
                dirs[:] = [d for d in dirs if d not in ignore_dirs]

                # Obtener el directorio relativo para clasificar
                rel_dir = os.path.relpath(root, root_dir)

                # Procesar cada archivo
                for file in files:
                    # Verificar si el archivo tiene extensión válida y no está en la lista de ignorados
                    if (file.endswith(valid_extensions) and 
                        file not in ignore_files and 
                        not any(pattern in file.lower() for pattern in ignore_patterns)):
                        file_path = os.path.join(root, file)
                        relative_path = os.path.relpath(file_path, root_dir)

                        # Escribir separador y nombre del archivo con descripción si está en relevant_paths
                        outfile.write(f"\n{'='*80}\n")
                        outfile.write(f"# Archivo: {relative_path}\n")
                        if relative_path in relevant_paths:
                            outfile.write(f"# Descripción: {relevant_paths[relative_path]}\n")
                        outfile.write(f"{'='*80}\n\n")

                        # Leer y escribir el contenido del archivo
                        try:
                            with open(file_path, 'r', encoding='utf-8') as infile:
                                content = infile.read()
                                outfile.write(content)
                                outfile.write("\n")
                        except Exception as e:
                            outfile.write(f"# Error al leer el archivo: {e}\n")

            # Incluir package.json por separado
            package_path = os.path.join(root_dir, 'package.json')
            if os.path.exists(package_path):
                outfile.write(f"\n{'='*80}\n")
                outfile.write("# Archivo: package.json\n")
                outfile.write("# Descripción: Configuración de dependencias y scripts\n")
                outfile.write(f"{'='*80}\n\n")
                with open(package_path, 'r', encoding='utf-8') as package_file:
                    outfile.write(package_file.read())
                    outfile.write("\n")

            outfile.write(f"\n{'='*80}\n")
            outfile.write("# Fin del proyecto\n")

        print(f"Archivo combinado generado con éxito: {output_file}")
        print(f"Tamaño del archivo: {os.path.getsize(output_file)} bytes")

    except Exception as e:
        print(f"Error al generar el archivo combinado: {e}")

def main():
    # Obtener el directorio actual
    current_dir = os.getcwd()

    # Preguntar al usuario si quiere usar otro directorio
    print(f"Directorio actual: {current_dir}")
    change_dir = input("¿Quieres especificar otro directorio? (s/n): ").lower()

    if change_dir == 's':
        new_dir = input("Ingresa la ruta del directorio del proyecto: ")
        if os.path.isdir(new_dir):
            combine_project_files(root_dir=new_dir)
        else:
            print("Directorio no válido. Usando directorio actual.")
            combine_project_files()
    else:
        combine_project_files()

if __name__ == "__main__":
    main()