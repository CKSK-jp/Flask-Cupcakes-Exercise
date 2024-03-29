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
        <button class="edit" data-cupcake-id="${cupcake.id}">Edit</button>
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
  event.preventDefault();
  const cupcake = $(event.target).closest('.cupcake');
  console.log(cupcake)
  const cupcakeId = $(event.target).data("cupcake-id");
  await axios.delete(`${BASE_URL}/cupcakes/${cupcakeId}`);
  $(cupcake).remove();
})

// TODO edit cupcake form
// $('#cupcakes-list').on('click', '.edit', async function (event) {
//   event.preventDefault();
//   const cupcake = $(event.target).closest('.cupcake');
//   const cupcakeId = $(event.target).data("cupcake-id");

//   const response = await axios.get(`${BASE_URL}/cupcakes/${cupcakeId}`);

//   const cupcakeData = response.data.cupcake;

//   $('#form-flavor').val(cupcakeData.flavor);
//   $('#form-size').val(cupcakeData.size);
//   $('#form-rating').val(cupcakeData.rating);
//   $('#form-image').val(cupcakeData.image);

// })


$(showCupcakes);