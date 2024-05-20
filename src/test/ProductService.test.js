import { getAllProduct, getDetailsProduct } from "../services/ProductService";

describe("fetchProductDetails", () => {
  it("should fetch data successfully", async () => {
    const result = await getDetailsProduct("656b2f924a7494aad73e1c10");
    expect(result.status).toEqual("OK");
  });
});

describe("fetchAllProduct", () => {
  it("should fetch data successfully", async () => {
    const result = await getAllProduct();
    console.log("result.status", result.status);
    expect(result.status).toEqual("OK");
  });
});
