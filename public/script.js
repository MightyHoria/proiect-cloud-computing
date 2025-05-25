const API = '/api/products';
let editId = null;

// selectăm container-ul de produse după clasă
const productList = document.querySelector('.product-list');
const form = document.getElementById('productForm');

async function fetchProducts() {
  const res = await fetch(API);
  return res.json();
}

async function render() {
  const products = await fetchProducts();
  productList.innerHTML = ''; // golim containerul

  products.forEach(p => {
    const div = document.createElement('div');
    div.classList.add('product');
    div.innerHTML = `
      <h3>${p.name}</h3>
      <p>${p.description || ''}</p>
      <p><b>Preț:</b> ${p.price} LEI</p>
      <div class="actions">
        <button class="edit" data-id="${p._id}">Editează</button>
        <button class="delete" data-id="${p._id}">Șterge</button>
      </div>
    `;
    productList.append(div);
  });

  document.querySelectorAll('.edit').forEach(btn =>
    btn.addEventListener('click', e => {
      const id = e.target.dataset.id;
      const prod = products.find(x => x._id === id);
      form.name.value = prod.name;
      form.description.value = prod.description;
      form.price.value = prod.price;
      editId = id;
    })
  );
  document.querySelectorAll('.delete').forEach(btn =>
    btn.addEventListener('click', async e => {
      await fetch(`${API}/${e.target.dataset.id}`, { method: 'DELETE' });
      render();
    })
  );
}

form.addEventListener('submit', async e => {
  e.preventDefault();
  const body = {
    name: form.name.value,
    description: form.description.value,
    price: +form.price.value
  };

  if (editId) {
    await fetch(`${API}/${editId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    editId = null;
  } else {
    await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
  }

  form.reset();
  render();
});

render();
