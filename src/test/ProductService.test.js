import {
  createProduct,
  getAllProduct,
  getDetailsProduct,
  updateProduct,
} from "../services/ProductService";

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

describe("fetchProductDetails", () => {
  it("should fetch data successfully", async () => {
    const result = await getDetailsProduct("656b2f924a7494aad73e1c10");
    console.log(result, "result");

    // Kiểm tra rằng result.data tồn tại và là một mảng
    expect(result).toHaveProperty("data");
    console.log(Array.isArray(result.data)); // Thêm logging để kiểm tra
    expect(Array.isArray(result.data)).toBe(false);
  });
  it("should have the correct status and message", async () => {
    const result = await getDetailsProduct("656b2f924a7494aad73e1c10");

    expect(result).toHaveProperty("status", "OK");
    expect(result).toHaveProperty("message", "SUCESS");
  });
});

// describe("fetchgetAllProduct", () => {
//   it("should have the correct status and message", async () => {
//     const result = await getAllProduct();
//     expect(result).toHaveProperty("status", "OK");
//   });
// });

// describe("fetchgetAllProduct", () => {
//   it("should have the correct status and message", async () => {
//     const resultLogin = await loginUser({
//       email: "Admin@gmail.com",
//       password: "123",
//     });
//     console.log(resultLogin);
//     const result = await getUserCart(
//       resultLogin.data._id,
//       resultLogin.access_token
//     );
//     console.log(result);

//   });
// });

// describe("getUserCart", () => {
//   it("should fetch user cart successfully", async () => {
//     const resultLogin = await loginUser({
//       email: "Admin@gmail.com",
//       password: "123",
//     });
//     console.log(resultLogin);
//     if (resultLogin.status === "OK") {
//       const result = await getUserCart(
//         resultLogin.data._id,
//         resultLogin.access_token
//       );
//     }
//     expect(resultLogin).toHaveProperty("status", "OK");

//     const result = await updateProduct()
//   });

// export const updateProduct = async (id, access_token, data) => {
//   const res = await axiosJWT.put(
//     `${process.env.REACT_APP_API_URL}/product/update/${id}`,
//     data,
//     {
//       headers: {
//         token: `Bearer ${access_token}`,
//       },
//     }
//   );
//   return res.data;
// };
