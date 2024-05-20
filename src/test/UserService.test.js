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
} from "../services/UserService";

describe("loginUser", () => {
  it("should login failed in case email is empty", async () => {
    const data = {
      email: "",
      password: "123",
    };
    const result = await loginUser(data);

    expect(result.status).toEqual("ERR");
    expect(result.message).toEqual("The input is required");
  });

  it("should login failed in case password is empty", async () => {
    const data = {
      email: "test@gmail.com",
      password: "",
    };
    const result = await loginUser(data);

    expect(result.status).toEqual("ERR");
    expect(result.message).toEqual("The input is required");
  });

  it("should login successfully", async () => {
    const data = {
      email: "Admin@gmail.com",
      password: "123",
    };
    const result = await loginUser(data);

    expect(result.status).toEqual("OK");
    expect(result.message).toEqual("LOGIN SUCCESS");
  });

  it("should login failed in case is not email", async () => {
    const data = {
      email: "aloalo",
      password: "123",
    };
    const result = await loginUser(data);

    expect(result.status).toEqual("ERR");
    expect(result.message).toEqual("The input is email");
  });

  it("should login failed in case email is not exist", async () => {
    const data = {
      email: "test123456@gmail.com",
      password: "123",
    };
    const result = await loginUser(data);

    expect(result.status).toEqual("ERR");
    expect(result.message).toEqual("User is not exist");
  });
});

// Path: src/test/UserService.test.js

describe("registerUser", () => {
  function generateRandomString(length) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from({ length }, () =>
      characters.charAt(Math.floor(Math.random() * characters.length))
    ).join("");
  }

  const randomString = generateRandomString(4);

  // it("should register successfully", async () => {
  //   const data = {
  //     name: randomString,
  //     email: `${randomString}TQK@gmail.com`,
  //     password: "123",
  //     confirmPassword: "123",
  //     phone: "0389346149",
  //   };
  //   const result = await registerUser(data);
  //
  //   expect(result.status).toEqual("OK");
  // });

  it("should register failed in case email already exist", async () => {
    const data = {
      name: randomString,
      email: "test@gmail.com",
      password: "123",
      confirmPassword: "123",
      phone: "0389346149",
    };
    const result = await registerUser(data);

    expect(result.status).toEqual("ERR");
    expect(result.message).toEqual("The email is already");
  });

  it("should register failed in case email is empty", async () => {
    const data = {
      name: randomString,
      email: "",
      password: "123",
      confirmPassword: "123",
      phone: "0389346149",
    };
    const result = await registerUser(data);

    expect(result.status).toEqual("ERR");
    expect(result.message).toEqual("The input is required");
  });

  it("should register failed in case password is empty", async () => {
    const data = {
      name: randomString,
      email: `${randomString}TQK@gmail.com`,
      password: "",
      confirmPassword: "123",
      phone: "0389346149",
    };
    const result = await registerUser(data);

    expect(result.status).toEqual("ERR");
    expect(result.message).toEqual("The input is required");
  });

  it("should register failed in case password is empty", async () => {
    const data = {
      name: randomString,
      email: `${randomString}TQK@gmail.com`,
      password: "",
      confirmPassword: "123",
      phone: "0389346149",
    };
    const result = await registerUser(data);

    expect(result.status).toEqual("ERR");
    expect(result.message).toEqual("The input is required");
  });

  it("should register failed in case password and confirmPassword is not the same", async () => {
    const data = {
      name: randomString,
      email: `${randomString}TQK@gmail.com`,
      password: "1234",
      confirmPassword: "123",
      phone: "0389346149",
    };
    const result = await registerUser(data);

    expect(result.status).toEqual("ERR");
    expect(result.message).toEqual("The password is equal confirmPassword");
  });
});

describe("getDetailUser", () => {
  it("should fetch details user successfully", async () => {
    const resultLogin = await loginUser({
      email: "Admin@gmail.com",
      password: "123",
    });
    if (resultLogin.status === "OK") {
      const result = await getDetailsUser(
        resultLogin.data._id,
        resultLogin.access_token
      );

      expect(result.status).toEqual("OK");
    }
  });

  it("should fetch user failed in case user is not exist", async () => {
    const resultLogin = await loginUser({
      email: "Admin@gmail.com",
      password: "123",
    });
    if (resultLogin.status === "OK") {
      const result = await getDetailsUser(
        "60f3b3b3b3b3b3b3b3b3b3b3",
        resultLogin.access_token
      );
      expect(result.status).toEqual("ERR");
      expect(result.message).toEqual("The user is not defined");
    }
  });
});

describe("logoutUser", () => {
  it("should logout successfully", async () => {
    const result = await logoutUser();
    expect(result.status).toEqual("OK");
  });
});

describe("getUserCart", () => {
  it("should fetch user cart successfully", async () => {
    const resultLogin = await loginUser({
      email: "test@gmail.com",
      password: "123",
    });
    if (resultLogin.status === "OK") {
      const result = await getUserCart(
        resultLogin.data._id,
        resultLogin.access_token
      );
      if (result) {
        console.log("result.data", result.data);
        expect(result.status).toEqual("OK");
      }
    }
  });
});

describe("addUserCart", () => {
  it("should add user cart successfully", async () => {
    const cartData = {
      _id: "661966f05ffdc229d25dd781",
      amount: 1,
    };
    const resultLogin = await loginUser({
      email: "test@gmail.com",
      password: "123",
    });
    if (resultLogin.status === "OK") {
      const result = await addUserCart(
        resultLogin.data._id,
        cartData,
        resultLogin.access_token
      );
      if (result) {
        console.log("result.data", result);
        expect(result.status).toEqual("OK");
      }
    }
  });

  it("should add user cart failed in case id is not exits", async () => {
    //the id is not exits
    const cartData = {
      _id: "661966f05ffdc229d25dd780",
      amount: 1,
    };
    const resultLogin = await loginUser({
      email: "test@gmail.com",
      password: "123",
    });
    if (resultLogin.status === "OK") {
      try {
        const result = await addUserCart(
          resultLogin.data._id,
          cartData,
          resultLogin.access_token
        );
      } catch (error) {
        console.log("error.response", error.response.message);
        expect(error.response.status).toEqual(404);
      }
    }
  });
});

describe("updateUserCart", () => {
  it("should add user cart successfully", async () => {
    const amount = 6;
    const resultLogin = await loginUser({
      email: "test@gmail.com",
      password: "123",
    });

    if (resultLogin.status === "OK") {
      const result = await updateUserCart(
        resultLogin.data._id,
        "661966f05ffdc229d25dd781",
        amount,
        resultLogin.access_token
      );
      if (result) {
        expect(result.status).toEqual("OK");
      }
    }
  });

  it("should add user cart failed in case Product ID is not exist", async () => {
    const amount = 6;
    const resultLogin = await loginUser({
      email: "test@gmail.com",
      password: "123",
    });

    if (resultLogin.status === "OK") {
      try {
        const result = await updateUserCart(
          resultLogin.data._id,
          "661966f05ffdc229d25dd780",
          amount,
          resultLogin.access_token
        );
        if (result) {
          console.log("result.data", result);
        }
      } catch (error) {
        console.log("error.response", error.response.status);
        expect(error.response.status).toEqual(404);
      }
    }
  });
});

// describe("deleteUserCart", () => {
//   it("should delete a product in user cart successfully", async () => {
//     const idProduct = "664b7ad5087a3670af5e75c1";
//     const resultLogin = await loginUser({
//       email: "test@gmail.com",
//       password: "123",
//     });
//     if (resultLogin.status === "OK") {
//       const result = await deleteUserCart(
//         resultLogin.data._id,
//         idProduct,
//         resultLogin.access_token
//       );
//       if (result) {
//         console.log("result.data", result);
//         expect(result.status).toEqual("OK");
//       }
//     }
//   });
// });

describe("getAll", () => {
  it("should fetch user successfully", async () => {
    const resultLogin = await loginUser({
      email: "Admin@gmail.com",
      password: "123",
    });
    if (resultLogin.status === "OK") {
      const result = await getAllUser(resultLogin.access_token);
      if (result) {
        expect(result.status).toEqual("OK");
      }
    }
  });

  it("should fetch user cart failed in case user is not Admin", async () => {
    const resultLogin = await loginUser({
      email: "test@gmail.com",
      password: "123",
    });
    if (resultLogin.status === "OK") {
      try {
        const result = await getAllUser(resultLogin.access_token);
      } catch (error) {
        console.log("error.response", error.response.message);
        expect(error.response.status).toEqual(403);
      }
    }
  });
});

describe("updateUser", () => {
  it("should fetch user cart successfully", async () => {
    const resultLogin = await loginUser({
      email: "Admin@gmail.com",
      password: "123",
    });
    if (resultLogin.status === "OK") {
      const result = await getAllUser(resultLogin.access_token);
      if (result) {
        expect(result.status).toEqual("OK");
      }
    }
  });
});
