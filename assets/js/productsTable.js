if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded" , ready)
}
else {
    ready()
}

function ready() {
    let divFotosProducto = document.getElementById('inputFotos')
    divFotosProducto.innerHTML += 
    `
    <div>
        <input id="imag-valid" type="file" name="image" accept=".png, .jpg, .jpeg" multiple>
    </div>
    <div id="image-preview">
    </div>`
    let fileInput = document.getElementById('imag-valid')
    console.log(fileInput.name)
    let imagePreview = document.getElementById('image-preview');
    imagePreview.innerHTML = '';
    fileInput.addEventListener('change', function () {
        console.log(fileInput.files)
        // Verificar si se seleccionó al menos una imagen
        if (fileInput.files.length > 0) {
            imagePreview.innerHTML = '';
            for (const file of fileInput.files) {
                // Obtener la imagen seleccionada
                let selectedImage = file;

                // Crear un objeto de FileReader para leer la imagen
                let reader = new FileReader();

                // Manejar el evento load para ejecutar cuando se complete la lectura
                reader.onload = function (e) {
                    // Crear un elemento de imagen para mostrar la vista previa
                    let imgElement = document.createElement('img');
                    imgElement.className = 'image-element';
                    imgElement.src = e.target.result;
                    console.log(selectedImage)
                    // Crear un nuevo div para cada imagen
                    let imageContainer = document.createElement('div');
                    imageContainer.className = 'image-container'; // Puedes aplicar estilos a través de CSS
                    let trashElement = document.createElement('i');
                    trashElement.className = 'fa fa-trash';
                    
                    // Agregar la imagen al contenedor de vista previa
                    imageContainer.appendChild(imgElement);
                    imageContainer.appendChild(trashElement);

                    
                    // Agregar el contenedor de imagen al contenedor principal
                    imagePreview.appendChild(imageContainer);

                    trashElement.addEventListener('click' , function () {
                        console.log(file)
                    // Eliminar el div contenedor de la imagen al hacer clic en el icono de la papelera
                    imagePreview.removeChild(imageContainer);

                    // Crear un nuevo input
                    const newInput = document.createElement('input');
                    newInput.type = 'file';
                    newInput.name = 'imagen';
                    newInput.accept = '.png, .jpg, .jpeg';
                    newInput.multiple = true;

                    // Eliminar el archivo del FileList
                    const newFiles = Array.from(fileInput.files).filter(f => f !== file);

                    // Crear un nuevo DataTransfer y establecer sus items con la nueva lista de archivos
                    const dt = new DataTransfer();
                    newFiles.forEach(f => dt.items.add(f));

                    // Asignar el nuevo DataTransfer al nuevo input
                    newInput.files = dt.files;

                    // Reemplazar el input antiguo con el nuevo
                    fileInput.parentNode.replaceChild(newInput, fileInput);

                    // Actualizar la referencia de fileInput para futuras operaciones
                    fileInput = newInput;


                    

                    console.log(fileInput.files)       
        
                    })
            };

            // Leer la imagen como una URL de datos
            reader.readAsDataURL(selectedImage);
            }
                
        }
    });


    let rowNumber = 1
    addNewRow(rowNumber)
    let addRow = document.querySelector('#addItemBtn')
    addRow.addEventListener('click' , ()=> {
        rowNumber +=1
        console.log('Agregar item')
    addNewRow(rowNumber)
    })
}

function addNewRow(row) {
    // ************************************************************************
    // Capturo el div con los datos que vienen en sus atributos que voy a usar
    // ************************************************************************
    var initialDataElement = document.getElementById('initialData');
    // **********************************************************************************************
    // Asigno las variables a discounts, collections, colors y sizes que se van a usar en los select
    // **********************************************************************************************
    var discounts = JSON.parse(initialDataElement.getAttribute('data-discounts'));
    let discountOptions = "";
    discounts.forEach(discount => {
        discountOptions += `<option value="${discount.id}">${discount.discount_code}</option>`;
    });
    // ************************************************************************************************    
    var colors = JSON.parse(initialDataElement.getAttribute('data-colors'));
    let colorOptions = "";
    colors.forEach(color => {
        colorOptions += `<option value="${color.id}">${color.name}</option>`;
    });
    // ************************************************************************************************
    var sizes = JSON.parse(initialDataElement.getAttribute('data-sizes'));
    let sizeOptions = "";
    sizes.forEach(size => {
        sizeOptions += `<option value="${size.id}">${size.name}</option>`;
    });
    // ************************************************************************************************

    //let addRow = document.getElementById('addItemBtn')
    let tableProduct = document.querySelector('.tableProducto')
    let rowNumber = row
    tableProduct.innerHTML += 
    `<tr>
        <td class="columnNumber">${rowNumber}</td>
        <td class="columnPrize">
            <input class="form-tablas input-tablas-prize" type="number" name="productPrice" placeholder="   Preço do produto">
        </td>

        <td class="columnColor"><select class="form-tablas" type="number" name="colorSelected" id="colorTable">
            <option value="" required>Cor</option>
                <!-- Se buscan los valores que completarán las opciones del select en la tabla de colores que recibe del controller-->
                ${colorOptions}
        </select></td>

        <td class="columnSize"><select class="form-tablas" type="number" name="sizeSelected" id="sizeTable">
            <option value="" required>Tamanho</option>
                <!-- Se buscan los valores que completarán las opciones del select en la tabla de tamaños que recibe del controller-->
                ${sizeOptions}
        </select></td>
        <td class="columnStock">
            <input class="form-tablas input-tablas-stock" type="number" name="productStock" placeholder="   Etoque de produtos">
        </td>
        <td class="columnDiscount"><select class="form-tablas" type="number" name="discountSelected" id="discountTable">
            <option value="" required>Desconto</option>
                <!-- Se buscan los valores que completarán las opciones del select en la tabla de descuentos que recibe del controller-->
                ${discountOptions}
        </select></td>
        <td class="columnDetail">
            <textarea id="textareaTabla" class="form-tablas textarea-tablas" name="productDetail" placeholder="detalhes do produto"></textarea>
        </td>
    </tr>`
}

console.log("entraste a validar ADICIONAR PRODUCTO")
window.addEventListener("load", () => {
    const form = document.querySelector(".tables");
    const fileInput = document.getElementById("imag-valid");
    const errorImagen = document.getElementById("errorImg");

    fileInput.addEventListener('change', function (event) {
        const files = Array.from(event.target.files);
        for (let i = 0; i < files.length; i++) {
            if (!files[i].type.includes('image')) {
                errorImagen.innerText = "Você deve selecionar uma imagem válida";
                return;
            }
        }
        errorImagen.innerText = "";
    });

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const productName = document.querySelector('input[name="productName"]');
        const detail = document.querySelector('textarea[name="detail"]');
        const errorNombre = document.getElementById("errorNombre");
        const errorDescripcion = document.getElementById("errorDescr");

        let errores = [];

        if (productName.value.trim() === "") {
            errores.push("Este campo é obrigatório");
            errorNombre.innerText = "Para adicionar um produto você deve preencher este campo, mínimo de 5 caracteres";
        } else if (productName.value.length < 5) {
            errores.push("Este campo deve ter pelo menos 5 caracteres");
            errorNombre.innerText = "Este campo deve ter pelo menos 5 caracteres";
        } else {
            errorNombre.innerText = "";
        }

        if (detail.value.length < 10) {
            errores.push("Este campo deve ter pelo menos 10 caracteres");
            errorDescripcion.innerText = "Campo obrigatório, mínimo 10 caracteres";
        } else {
            errorDescripcion.innerText = "";
        }

        if (fileInput.files.length === 0) {
            errores.push("imagem vazia");
            errorImagen.innerText = "Você deve selecionar pelo menos uma imagem válida";
        } else {
            errorImagen.innerText = "";
        }

        /*if (errores.length === 0) {
            Swal.fire(
                'Produto criado!',
                'Success'
            ).then(() => {
                form.submit(); 
            });
        }*/
        console.log(errores)
        if (errores.length == 0){
            errores.innerHTML = '';
                       
            Swal.fire(
                'Parabens',
                'Produto criado!',
                'Success'
            ).then(()=> {
                form.submit();
            })
           
        }
    });
});
