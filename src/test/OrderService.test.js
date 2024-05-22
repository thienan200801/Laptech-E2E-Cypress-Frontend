import {
  getAllOrder,
  createOrder,
  getDetailsOrder,
  getOrderByUserId,
  updateStatusOrder,
} from "../services/OrderService";
import { loginUser } from "../services/UserService";
jest.setTimeout(20000); // Set the timeout to 20 seconds

const dataCreateOrder = {
  address: "Tỉnh Bình Định,Huyện An Lão ân hữu",
  city: "52",
  email: "test@gmail.com",
  fullName: "TQK DEPZAI quaaa",
  itemsPrice: 123000,
  orderItems: [
    {
      amount: 1,
      image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAA",
      name: "Ủa alo",
      price: 123000,
      _id: "66196c4b5ffdc229d25dd7ff", // Ensure _id field is present
    },
  ],
  paymentMethod: "cod",
  phone: "0389346149",
  shippingPrice: 50000,
  totalPrice: 173000,
  user: "664b678e48aa92aa6e00d3d3",
};

describe("fetchAllOrders", () => {
  it("should fetch data successfully", async () => {
    const resultLogin = await loginUser({
      email: "Admin@gmail.com",
      password: "123",
    });
    if (resultLogin.status === "OK") {
      const result = await getAllOrder(resultLogin.access_token);

      expect(result.status).toEqual("OK");
    }
  });

  it("should fetch data failed in case user is not Admin", async () => {
    const resultLogin = await loginUser({
      email: "test@gmail.com",
      password: "123",
    });
    if (resultLogin.status === "OK") {
      try {
        await getAllOrder(resultLogin.access_token);
      } catch (error) {
        expect(error.message).toEqual("Request failed with status code 403");
      }
    }
  });
});

describe("createOrder", () => {
  it("should create Order successfully", async () => {
    const resultLogin = await loginUser({
      email: "test@gmail.com",
      password: "123",
    });
    if (resultLogin.status === "OK") {
      const result = await createOrder(
        dataCreateOrder,
        resultLogin.access_token
      );
      expect(result.status).toEqual("OK");
    }
  });
});

describe("getDetailsOrder", () => {
  it("should fetch data successfully", async () => {
    const resultLogin = await loginUser({
      email: "test@gmail.com",
      password: "123",
    });

    if (resultLogin.status === "OK") {
      const resultCreate = await createOrder(
        dataCreateOrder,
        resultLogin.access_token
      );
      if (resultCreate.status === "OK") {
        const result = await getDetailsOrder(
          resultCreate.data._id,
          resultLogin.access_token
        );
        expect(result.status).toEqual("OK");
      }
    }
  });
});

describe("getAllOrderByUSERID", () => {
  it("should fetch data successfully", async () => {
    const resultLogin = await loginUser({
      email: "test@gmail.com",
      password: "123",
    });

    if (resultLogin.status === "OK") {
      const result = await getOrderByUserId(
        resultLogin.data._id,
        resultLogin.access_token
      );
      expect(result.status).toEqual("OK");
    }
  });
});

describe("updateStatusOrder", () => {
  it("should fetch data successfully", async () => {
    const resultLogin = await loginUser({
      email: "Admin@gmail.com",
      password: "123",
    });
    const orderId = "664ccbbd8a98c0034acbfda3";
    const data = {
      isDelivered: true,
    };
    if (resultLogin.status === "OK") {
      const result = await updateStatusOrder(
        orderId,
        data,
        resultLogin.access_token
      );
      expect(result.status).toEqual("OK");
    }
  });
});
