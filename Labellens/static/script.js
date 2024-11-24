async function uploadImage() {
    const input = document.getElementById('imageInput');
    const formData = new FormData();
    formData.append('file', input.files[0]);

    const response = await fetch('/upload', { method: 'POST', body: formData });
    const result = await response.json();

    const resultDiv = document.getElementById('result');
    if (result.status === 'success') {
        resultDiv.innerHTML = `
            <h3>Barcode: ${result.barcode}</h3>
            <p>Product Name: ${result.product_name}</p>
        `;
    } else {
        resultDiv.innerHTML = `<p class="text-red-500">${result.message}</p>`;
    }
}
