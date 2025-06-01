const params = new URLSearchParams(window.location.search);
const cardId = params.get("product");
let productDetails = document.getElementById("details");
let stockStatus = false;

async function getProductDetail(params) {
  if (!cardId) {
    productDetails.innerHTML = "No Data found!";
  }

  try {
    const res = await fetch(`https://dummyjson.com/products/${cardId}`);
    const product = await res.json();
    let status = product.availabilityStatus;

    if (status === "In Stock") {
      stockStatus = true;
      console.log(true);
    } else {
      stockStatus = false;
    }
    console.log(product);
    productDetails.innerHTML = `
        <div class="product-detail-section">
            <div class="product-card">
                <div style="flex: 1;">
                    <img class="product-image" src="${product.thumbnail}" alt="${
                        product.title
                    }" />
                    <div class="brand-section">
                        <h5 class="brand"> Brand </h5>
                        <p class="brand-name">${product.brand}</p>
                    </div>
                    <p style="margin: 10px 0; font-size: 14px;"><strong>Warranty:</strong> ${
                        product.warrantyInformation
                    }</p>
                    <p style="margin: 10px 0; font-size: 14px;"><strong>Shipping:</strong> ${
                        product.shippingInformation
                    }</p>
                    <p style="margin: 10px 0; font-size: 14px;"><strong>SKU:</strong> ${
                        product.sku
                    }</p>
                </div>

            <div style="flex: 2;">
                <div class="price-section">
                    <p class="price">US$${product.price}</p>
                    <p class="rating">⭐ ${product.rating.toFixed(1)}</p>
                </div>
                    <p class="title">${product.title}</p>
                    <p class="description">Description:</p>
                    <p class="product-description">${product.description}</p>
                    <p style="margin: 10px 0;"><strong>Dimensions:</strong> ${
                        product.dimensions.width
                    }cm (W) × ${product.dimensions.height}cm (H) × ${
                        product.dimensions.depth
                    }cm (D)</p>
                    <p style="margin: 10px 0;"><strong>Discount:</strong> ${
                        product.discountPercentage
                    }%</p>
                    <p style="margin: 10px 0;"><strong>Minimum Order:</strong> ${
                        product.minimumOrderQuantity
                    } units</p>
                    <p style="margin: 10px 0;"><strong>Return Policy:</strong> ${
                        product.returnPolicy
                    }</p>
                    <p style="margin: 10px 0;"><strong>Tags:</strong> ${product.tags.join(
                        ", "
                    )}</p>

                <div class="available-stock">
                    <p class="availability">Availability</p>
                    <p class="status"
                        style="
                            color: ${stockStatus ? "green" : "red"};
                            background-color: ${
                            stockStatus ? "rgba(173, 255, 47, 0.3)" : "rgba(255, 0, 0, 0.3)"};
                            border: ${stockStatus ? "1px solid green" : "1px solid red"};
                    ">
                        ${product.availabilityStatus}
                    </p>
                </div>

                <div style="margin-top: 20px;">
                    <img class="qr-code" src="${product.meta.qrCode}" alt="QR Code" />
                    <p style="font-size: 12px; margin-top: 5px;">Scan for more info</p>
                </div>

                <div style="margin-top: 20px;">
                    <h4 style="margin: 10px 0;">Customer Reviews:</h4>
                        ${product.reviews
                        .map(
                            (review) => `
                        <div style="border: 1px solid #ccc; border-radius: 10px; padding: 10px; margin-bottom: 10px;">
                            <p>⭐ ${review.rating} - ${review.comment}</p>
                            <p style="font-size: 12px; color: gray;">${new Date(
                                review.date
                                ).toLocaleDateString()}</p>
                        </div>`
                        )
                        .join("")}
                </div>
            </div>
        </div>
    </div>
`;
  } catch (err) {
    console.error("Error: ", err);
  } finally {
  }
}

getProductDetail();
