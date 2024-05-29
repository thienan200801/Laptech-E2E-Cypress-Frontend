import {
  createProduct,
  getAllProduct,
  getDetailsProduct,
  updateProduct,
  deleteProduct,
  getCommentAndRating,
} from "../services/ProductService";

import { loginUser } from "../services/UserService";

const randomName = Math.random().toString(36).substring(7);
jest.setTimeout(20000); // Set the timeout to 10 seconds

// describe("fetchAllProduct", () => {
//   it("should fetch data successfully", async () => {
//     const result = await getAllProduct();
//     expect(result.status).toEqual("OK");
//   });
// });

// describe("fetchProductDetails", () => {
//   it("should fetch data successfully", async () => {
//     const result = await getDetailsProduct("656b2f924a7494aad73e1c10");

//     // Kiểm tra rằng result.data tồn tại và là một mảng
//     expect(result).toHaveProperty("data");
//     console.log(Array.isArray(result.data)); // Thêm logging để kiểm tra
//     expect(Array.isArray(result.data)).toBe(false);
//   });
//   it("should have the correct status and message", async () => {
//     const result = await getDetailsProduct("656b2f924a7494aad73e1c10");

//     expect(result).toHaveProperty("status", "OK");
//     expect(result).toHaveProperty("message", "SUCESS");
//   });
// });

// describe("createProduct", () => {
//   const data = {
//     company: "ASUS",
//     countInStock: "13213",
//     description: "231",
//     image: "link-image",
//     name: randomName + "-laptop",
//     price: "123000",
//     rating: "",
//     type: "normal-laptop",
//   };

//   it("should create product successfully", async () => {
//     const resultLogin = await loginUser({
//       email: "Admin@gmail.com",
//       password: "123",
//     });
//     if (resultLogin.status === "OK") {
//       const result = await createProduct(data, resultLogin.access_token);
//       expect(result.status).toEqual("OK");
//     }
//   });

//   it("should create product fail in case the name already exists", async () => {
//     const dataTest = {
//       company: "ASUS",
//       countInStock: "13213",
//       description: "231",
//       image: "link-image",
//       name: "testing",
//       price: "123000",
//       rating: "",
//       type: "normal-laptop",
//     };
//     const resultLogin = await loginUser({
//       email: "Admin@gmail.com",
//       password: "123",
//     });
//     if (resultLogin.status === "OK") {
//       const result = await createProduct(dataTest, resultLogin.access_token);
//       expect(result).toHaveProperty("status", "ERR");
//       expect(result).toHaveProperty(
//         "message",
//         "The name of product is already"
//       );
//     }
//   });

//   it("should create product fail in case name is empty", async () => {
//     const resultLogin = await loginUser({
//       email: "Admin@gmail.com",
//       password: "123",
//     });
//     if (resultLogin.status === "OK") {
//       const result = await createProduct(
//         {
//           company: "ASUS",
//           countInStock: "123",
//           description: "123",
//           image: "123",
//           name: "",
//           price: "123000",
//           //rating: "",
//           type: "normal-laptop",
//         },
//         resultLogin.access_token
//       );
//       expect(result).toHaveProperty("status", "ERR");
//       expect(result).toHaveProperty("message", "The input is required");
//     }
//   });
//   it("should create product fail in case image is empty", async () => {
//     const resultLogin = await loginUser({
//       email: "Admin@gmail.com",
//       password: "123",
//     });
//     if (resultLogin.status === "OK") {
//       const result = await createProduct(
//         {
//           company: "ASUS",
//           countInStock: "123",
//           description: "123",
//           image: "",
//           name: "test-laptop",
//           price: "123000",
//           //rating: "",
//           type: "normal-laptop",
//         },
//         resultLogin.access_token
//       );
//       expect(result).toHaveProperty("status", "ERR");
//       expect(result).toHaveProperty("message", "The input is required");
//     }
//   });

//   it("should create product fail in case type is empty", async () => {
//     const resultLogin = await loginUser({
//       email: "Admin@gmail.com",
//       password: "123",
//     });
//     if (resultLogin.status === "OK") {
//       const result = await createProduct(
//         {
//           company: "ASUS",
//           countInStock: "123",
//           description: "123",
//           image: "imageURL",
//           name: "test-laptop",
//           price: "123000",
//           //rating: "",
//           type: "",
//         },
//         resultLogin.access_token
//       );
//       expect(result).toHaveProperty("status", "ERR");
//       expect(result).toHaveProperty("message", "The input is required");
//     }
//   });

//   it("should create product fail in case company is empty", async () => {
//     const resultLogin = await loginUser({
//       email: "Admin@gmail.com",
//       password: "123",
//     });
//     if (resultLogin.status === "OK") {
//       const result = await createProduct(
//         {
//           company: "",
//           countInStock: "123",
//           description: "123",
//           image: "imageURL",
//           name: "test-laptop",
//           price: "123000",
//           //rating: "",
//           type: "normal-laptop",
//         },
//         resultLogin.access_token
//       );
//       expect(result).toHaveProperty("status", "ERR");
//       expect(result).toHaveProperty("message", "The input is required");
//     }
//   });

//   it("should create product fail in case price is empty", async () => {
//     const resultLogin = await loginUser({
//       email: "Admin@gmail.com",
//       password: "123",
//     });
//     if (resultLogin.status === "OK") {
//       const result = await createProduct(
//         {
//           company: "ASUS",
//           countInStock: "123",
//           description: "123",
//           image: "123",
//           name: "test-laptop",
//           price: "",
//           //rating: "",
//           type: "normal-laptop",
//         },
//         resultLogin.access_token
//       );
//       expect(result).toHaveProperty("status", "ERR");
//       expect(result).toHaveProperty("message", "The input is required");
//     }
//   });

//   it("should create product fail in case description is empty", async () => {
//     const resultLogin = await loginUser({
//       email: "Admin@gmail.com",
//       password: "123",
//     });
//     if (resultLogin.status === "OK") {
//       const result = await createProduct(
//         {
//           company: "ASUS",
//           countInStock: "123",
//           description: "",
//           image: "123",
//           name: "test-laptop",
//           price: "34432234",
//           //rating: "",
//           type: "normal-laptop",
//         },
//         resultLogin.access_token
//       );
//       expect(result).toHaveProperty("status", "ERR");
//       expect(result).toHaveProperty("message", "The input is required");
//     }
//   });

//   it("should create product fail in case user is not Admin", async () => {
//     const resultLogin = await loginUser({
//       email: "test@gmail.com",
//       password: "123",
//     });
//     if (resultLogin.status === "OK") {
//       try {
//         await createProduct(data, resultLogin.access_token);
//       } catch (error) {
//         const { data } = error.response;
//         expect(error.message).toEqual("Request failed with status code 403");
//         expect(data).toHaveProperty("status", "ERROR");
//         expect(data).toHaveProperty("message", "Unauthorized");
//       }
//     }
//   });
// });

// describe("updateProduct", () => {
//   it("should update Product successfully", async () => {
//     const resultLogin = await loginUser({
//       email: "Admin@gmail.com",
//       password: "123",
//     });
//     const changeData = {
//       name: randomName + "-updatedlaptop",
//       type: "normal-laptop",
//       company: "ASUS",
//       price: 123000,
//       countInStock: 13213,
//       description: "231",
//       image: "link-image",
//     };
//     if (resultLogin.status === "OK") {
//       const id = "661966f05ffdc229d25dd781";
//       const result = await updateProduct(
//         id,
//         resultLogin.access_token,
//         changeData
//       );
//       expect(result.status).toEqual("OK");
//     }
//   });
//   it("should update Product failed in case user is not admin", async () => {
//     const resultLogin = await loginUser({
//       email: "test@gmail.com",
//       password: "123",
//     });
//     const changeData = {
//       name: randomName + "-updatedlaptop",
//       type: "normal-laptop",
//       company: "ASUS",
//       price: 123000,
//       countInStock: 13213,
//       description: "231",
//       image: "link-image",
//     };
//     if (resultLogin.status === "OK") {
//       try {
//         const id = "661966f05ffdc229d25dd781";
//         await updateProduct(id, resultLogin.access_token, changeData);
//       } catch (error) {
//         const { data } = error.response;
//         expect(error.message).toEqual("Request failed with status code 403");
//         expect(data).toHaveProperty("status", "ERROR");
//         expect(data).toHaveProperty("message", "Unauthorized");
//       }
//     }
//   });

//   it("should update product failed in case name is empty", async () => {
//     const resultLogin = await loginUser({
//       email: "Admin@gmail.com",
//       password: "123",
//     });
//     if (resultLogin.status === "OK") {
//       const result = await updateProduct(
//         {
//           name: "",
//           type: "normal-laptop",
//           company: "ASUS",
//           price: 123000,
//           countInStock: 13213,
//           description: "231",
//           image: "link-image",
//         },
//         resultLogin.access_token
//       );
//       expect(result).toHaveProperty("status", "ERR");
//       expect(result).toHaveProperty("message", "The input is required");
//     }
//   });
//   it("should update product failed in case image is empty", async () => {
//     const resultLogin = await loginUser({
//       email: "Admin@gmail.com",
//       password: "123",
//     });
//     if (resultLogin.status === "OK") {
//       const result = await updateProduct(
//         {
//           name: "test-product",
//           type: "normal-laptop",
//           company: "ASUS",
//           price: 123000,
//           countInStock: 13213,
//           description: "231",
//           image: "",
//         },
//         resultLogin.access_token
//       );
//       expect(result).toHaveProperty("status", "ERR");
//       expect(result).toHaveProperty("message", "The input is required");
//     }
//   });

//   it("should update product failed in case type is empty", async () => {
//     const resultLogin = await loginUser({
//       email: "Admin@gmail.com",
//       password: "123",
//     });
//     if (resultLogin.status === "OK") {
//       const result = await updateProduct(
//         {
//           name: "test-ptoduct",
//           type: "",
//           company: "ASUS",
//           price: 123000,
//           countInStock: 13213,
//           description: "231",
//           image: "link-image",
//         },
//         resultLogin.access_token
//       );
//       expect(result).toHaveProperty("status", "ERR");
//       expect(result).toHaveProperty("message", "The input is required");
//     }
//   });

//   it("should update product failed in case company is empty", async () => {
//     const resultLogin = await loginUser({
//       email: "Admin@gmail.com",
//       password: "123",
//     });
//     if (resultLogin.status === "OK") {
//       const result = await updateProduct(
//         {
//           name: "test-ptoduct",
//           type: "normal-laptop",
//           company: "",
//           price: 123000,
//           countInStock: 13213,
//           description: "231",
//           image: "link-image",
//         },
//         resultLogin.access_token
//       );
//       expect(result).toHaveProperty("status", "ERR");
//       expect(result).toHaveProperty("message", "The input is required");
//     }
//   });

//   it("should update product failed in case price is empty", async () => {
//     const resultLogin = await loginUser({
//       email: "Admin@gmail.com",
//       password: "123",
//     });
//     if (resultLogin.status === "OK") {
//       const result = await updateProduct(
//         {
//           name: "test-ptoduct",
//           type: "normal-laptop",
//           company: "ASUS",
//           price: "",
//           countInStock: 13213,
//           description: "231",
//           image: "link-image",
//         },
//         resultLogin.access_token
//       );
//       expect(result).toHaveProperty("status", "ERR");
//       expect(result).toHaveProperty("message", "The input is required");
//     }
//   });

//   it("should update product failed in case description is empty", async () => {
//     const resultLogin = await loginUser({
//       email: "Admin@gmail.com",
//       password: "123",
//     });
//     if (resultLogin.status === "OK") {
//       const result = await updateProduct(
//         {
//           name: "test-ptoduct",
//           type: "normal-laptop",
//           company: "ASUS",
//           price: 123000,
//           countInStock: 13213,
//           description: "",
//           image: "link-image",
//         },
//         resultLogin.access_token
//       );
//       expect(result).toHaveProperty("status", "ERR");
//       expect(result).toHaveProperty("message", "The input is required");
//     }
//   });
// });

// describe("deleteProduct", () => {
//   it("should delete product successfully", async () => {
//     const resultLogin = await loginUser({
//       email: "Admin@gmail.com",
//       password: "123",
//     });
//     if (resultLogin.status === "OK") {
//       const data = {
//         company: "ASUS",
//         countInStock: "13213",
//         description: "231",
//         image: "link-image",
//         name: randomName + "-laptop",
//         price: "123000",
//         rating: "",
//         type: "normal-laptop",
//       };
//       const resultCreate = await createProduct(data, resultLogin.access_token);
//       if (resultCreate.status === "OK") {
//         console.log(resultCreate, "resultCreate");
//         const result = await deleteProduct(
//           resultCreate.data._id,
//           resultLogin.access_token
//         );
//         expect(result.status).toEqual("OK");
//       }
//     }
//   });

//   it("should delete product failed in case id is require", async () => {
//     const resultLogin = await loginUser({
//       email: "Admin@gmail.com",
//       password: "123",
//     });
//     if (resultLogin.status === "OK") {
//       try {
//         await deleteProduct("", resultLogin.access_token);
//       } catch (error) {
//         expect(error.message).toEqual("Request failed with status code 404");
//       }
//     }
//   });

//   it("should delete product failed in case id is not vaialbe", async () => {
//     const resultLogin = await loginUser({
//       email: "Admin@gmail.com",
//       password: "123",
//     });
//     if (resultLogin.status === "OK") {
//       const result = await deleteProduct(
//         "noewan5y43fd",
//         resultLogin.access_token
//       );
//       expect(result.status).toEqual("ERR");
//       expect(result.message).toEqual("The product is not defined");
//     }
//   });
// });

describe("fetchCommentProduct", () => {
  it("should fetch data successfully", async () => {
    const result = await getCommentAndRating("656b2f924a7494aad73e1c10");
    expect(result.status).toEqual("OK");
  });

  it("should fetch data failed in case product id is not valid", async () => {
    try {
      const result = await getCommentAndRating("");
      expect(result.status).toEqual("ERR");
      expect(result.message).toEqual("The product is not defined");
    } catch (error) {
      expect(error.message).toEqual("Request failed with status code 404");
    }
  });
});
