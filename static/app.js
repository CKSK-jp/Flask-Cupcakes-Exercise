// TODO: JSON API Requests
const BASE_URL = "http://127.0.0.1:5000/api";

async function showCupcakes() {
  const response = await axios.get(`${BASE_URL}/cupcakes`);

  for (let cupcake of response.data.cupcakes) {
    let newCupcake = $(createCupcakeHTML(cupcake));
    $("#cupcakes-list").append(newCupcake);
  }
}

function createCupcakeHTML(cupcake) {
  return `
    <div class="cupcake">
      <div class="cupcake-info">
        <li>
        <h3>${cupcake.flavor} cupcake</h3>
        <p>Size: ${cupcake.size} </p>
        <p>Rating: ${cupcake.rating} </p>
        </li>
        <button class="delete" data-cupcake-id="${cupcake.id}">Remove</button>
      </div>
      <img src="${cupcake.image}" alt="${cupcake.flavor} Cupcake img" class="cupcake-image">
    </div>
    `
}

$('#add-cupcake-form').on('submit', async function (event) {
  event.preventDefault();

  const flavor = $('#form-flavor').val();
  const size = $('#form-size').val();
  const rating = $('#form-rating').val();
  const image = $('#form-image').val();

  const response = await axios.post(`${BASE_URL}/cupcakes`, {
    flavor,
    size,
    rating,
    image
  });

  const cupcake = response.data.cupcake;

  $(createCupcakeHTML(cupcake));
  $("#cupcakes-list").append(newCupcake);

  $('new-cupcake-form').trigger('reset');
})

$('#cupcakes-list').on('click', '.delete', async function (event) {
  const cupcakeId = $(event.target).data('cupcake-id');
  await axios.delete(`${BASE_URL}/cupcakes/${cupcakeId}`);
})

$(showCupcakes);