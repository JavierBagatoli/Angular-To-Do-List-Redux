export const downloadData = () =>{
    const jsonString = localStorage.getItem("memory")!
    const blob = new Blob([jsonString], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const enlace = document.createElement('a');
    enlace.href = url;
    enlace.download = 'datosToDoListWeb.txt';
    enlace.click();

    URL.revokeObjectURL(url);
  }

export const uploadData = (event: Event) => {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) return;

    const archivo = input.files[0];

    if (archivo.type !== 'text/plain') {
      alert('Solo se permiten archivos .txt');
      return;
    }

    const lector = new FileReader();

    lector.onload = () => {
      try {
        const contenido = lector.result as string;
        const json = JSON.parse(contenido);
        localStorage.setItem('memory', JSON.stringify(json));
      } catch (error) {
      }
    };

    lector.readAsText(archivo);

    location.reload();
  }