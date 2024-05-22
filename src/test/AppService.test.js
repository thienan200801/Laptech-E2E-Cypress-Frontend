import {
  apiGetPublicDistricts,
  apiGetPublicProvinces,
} from "../services/AppService";
jest.setTimeout(20000); // Set the timeout to 10 seconds

describe("fetchPublicDistricts", () => {
  it("should fetch data successfully", async () => {
    const result = await apiGetPublicProvinces();
    expect(result.data).toHaveProperty("results");
  });
});

describe(" apiGetPublicDistricts", () => {
  it("should fetch data successfully", async () => {
    const result = await apiGetPublicDistricts(52);
    expect(result.data).toHaveProperty("results");
  });
});
