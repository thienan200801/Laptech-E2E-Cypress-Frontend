import {
  loginUser,
  registerUser,
  getDetailsUser,
  logoutUser,
  getUserCart,
  addUserCart,
  deleteUserCart,
  getAllUser,
  updateUserCart,
  deleteUser,
  refreshToken,
  updateUser,
  postCommentAndRating,
  deleteAllUserCart,
} from "../services/UserService";

jest.setTimeout(20000); // Set the timeout to 20 seconds

describe("refreshToken", () => {
  it("should refresh token is successfully", async () => {
    const data = {
      email: "test@gmail.com",
      password: "123",
    };
    const result = await loginUser(data);
    if (result.status === "OK") {
      const data = await refreshToken(result.refresh_token);
      expect(data.status).toEqual("OK");
      expect(data.message).toEqual("SUCESS");
    }
  });

  it("should refresh token is failed", async () => {
    const data = {
      email: "test@gmail.com",
      password: "123",
    };
    const result = await loginUser(data);
    if (result.status === "OK") {
      const data = await refreshToken();
      expect(data.status).toEqual("ERR");
    }
  });
});

// describe("loginUser", () => {
//   it("should login failed in case email is empty", async () => {
//     const data = {
//       email: "",
//       password: "123",
//     };
//     const result = await loginUser(data);

//     expect(result.status).toEqual("ERR");
//     expect(result.message).toEqual("The input is required");
//   });

//   it("should login failed in case password is empty", async () => {
//     const data = {
//       email: "test@gmail.com",
//       password: "",
//     };
//     const result = await loginUser(data);

//     expect(result.status).toEqual("ERR");
//     expect(result.message).toEqual("The input is required");
//   });

//   it("should login successfully", async () => {
//     const data = {
//       email: "Admin@gmail.com",
//       password: "123",
//     };
//     const result = await loginUser(data);

//     expect(result.status).toEqual("OK");
//     expect(result.message).toEqual("LOGIN SUCCESS");
//   });

//   it("should login failed in case is not email", async () => {
//     const data = {
//       email: "aloalo",
//       password: "123",
//     };
//     const result = await loginUser(data);

//     expect(result.status).toEqual("ERR");
//     expect(result.message).toEqual("The input is email");
//   });

//   it("should login failed in case email is not exist", async () => {
//     const data = {
//       email: "test123456@gmail.com",
//       password: "123",
//     };
//     const result = await loginUser(data);

//     expect(result.status).toEqual("ERR");
//     expect(result.message).toEqual("User is not exist");
//   });
// });

// describe("registerUser", () => {
//   function generateRandomString(length) {
//     const characters =
//       "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//     return Array.from({ length }, () =>
//       characters.charAt(Math.floor(Math.random() * characters.length))
//     ).join("");
//   }

//   const randomString = generateRandomString(4);

//   it("should register successfully", async () => {
//     const data = {
//       name: randomString,
//       email: `${randomString}TQK@gmail.com`,
//       password: "123",
//       confirmPassword: "123",
//       phone: "0389346149",
//     };
//     const result = await registerUser(data);

//     expect(result.status).toEqual("OK");
//   });

//   it("should register failed in case email already exist", async () => {
//     const data = {
//       name: randomString,
//       email: "test@gmail.com",
//       password: "123",
//       confirmPassword: "123",
//       phone: "0389346149",
//     };
//     const result = await registerUser(data);

//     expect(result.status).toEqual("ERR");
//     expect(result.message).toEqual("The email is already");
//   });

//   it("should register failed in case email is empty", async () => {
//     const data = {
//       name: randomString,
//       email: "",
//       password: "123",
//       confirmPassword: "123",
//       phone: "0389346149",
//     };
//     const result = await registerUser(data);

//     expect(result.status).toEqual("ERR");
//     expect(result.message).toEqual("The input is required");
//   });

//   it("should register failed in case password is empty", async () => {
//     const data = {
//       name: randomString,
//       email: `${randomString}TQK@gmail.com`,
//       password: "",
//       confirmPassword: "123",
//       phone: "0389346149",
//     };
//     const result = await registerUser(data);

//     expect(result.status).toEqual("ERR");
//     expect(result.message).toEqual("The input is required");
//   });

//   it("should register failed in case password is empty", async () => {
//     const data = {
//       name: randomString,
//       email: `${randomString}TQK@gmail.com`,
//       password: "",
//       confirmPassword: "123",
//       phone: "0389346149",
//     };
//     const result = await registerUser(data);

//     expect(result.status).toEqual("ERR");
//     expect(result.message).toEqual("The input is required");
//   });

//   it("should register failed in case password and confirmPassword is not the same", async () => {
//     const data = {
//       name: randomString,
//       email: `${randomString}TQK@gmail.com`,
//       password: "1234",
//       confirmPassword: "123",
//       phone: "0389346149",
//     };
//     const result = await registerUser(data);

//     expect(result.status).toEqual("ERR");
//     expect(result.message).toEqual("The password is equal confirmPassword");
//   });
// });

// describe("getDetailUser", () => {
//   it("should fetch details user successfully", async () => {
//     const resultLogin = await loginUser({
//       email: "Admin@gmail.com",
//       password: "123",
//     });
//     if (resultLogin.status === "OK") {
//       const result = await getDetailsUser(
//         resultLogin.data._id,
//         resultLogin.access_token
//       );

//       expect(result.status).toEqual("OK");
//     }
//   });

//   it("should fetch user failed in case user is not exist", async () => {
//     const resultLogin = await loginUser({
//       email: "Admin@gmail.com",
//       password: "123",
//     });
//     if (resultLogin.status === "OK") {
//       const result = await getDetailsUser(
//         "60f3b3b3b3b3b3b3b3b3b3b3",
//         resultLogin.access_token
//       );
//       expect(result.status).toEqual("ERR");
//       expect(result.message).toEqual("The user is not defined");
//     }
//   });
// });

// describe("logoutUser", () => {
//   it("should logout successfully", async () => {
//     const result = await logoutUser();
//     expect(result.status).toEqual("OK");
//   });
// });

// describe("getUserCart", () => {
//   it("should fetch user cart successfully", async () => {
//     const resultLogin = await loginUser({
//       email: "test@gmail.com",
//       password: "123",
//     });
//     if (resultLogin.status === "OK") {
//       const result = await getUserCart(
//         resultLogin.data._id,
//         resultLogin.access_token
//       );
//       if (result) {
//         console.log("result.data", result.data);
//         expect(result.status).toEqual("OK");
//       }
//     }
//   });
// });

// describe("addUserCart", () => {
//   it("should add user cart successfully", async () => {
//     const cartData = {
//       _id: "661966f05ffdc229d25dd781",
//       amount: 1,
//     };
//     const resultLogin = await loginUser({
//       email: "test@gmail.com",
//       password: "123",
//     });
//     if (resultLogin.status === "OK") {
//       const result = await addUserCart(
//         resultLogin.data._id,
//         cartData,
//         resultLogin.access_token
//       );
//       if (result) {
//         console.log("result.data", result);
//         expect(result.status).toEqual("OK");
//       }
//     }
//   });

//   it("should add user cart failed in case id is not exits", async () => {
//     const cartData = {
//       _id: "661966f05ffdc229d25dd780",
//       amount: 1,
//     };
//     const resultLogin = await loginUser({
//       email: "test@gmail.com",
//       password: "123",
//     });
//     if (resultLogin.status === "OK") {
//       try {
//         const result = await addUserCart(
//           resultLogin.data._id,
//           cartData,
//           resultLogin.access_token
//         );
//       } catch (error) {
//         console.log("error.response", error.response.message);
//         expect(error.response.status).toEqual(404);
//       }
//     }
//   });
// });

// describe("updateUserCart", () => {
//   it("should add user cart successfully", async () => {
//     const amount = 6;
//     const resultLogin = await loginUser({
//       email: "test@gmail.com",
//       password: "123",
//     });

//     if (resultLogin.status === "OK") {
//       const result = await updateUserCart(
//         resultLogin.data._id,
//         "661966f05ffdc229d25dd781",
//         amount,
//         resultLogin.access_token
//       );
//       if (result) {
//         expect(result.status).toEqual("OK");
//       }
//     }
//   });

//   it("should add user cart failed in case Product ID is not exist", async () => {
//     const amount = 6;
//     const resultLogin = await loginUser({
//       email: "test@gmail.com",
//       password: "123",
//     });

//     if (resultLogin.status === "OK") {
//       try {
//         const result = await updateUserCart(
//           resultLogin.data._id,
//           "661966f05ffdc229d25dd780",
//           amount,
//           resultLogin.access_token
//         );
//         if (result) {
//           console.log("result.data", result);
//         }
//       } catch (error) {
//         console.log("error.response", error.response.status);
//         expect(error.response.status).toEqual(404);
//       }
//     }
//   });
// });

// describe("deleteUser", () => {
//   it("should delete a user successfully", async () => {
//     function generateRandomString(length) {
//       const characters =
//         "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//       return Array.from({ length }, () =>
//         characters.charAt(Math.floor(Math.random() * characters.length))
//       ).join("");
//     }

//     const randomString = generateRandomString(4);

//     const data = {
//       name: randomString,
//       email: `${randomString}TQK@gmail.com`,
//       password: "123",
//       confirmPassword: "123",
//       phone: "0389346149",
//     };
//     const resultRegister = await registerUser(data);
//     if (resultRegister.status === "OK") {
//       const UserId = resultRegister.data._id;
//       const resultLogin = await loginUser({
//         email: "Admin@gmail.com",
//         password: "123",
//       });
//       if (resultLogin.status === "OK") {
//         console.log("resultLogin", resultLogin.access_token);
//         const result = await deleteUser(
//           UserId,
//           resultLogin.access_token,
//           "removeUser"
//         );
//         if (result) {
//           console.log("result.data", result);
//           expect(result.status).toEqual("OK");
//         }
//       }
//     }
//   });
// });

// describe("deleteUserCart", () => {
//   it("should delete a product in user cart successfully", async () => {
//     const cartData = {
//       _id: "661966f05ffdc229d25dd781",
//       amount: 1,
//     };
//     const resultLogin = await loginUser({
//       email: "test@gmail.com",
//       password: "123",
//     });
//     if (resultLogin.status === "OK") {
//       const result = await addUserCart(
//         resultLogin.data._id,
//         cartData,
//         resultLogin.access_token
//       );
//       if (result.status === "OK") {
//         console.log("result.data", result);
//         const resultDelete = await deleteUserCart(
//           resultLogin.data._id,
//           "661966f05ffdc229d25dd781",
//           resultLogin.access_token
//         );
//         if (resultDelete) {
//           console.log("result.data", result);
//           expect(result.status).toEqual("OK");
//         }
//       }
//     }
//   });
// });

// describe("getAll", () => {
//   it("should fetch user successfully", async () => {
//     const resultLogin = await loginUser({
//       email: "Admin@gmail.com",
//       password: "123",
//     });
//     if (resultLogin.status === "OK") {
//       const result = await getAllUser(resultLogin.access_token);
//       if (result) {
//         expect(result.status).toEqual("OK");
//       }
//     }
//   });

//   it("should fetch user cart failed in case user is not Admin", async () => {
//     const resultLogin = await loginUser({
//       email: "test@gmail.com",
//       password: "123",
//     });
//     if (resultLogin.status === "OK") {
//       try {
//         const result = await getAllUser(resultLogin.access_token);
//       } catch (error) {
//         console.log("error.response", error.response.message);
//         expect(error.response.status).toEqual(403);
//       }
//     }
//   });
// });

describe("updateUser", () => {
  it("should update user cart successfully", async () => {
    const resultLogin = await loginUser({
      email: "test@gmail.com",
      password: "123",
    });

    const data = {
      name: "TQK DEPZAI quaaa",
    };

    if (resultLogin.status === "OK") {
      const result = await updateUser(
        resultLogin.data._id,
        data,
        resultLogin.access_token
      );
      console.log("result", result);
      if (result) {
        expect(result.status).toEqual("OK");
      }
    }
  });
});

describe("postComment", () => {
  it("should post successfully", async () => {
    const data = {
      email: "test@gmail.com",
      password: "123",
    };
    const result = await loginUser(data);

    if (result.status === "OK") {
      const commentData = {
        userId: result.data._id,
        productId: "656b2f924a7494aad73e1c10",
        comment: "This is a test comment tester",
        rating: 5,
      };
      const resultPost = await postCommentAndRating(
        result.data._id,
        commentData,
        result.access_token
      );
      expect(resultPost.success).toEqual(true);
    }
  });
});

// describe("deleteAllUserCart", () => {
//   it("should delete a product in user cart successfully", async () => {
//     const cartData = {
//       _id: "661966f05ffdc229d25dd781",
//       amount: 1,
//     };
//     const resultLogin = await loginUser({
//       email: "test@gmail.com",
//       password: "123",
//     });
//     if (resultLogin.status === "OK") {
//       const result = await addUserCart(
//         resultLogin.data._id,
//         cartData,
//         resultLogin.access_token
//       );
//       if (result.status === "OK") {
//         const resultDelete = await deleteAllUserCart(
//           resultLogin.data._id,
//           resultLogin.access_token
//         );
//         if (resultDelete) {
//           console.log("result.data here", result);
//           expect(result.status).toEqual("OK");
//         }
//       }
//     }
//   });
// });
