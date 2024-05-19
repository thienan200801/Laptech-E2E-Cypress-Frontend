import { getAllProduct, getDetailsProduct } from "../services/ProductService";

describe("fetchProductDetails", () => {
  it("should fetch data successfully", async () => {
    const result = await getDetailsProduct("656b2f924a7494aad73e1c10");
    console.log(result, "result");
    expect(result).toEqual(expect.any(Array));
  });
});
